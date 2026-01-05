import { createI18n } from "vue-i18n";
import en from './locales/en.json'
import mm from './locales/mm.json'
import th from './locales/th.json'

const savedLang = localStorage.getItem('lang') || 'en'

export const i18n = createI18n({
	legacy: false,
	locale: savedLang,
	fallbackLocale: 'en',
	messages: {
		en,
		mm,
		th
	}
})