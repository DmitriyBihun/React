import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../shared/config/firebase';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import style from './AdminPanel.module.css'

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { user: currentUser } = useSelector((state) => state.auth);
    const { t } = useTranslation();

    // Загружаю всіх юзерів
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersRef = collection(db, 'users');
                const snapshot = await getDocs(usersRef);
                const usersList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            } catch (error) {
                console.error('Error loading users:', error);
                setMessage({ type: 'error', text: `${t('messages.error.loadUsersFailed')}` });
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    // Блок/розблок юзера
    const toggleBlockUser = async (userId, currentStatus) => {
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                isBlocked: !currentStatus
            });

            // Оновлюю локал. список
            setUsers(users.map(user =>
                user.id === userId
                    ? { ...user, isBlocked: !currentStatus }
                    : user
            ));

            setMessage({
                type: 'success',
                text: `${t('admin.user')} ${!currentStatus ? `${t('admin.blocked')}` : `${t('admin.unblocked')}`}`
            });

            // Очищую повідомл. через 3с.
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            console.error('Error toggling user block:', error);
            setMessage({ type: 'error', text: `${t('messages.error.errorWhileUpdatingStatus')}` });
        }
    };

    if (loading) {
        return <div>{t('common.loading')}</div>;
    }

    return (
        <div className={style.adminContainer}>
            <h1>{t('admin.title')}</h1>

            {message.text && (
                <div style={{
                    padding: '.5rem',
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b',
                    borderRadius: '0.3125rem',
                    marginBottom: '1rem'
                }}>
                    {message.text}
                </div>
            )}

            <div >
                <table>
                    <thead>
                        <tr>
                            <th >{t('admin.email')}</th>
                            <th >{t('admin.balance')}</th>
                            <th >{t('admin.portfolio')}</th>
                            <th >{t('admin.status')}</th>
                            <th >{t('admin.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} >
                                <td>
                                    {user.email}
                                    {user.id === currentUser?.uid && (
                                        <span style={{
                                            marginLeft: '.5rem',
                                            fontSize: '0.75rem',
                                            padding: '0.125rem 0.375rem',
                                            backgroundColor: '#3b82f6',
                                            color: '#fff',
                                            borderRadius: '0.25rem'
                                        }}>
                                            {t('admin.you')}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    ${user.balance?.toLocaleString() || 0}
                                </td>
                                <td>
                                    {user.portfolio ? Object.keys(user.portfolio).length : 0} {t('admin.coins')}
                                </td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.875rem',
                                        backgroundColor: user.isBlocked ? '#fee2e2' : '#d1fae5',
                                        color: user.isBlocked ? '#991b1b' : '#065f46'
                                    }}>
                                        {user.isBlocked ? `${t('admin.blocked')}` : `${t('admin.unblocked')}`}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => toggleBlockUser(user.id, user.isBlocked)}
                                        disabled={user.id === currentUser?.uid}
                                        style={{
                                            backgroundColor: user.isBlocked ? '#10b981' : '#ef4444',
                                            cursor: user.id === currentUser?.uid ? 'not-allowed' : 'pointer',
                                            opacity: user.id === currentUser?.uid ? 0.5 : 1
                                        }}
                                    >
                                        {user.isBlocked ? `${t('admin.unblock')}` : `${t('admin.block')}`}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && <div className={style.notFountUser}>{t('admin.noUsers')}</div>}

        </div>
    );
};

export default AdminPanel;