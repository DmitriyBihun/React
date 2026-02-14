import ProductCard from "./ProductCard";
import style from './ProductList.module.css'

function ProductList({products}) {

    if(!products || products.length === 0) {
        return <p>No products yet.</p>
    }

    return ( 
        <div className={style.productList}>
            {products.map(product => (
                <ProductCard key={product.id} product={product}  />
            ))}
        </div>
     );
}

export default ProductList;