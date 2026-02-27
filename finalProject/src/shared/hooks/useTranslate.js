// import { useSelector } from 'react-redux';
// import uaTranslations from '../locales/ua.json';
// import enTranslations from '../locales/en.json';

// const translations = {
//     ua: uaTranslations,
//     en: enTranslations
// };

// export const useTranslate = () => {
//     const { currentLanguage } = useSelector((state) => state.language);

//     const t = (key) => {
//         const keys = key.split('.');

//         let translation = translations[currentLanguage];

//         for (const k of keys) {
//             if (translation && translation[k]) {
//                 translation = translation[k];
//             } else {
//                 console.warn(`Translation key not found: ${key}`);
//                 return key;
//             }
//         }

//         return translation;
//     };

//     return t;
// };