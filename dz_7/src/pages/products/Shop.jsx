import { Link, Outlet } from "react-router";
import styles from './Shop.module.css';
import navigate from "../../router/frontRouters";

function Shop() {

    const categories = ["laptops", "phones", "monitors", "tv"];

    return (
        <div className={styles.mainContainer}>

            <ul className={styles.categoryLinks}>
                {categories.map(cat => (
                    <li key={cat} className={styles.categoryLink}>
                        <Link
                            to={navigate.getCategory(cat)}
                        >
                            {cat.toUpperCase()}
                        </Link>
                    </li>
                ))}
            </ul>

            <Outlet />
        </div>
    );
}

export default Shop;