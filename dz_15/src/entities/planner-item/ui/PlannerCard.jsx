import { Fragment } from "react";
import style from './PlannerCard.module.css'

function PlannerCard({ item, actions }) {
    return (
        <div className={style.cardContainer}>
            <h2>Dream: <span>{item.description}</span> </h2>
            <p>Year: <span>{item.year}</span></p>
            <p>Friend(s): <span>{item.friend}</span></p>

            {!!actions &&
                <div className={style.cardActions}>
                    {actions.map((action, ind) => (
                        <Fragment key={ind}>{action}</Fragment>
                    ))}
                </div>
            }
        </div>
    );
}

export default PlannerCard;