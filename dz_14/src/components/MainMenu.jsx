import { NavLink } from "react-router";
import { routes } from "../router/routes";
import './MainMenu.css'

function MainMenu() {

    const menuItems = routes[0].children.filter(route => route?.meta.title)

    return (
        <nav>
            <ul className="header-list">
                {menuItems.map((route, ind) => (
                    <li key={ind}>
                        <NavLink
                            to={route.path}
                            className={({ isActive }) => `header-link ${isActive ? 'active' : ''}`}
                        >
                            {route.meta.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MainMenu;