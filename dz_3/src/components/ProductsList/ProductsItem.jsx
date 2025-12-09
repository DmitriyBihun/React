import clases from './ProductsItem.module.css'

function ProductsItem({ name, price, image }) {
    return ( 
        <div className={clases.item}>
            <div className={clases.imgContainer}>
                <img src={image} alt={name} />
            </div>
            <h5>{name}</h5>
            <p>Price: {price}</p>
        </div>
     );
}

export default ProductsItem;