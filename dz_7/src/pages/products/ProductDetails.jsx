import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import apiRoutes from "../../api/apiRoutes";
import style from './ProductDetails.module.css'

function ProductDetails() {
    const { category, id } = useParams()
    const { data: product, isLoading, error } = useFetch(apiRoutes.getProductById(id));

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error!</div>
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <div className={style.container}>
                <div className={style.imageBox}>
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className={style.info}>
                    <h2>{product.name}</h2>
                    <p>Ціна: {product.price} грн</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
