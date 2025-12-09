import cards from "../../data/cards";
import Card from "./Card";
import style from './CardList.module.css'

function CardList() {
    return (
        <div className={style.cardContainer}>
            {cards.map(card => (
                <Card key={card.id} image={card.image} title={card.title} subtitle={card.subtitle} text={card.text} link1={card.link1} link2={card.link2} />
            ))}
        </div>
    );
}

export default CardList;