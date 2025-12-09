import ProductsItem from './ProductsItem'
import styles from './ProductsList.module.css'

function ProductsList({ products }) {
    return ( 
        <div className={styles.container}>
            <h2>Список товарів</h2>
            <div className={styles.ptoductsGrid}>
                {products.map((product, ind) => (
                    <ProductsItem key={ind} {...product}/>
                ))}
            </div>
        </div>
     );
}

export default ProductsList;