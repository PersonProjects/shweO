<template>
	<RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useTheme } from 'vuetify'
import { useUiStore } from './stores/ui.store';
import { useI18n } from 'vue-i18n';

const ui = useUiStore()
const vuetifyTheme = useTheme()
const { locale } = useI18n()

// sync vuetify + tailwind theme
watch(
	() => ui.resolvedTheme,
	theme => {
		vuetifyTheme.global.name.value = theme
		document.documentElement.classList.toggle('dark', theme === 'dark')
	},
	{ immediate: true}
)

// sync language
watch(
  () => ui.language,
  (lang) => {
    locale.value = lang
  },
  { immediate: true }
)

// react to system theme change
onMounted(() => {
	const media = window.matchMedia('(prefers-color-scheme: dark)')
	media.addEventListener('change', () => {
		if (ui.theme === 'system') {
			vuetifyTheme.global.name.value = ui.resolvedTheme
			document.documentElement.classList.toggle(
				'dark',
				ui.resolvedTheme === 'dark'
			)
		}
	})
})
</script>