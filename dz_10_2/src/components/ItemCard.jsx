import style from './ItemCard.module.css'

function ItemCard({ image, name, type, extra, isSelected, onToggle, onRemove, showRemove = false, showToggle = true }) {
    return (
        <div className={style.card}>
            <div className={style.cardImageBox}>
                <img src={image} alt={name} />
            </div>
            <div className={style.cardContent}>
                <h3>{name}</h3>
                <p><strong>Class:</strong> {type}</p>

                {extra && <p>{extra}</p>}

                {showToggle && onToggle && (
                    <button onClick={onToggle}>
                        {isSelected ? 'Скасувати' : 'Обрати'}
                    </button>
                )}

                {showRemove && onRemove && (
                    <button onClick={onRemove}>
                        Видалити
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemCard;