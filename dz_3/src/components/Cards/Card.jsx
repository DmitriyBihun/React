import style from './Card.module.css'

function Card({image, title, subtitle, text, link1, link2}) {
    return ( 
        <div className={style.card}>
            <div className={style.cardImageCont}>
                <img src={image} alt='image' />
            </div>
            <div className={style.cardContent}>
                <h3>{title}</h3>
                <h4>{subtitle}</h4>
                <p>{text}</p>
                <div className={style.cardLinks}>
                    <a href={link1} target="_blank">Link 1</a>
                    <a href={link2} target="_blank">Link 2</a>
                </div>
            </div>
        </div>
     );
}

export default Card;