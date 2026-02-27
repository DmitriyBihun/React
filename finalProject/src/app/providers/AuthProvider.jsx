import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../../shared/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { setUser } from '../../features/auth/model/authSlice';

function AuthProvider({ children }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
                    const userData = userDoc.data()

                    dispatch(setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        isBlocked: userData?.isBlocked || false,
                        role: userData?.role || 'user',
                        balance: userData?.balance || 10000,
                    }));
                } catch (error) {
                    console.error('Error loading user data:', error);
                }
            } else {
                dispatch(setUser(null));
            }
            setLoading(false);
        })

        return () => unsubscribe();
    }, [dispatch])

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Завантаження...</div>;
    }

    return children;
}

export default AuthProvider;