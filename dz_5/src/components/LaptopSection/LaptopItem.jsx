import style from "./LaptopItem.module.css";

function LaptopItem({ image, title, saving, oldPrice, newPrice, link, onAddToCart }) {
    return (
        <article className={style.item}>
            <div className={style.itemImgBox}>
                <img src={image} alt="image" />
            </div>
            <a href={link}>
                <h2>{title}</h2>
            </a>
            <div className={style.itemContent}>
                <p>{saving}</p>
                <span>{oldPrice} грн</span>
                <span>{newPrice} грн</span>
            </div>
            <button onClick={onAddToCart}>Купити</button>
        </article>
    );
}

export default LaptopItem;