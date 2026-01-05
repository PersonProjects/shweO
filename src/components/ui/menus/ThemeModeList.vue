<template>
	<v-list-item
		v-for="item in themes"
		:key="item.mode"
		:active="theme === item.mode"
		@click="toggleTheme(item.mode)"
	>
		<template #prepend>
			<v-icon :icon="item.icon"/>
		</template>

		<v-list-item-title>
			{{ capitalize(item.mode) }}
		</v-list-item-title>
	</v-list-item>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui.store'
import type { ThemeMode } from '@/stores/ui.store'

const ui = useUiStore()
const { theme } = storeToRefs(ui)
const { toggleTheme } = ui

const themes: { mode: ThemeMode; icon: string }[] = [
  { mode: 'system', icon: 'mdi-monitor' },
  { mode: 'light', icon: 'mdi-weather-sunny' },
  { mode: 'dark', icon: 'mdi-weather-night' },
]

const capitalize = (v: string) =>
  v.charAt(0).toUpperCase() + v.slice(1)
</script>