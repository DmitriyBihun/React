import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from "../../shared/config/firebase";
import { logout } from "../../features/auth/model/authSlice";
import LanguageSwitcher from "../../features/language/ui/LanguageSwitcher";
import { useTranslation } from 'react-i18next';
import style from './Header.module.css'

function Header() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className={style.nav}>
            <div className={style.left}>
                <NavLink to="/" className={({ isActive }) =>
                    `${style.navLink} ${isActive ? style.active : ''}`
                }>
                    {t('nav.home')}
                </NavLink>

                {user && (
                    <>
                        <NavLink to="/dashboard" className={({ isActive }) =>
                            `${style.navLink} ${isActive ? style.active : ''}`
                        }>
                            {t('nav.dashboard')}
                        </NavLink>

                        <NavLink to="/profile" className={({ isActive }) =>
                            `${style.navLink} ${isActive ? style.active : ''}`
                        }>
                            {t('nav.profile')}
                        </NavLink>
                    </>
                )}

                {user?.role === 'admin' && (
                    <NavLink to="/admin" className={({ isActive }) =>
                        `${style.navLink} ${isActive ? style.active : ''}`
                    }>
                        {t('nav.admin')}
                    </NavLink>
                )}
            </div>

            <div className={style.right}>
                <LanguageSwitcher />

                {!user ? (
                    <NavLink to="/login" className={({ isActive }) =>
                        `${style.navLink} ${isActive ? style.active : ''}`
                    }>
                        {t('nav.login')}
                    </NavLink>
                ) : (
                    <button onClick={handleLogout} className={style.logoutBtn}>
                            {t('nav.logout')}
                    </button>
                )}
            </div>
        </nav>
    );
}
export default Header;