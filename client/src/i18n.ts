import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import fr from './locales/fr.json'
import ar from './locales/ar.json'

const storedLanguage = localStorage.getItem('car-rental-language')
const navigatorLanguage = navigator.language || 'fr'
const defaultLanguage = storedLanguage || (navigatorLanguage.startsWith('ar') ? 'ar' : navigatorLanguage.startsWith('en') ? 'en' : 'fr')

const updateDocumentLanguage = (language: string) => {
  document.documentElement.lang = language
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: defaultLanguage,
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en', 'ar'],
  interpolation: {
    escapeValue: false,
  },
})

updateDocumentLanguage(defaultLanguage)

export const setLanguage = (language: string) => {
  i18n.changeLanguage(language)
  localStorage.setItem('car-rental-language', language)
  updateDocumentLanguage(language)
}

export default i18n
