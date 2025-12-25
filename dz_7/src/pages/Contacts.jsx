import style from './Contacts.module.css'
import grannyImg from '../assets/img/granny.png'

function Contacts() {
    return (
        <div className={style.container}>
            <div>
                <img src={grannyImg} alt="image" />
            </div>
            <div>
                <h2>Як нас знайти?</h2>
                <p>1. Для початку, потрібно дістатися потягом до Ужгорода.</p>
                <p>2. Запитати у баби Галі.</p>
            </div>
        </div>
    );
}

export default Contacts;