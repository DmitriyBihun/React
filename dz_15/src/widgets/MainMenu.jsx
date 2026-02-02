import { routes } from "@/app/router/routes";
import { NavLink } from "react-router";
import style from './MainMenu.module.css'

function MainMenu() {

    const routesForMenu = routes[0].children.filter(route => route.meta?.title)

    return (
        <nav>
            <ul className={style.navList}>
                {routesForMenu.map((route, ind) => (
                    <li key={ind}>
                        <NavLink to={route.path} className={({isActive }) =>
                        isActive ? `${style.navItem} ${style.active}` : style.navItem}>{route.meta.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default MainMenu;