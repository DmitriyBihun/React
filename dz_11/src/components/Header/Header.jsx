import { NavLink } from "react-router";
import './Header.css'

function Header() {

    return ( 
        <header className="header">
            <nav className="header-nav">
                <NavLink to="/" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Products</NavLink>
                <NavLink to="/posts" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Posts</NavLink>
            </nav>
        </header>
     );
}

export default Header;