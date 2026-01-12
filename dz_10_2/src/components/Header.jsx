import { NavLink } from "react-router";
import './Header.css'

function Header() {

    return ( 
        <header className="header">
            <nav className="header-nav">
                <NavLink to="/" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Bus</NavLink>
                <NavLink to="/hotel" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Hotel</NavLink>
                <NavLink to="/booking" className={({ isActive }) => `header-link ${isActive ? "active" : ""}`}>Booking</NavLink>
            </nav>
        </header>
     );
}

export default Header;