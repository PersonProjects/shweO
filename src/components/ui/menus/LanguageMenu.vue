<template>
	<v-list density="compact">
		<v-list-item
			v-for="lang in languages"
			:key="lang.code"
			:active="language === lang.code"
			@click="toggleLang(lang.code)"
		>
			<div class="flex gap-3 items-center">
				<span class="uppercase font-medium">{{ lang.code }}</span>
				<span>{{ lang.label }}</span>
			</div>
		</v-list-item>
	</v-list>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUiStore } from '@/stores/ui.store';
import type { Language } from '@/stores/ui.store';

const ui = useUiStore()
const {language} = storeToRefs(ui)
const {toggleLang} = ui

const languages: {code: Language, label: string} = [
	{ code: "en", label: 'English' },
	{ code: "mm", label: 'မြန်မာ' },
	{ code: "th", label: 'ไทย' },
]
</script>