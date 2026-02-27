import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../shared/config/firebase';

const googleProvider = new GoogleAuthProvider();

// Реєстрація через email/password
export const registerUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
            uid: user.uid,
            email: user.email,
            balance: 10000,
            isBlocked: false,
            role: 'user',
            portfolio: {},
            createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, 'users', user.uid), userData);

        return {
            success: true,
            user: {
                uid: user.uid,
                email: user.email,
                ...userData
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Вхід через email/password
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (userData?.isBlocked) {
            await signOut(auth);
            return { success: false, error: 'Ваш аккаунт заблокований' };
        }

        return {
            success: true,
            user: {
                uid: user.uid,
                email: user.email,
                ...userData
            }
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Вхід через Google
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Перевіряю, чи існує юзер в Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            // Якщо новий, створюю запис
            const userData = {
                uid: user.uid,
                email: user.email,
                balance: 10000,
                isBlocked: false,
                role: 'user',
                portfolio: {},
                createdAt: new Date().toISOString(),
            };

            await setDoc(doc(db, 'users', user.uid), userData);

            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    ...userData
                }
            };
        } else {
            // Якщо юзер існує, перевіряю чи він не заблокований
            const userData = userDoc.data();

            if (userData?.isBlocked) {
                await signOut(auth);
                return { success: false, error: 'Ваш аккаунт заблокований' };
            }

            return {
                success: true,
                user: {
                    uid: user.uid,
                    email: user.email,
                    ...userData
                }
            };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Вихід з системи
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};