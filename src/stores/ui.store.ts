import { defineStore } from "pinia";

export type ThemeMode = 'light' | 'dark' | 'system'
export type Language = 'en' | 'mm' | 'th'

export const useUiStore = defineStore('ui', {
	state: () => ({
		drawer: JSON.parse(localStorage.getItem('drawer') ?? 'true'),
		rail: JSON.parse(localStorage.getItem('rail') ?? 'true'),
		theme: (localStorage.getItem('theme') as ThemeMode) || 'system',
		isMobile: false,
		language: (localStorage.getItem('lang') as Language) || 'en',
	}),

	getters: {
		resolvedTheme: (state): 'light' | 'dark' => {
			if (state.theme === 'system') {
				return window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
			}
			return state.theme
		},
	},

	actions: {
		toggleDrawer() {
			this.drawer = !this.drawer
		},
		toggleRail() {
			this.rail = !this.rail
		},
		toggleTheme(theme: ThemeMode) {
			this.setTheme(theme)
		},
		toggleLang(lang: Language) {
			this.setLanguage(lang)
		},
		setDrawer(value: boolean) {
			this.drawer = value
			localStorage.setItem('drawer', JSON.stringify(value))
		},
		setRail(value: boolean) {
			this.rail = value
			localStorage.setItem('rail', JSON.stringify(value))
		},
		setMobile(value: boolean) {
			this.isMobile = value
			if (value) {
				this.drawer = false
				this.rail = false
			}
		},
		setTheme(mode: ThemeMode) {
			this.theme = mode
			localStorage.setItem('theme', mode)
		},
		setLanguage(lang: Language) {
			this.language = lang
			localStorage.setItem('lang', lang)
		}
	}
})