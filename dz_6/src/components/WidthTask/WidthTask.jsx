import useWindowSize from "./useWindowSize";
import style from './WidthTask.module.css'
import computerImg from "../../assets/computer.png";
import tabletImg from "../../assets/tablet.png";
import phoneImg from "../../assets/mobile_phone.png";


function WidthTask() {

    const { width, height } = useWindowSize()

    let device

    if (width > 1024) {
        device = 'Комп\'ютер'
    }
    else if (width >= 768) {
        device = 'Планшет'
    }
    else {
        device = 'Телефон'
    }

    return (
        <section className={style.WidthTaskSection}>
            <h3 className={style.title}>Розмір вікна: {width} x {height}</h3>
            <p>
                Пристрій: <strong>{device}</strong> 
            </p>

            {device === 'Комп\'ютер' && <img className={style.image} src={computerImg} alt="Computer" />}
            {device === 'Планшет' && <img className={style.image} src={tabletImg} alt="Tablet" />}
            {device === 'Телефон' && <img className={style.image} src={phoneImg} alt="Phone" />}
        </section>
    );
}

export default WidthTask;