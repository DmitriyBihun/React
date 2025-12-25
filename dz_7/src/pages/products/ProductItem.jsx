import { Link } from "react-router";
import styles from "./ProductItem.module.css";
import navigate from '../../router/frontRouters.js'


function ProductItem({ product }) {
    return (
        <div className={styles.card}>
            <img src={product.imageUrl} alt={product.name} className={styles.image}/>
            <h3>{product.name}</h3>
            <p>{product.price} грн</p>
            <Link to={navigate.getProductDetail(product.category, product.id)} className={styles.moreLink}>
                Більше інформації
            </Link>
        </div>
    );
}

export default ProductItem;