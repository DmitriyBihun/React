import { NavLink } from "react-router";
import style from './Navbar.module.css'

function Navbar() {
    return (

        <nav className={style.nav}>
            <ul className={style.navList}>
                <li>
                    <NavLink to='/' className={({ isActive }) => [style.navLink, isActive ? style.active : ''].join(' ')}>
                    Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/products' className={({ isActive }) => [style.navLink, isActive ? style.active : ''].join(' ')}>
                    Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contacts' className={({ isActive }) => [style.navLink, isActive ? style.active : ''].join(' ')}>
                    Contacts
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/rules' className={({ isActive }) => [style.navLink, isActive ? style.active : ''].join(' ')}>
                        Payment Rules
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;