import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";
import './Header.css'

function Header() {

    const {theme} = useTheme()

    return ( 
        <header className={`header ${theme}`}>
            <nav className="header-nav">
                <NavLink to="/" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Contact</NavLink>
            </nav>

            <ThemeToggle />
        </header>
     );
}

export default Header;