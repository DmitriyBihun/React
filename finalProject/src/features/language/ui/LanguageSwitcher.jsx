import { useTranslation } from 'react-i18next';
import style from './LanguageSwitcher.module.css'

const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={style.wrapperButtons}>
            <button
                onClick={() => changeLanguage('ua')}
                className={i18n.language === 'ua' ? style.active : ''}
            >
                UA
            </button>
            <button
                onClick={() => changeLanguage('en')}
                className={i18n.language === 'en' ? style.active : ''}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;