import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { selectAuthUser } from "../../features/auth/api/authSlice";
import { useLogoutMutation } from "../../features/auth/api/authApi";
import './MainLayout.css';
import { useCartCount } from "./useCartCount";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../shared/ui/LanguageSwitcher";

function MainLayout() {

    const {t} = useTranslation()
    const user = useSelector(selectAuthUser)
    const [logout] = useLogoutMutation()

    const getNavLinkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'

    const cartItemsCount = useCartCount()

    return (
        <>
            <header>
                <nav className="nav">
                    <NavLink to='/' className={getNavLinkClass}>
                        {t('nav.home')}
                    </NavLink>
                    <NavLink to="/products" className={getNavLinkClass}>
                        {t('nav.products')}
                    </NavLink>
                    {user?.role === 'user' && (
                        <NavLink to="/favourites" className={getNavLinkClass}>
                            ❤️ {t('nav.favourites')}
                        </NavLink>
                    )}
                    {user && (
                        <NavLink to="/cart" className={getNavLinkClass}>
                            🛒 {t('nav.cart')} {cartItemsCount > 0 && `(${cartItemsCount})`}
                        </NavLink>  
                    )}
                </nav>

                {user ? (
                    <>
                        <p>
                            Logged as: <b>{user.displayName}</b> ({user.role})
                        </p>
                        <button onClick={() => logout()}>{t('nav.logout')}</button>
                    </>
                ) : (
                        <div className='authorization'>
                            <NavLink to="/login">{t('nav.login')}</NavLink>
                            <NavLink to="/signup">{t('nav.signUp')}</NavLink>
                    </div>
                )}
                <LanguageSwitcher />

            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}

export default MainLayout;