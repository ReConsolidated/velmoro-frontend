// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationPL from './locales/pl/translation.json';
import translationDE from './locales/de/translation.json';
import LanguageDetector from "i18next-browser-languagedetector";

// Konfiguracja tłumaczeń
const resources = {
    en: {
        translation: translationEN,
    },
    pl: {
        translation: translationPL,
    },
    de: {
        translation: translationDE,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'pl', // Język domyślny, gdy język przeglądarki nie jest dostępny
        lng: 'pl',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['navigator'],
            caches: ['localStorage'],
        },
    });


export default i18n;
