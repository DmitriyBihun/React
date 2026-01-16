import style from './ProductList.module.css'

function ProductList({ products }) {

    if (products.length === 0) {
        return null
    }

    return (
        <div className={style.products}>
            {products.map(prod => (
                <div key={prod.id} className={style.product}>
                    <div className={style.productImgBox}>
                        <img src={prod.image} alt={prod.name} />
                    </div>
                    <h3>{prod.name}</h3>
                    <p>Ціна: {prod.price} грн.</p>
                    <p>Бренд: {prod.concern}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;