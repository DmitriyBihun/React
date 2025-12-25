import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import apiRoutes from "../../api/apiRoutes";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";

function ProductList() {
    const { category } = useParams()
    const { data: products, isLoading, error } = useFetch(apiRoutes.productsList);

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error!</div>

    const filteredProducts = category ? products.filter(p => p.category === category) : products;

    return (
        <div className={styles.content}>
            <h2>Товари:</h2>

            <div className={styles.cards}>
                {filteredProducts.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>

        </div>
    );
}

export default ProductList;
