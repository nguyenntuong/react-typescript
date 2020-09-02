import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import HttpApi from 'i18next-http-backend'; // fallback http load
import LanguageDetector from 'i18next-browser-languagedetector';

void i18n
    // load translation using http -> see /public/locales
    // (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: 'en',
        debug: false,
        backend: {
            backends: [
                LocalStorageBackend, // primary
                HttpApi, // fallback
            ],
            backendOptions: [
                {
                    // prefix for stored languages
                    prefix: 'i18next_res_',

                    // expiration
                    expirationTime: 7 * 24 * 60 * 60 * 1000,

                    // Version applied to all languages, can be overriden using the option `versions`
                    defaultVersion: process.env.NODE_ENV !== 'production' ? '' : '1.0',

                    // language versions
                    versions: {},

                    // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
                    store: window.localStorage,
                },
                {
                    loadPath: '/locales/{{lng}}/{{ns}}.json',
                },
            ],
        },
        load: 'languageOnly',
        cleanCode: true,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;
