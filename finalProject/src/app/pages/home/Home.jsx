import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import img1 from '../../../assets/simg1.jpg'
import img2 from '../../../assets/simg2.jpg'
import style from './Home.module.css'

function Home() {

    const { t } = useTranslation();

    return (
        <div className={style.heroContainer}>
            <h1>CryptoTrade Lite</h1>
            <div className={style.heroContent}>
                <div className={style.imagesBox}>
                    <img src={img1} alt="image" />
                    <img src={img2} alt="image" />
                </div>
                <div className={style.heroDescr}>
                    <p>{t('home.firstText')}</p>
                    <p>{t('home.secondText')}</p>
                    <ul>
                        <li>📊 {t('home.listItemFirst')}</li>
                        <li>📈 {t('home.listItemSec')}</li>
                        <li>🧠 {t('home.listItemThird')}</li>
                        <li>💡 {t('home.listItemFourth')}</li>
                    </ul>
                    <p>{t('home.thirdText')}</p>
                    <Link to='/dashboard' className={style.goTradeLink}>{t('home.startTradeLink')}</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;