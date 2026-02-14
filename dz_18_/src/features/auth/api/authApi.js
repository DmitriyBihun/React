// Перетворює Firebase user на plain object
function mapFirebaseUser(user) {
    if (!user) return null
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        // Додаємо роль
        // role: user.role || 'user',
    }
}
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import DbOperations from '../../../shared/api/DbOperations'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        //------------------ Логін з email+password
        login: builder.mutation({
            async queryFn({ email, password }) {
                try {
                    // Виконати автентифікацію на Firebase
                    const auth = getAuth()
                    const result = await signInWithEmailAndPassword(auth, email, password)
                    // Отримати додаткові дані з Firestore
                    const usersDb = new DbOperations('users')
                    const userData = await usersDb.getById(result.user.uid)

                    console.log("USER DATA FROM FIRESTORE:", userData)  

                    // Об'єднати Firebase user + Firestore user
                    return { data: { ...mapFirebaseUser(result.user), ...userData } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
        }),
        //------------------ Логін з аккаунтом Google
        googleLogin: builder.mutation({
            async queryFn() {
                try {
                    // Виконати автентифікацію на Firebase
                    const auth = getAuth()
                    const provider = new GoogleAuthProvider()
                    provider.setCustomParameters({ prompt: 'select_account' })
                    const result = await signInWithPopup(auth, provider)
                    const usersDb = new DbOperations('users')
                    // Якщо користувач новий, додати у Firestore
                    if (
                        result.user &&
                        result.user.metadata.creationTime ===
                        result.user.metadata.lastSignInTime
                    ) {
                        await usersDb.setWithId(result.user.uid, {
                            uid: result.user.uid,
                            email: result.user.email,
                            displayName: result.user.displayName,
                            photoURL: result.user.photoURL || '',
                            role: 'user',
                            createdAt: new Date().toISOString(),
                        })
                    }
                    // Завжди отримуємо дані з Firestore
                    const userData = await usersDb.getById(result.user.uid)
                    // Об'єднати Firebase user + Firestore user
                    return { data: { ...mapFirebaseUser(result.user), ...userData } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
        }),
        //------------------ Реєстрація з Firebase
        signUp: builder.mutation({
            async queryFn({ email, password, displayName }) {
                try {
                    // Реєстрація з використанням Firestore
                    const auth = getAuth()
                    const result = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    )
                    //Додаємо користувача у базу даних (для зберігання ролей)
                    const usersDb = new DbOperations('users')
                    await usersDb.setWithId(result.user.uid, {
                        uid: result.user.uid,
                        email: result.user.email,
                        displayName,
                        photoURL: result.user.photoURL || '',
                        role: 'user',
                        createdAt: new Date().toISOString(),
                    })
                    // Об'єднати Firebase user + Firestore user
                    return {
                        data: {
                            ...mapFirebaseUser(result.user),
                            displayName,
                            photoURL: result.user.photoURL || '',
                        },
                    }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
        }),
        //------------------ Оновлення профілю (refresh)
        refresh: builder.mutation({
            async queryFn() {
                try {
                    const auth = getAuth()
                    const user = auth.currentUser
                    if (!user) return { error: { message: 'Not authenticated' } }
                    const usersDb = new DbOperations('users')
                    const userData = await usersDb.getById(user.uid)
                    return { data: { ...mapFirebaseUser(user), ...userData } }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
        }),
        //------------------ Вихід з Firebase
        logout: builder.mutation({
            async queryFn() {
                try {
                    //Виконати вихід з використанянм Firebase
                    const auth = getAuth()
                    await signOut(auth)
                    return { data: true }
                } catch (error) {
                    return { error: { message: error.message } }
                }
            },
        }),
    }),
})

export const {
    useLoginMutation,
    useGoogleLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useRefreshMutation,
} = authApi
