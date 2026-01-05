<template>
	<v-menu
		location="end"
		:open-on-hover="!isMobile"
		:open-on-click="isMobile"
		close-delay="100"
	>
		<template #activator="{props}">
			<v-list-item 
				v-bind="props"
				:prepend-icon="icon"
				:title="title"
				append-icon="mdi-chevron-right"
			/>
		</template>

		<v-list density="compact" min-width="200">
			<slot />
		</v-list>
	</v-menu>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui.store'

const ui = useUiStore()
const { isMobile } = storeToRefs(ui)

defineProps<{
	title: string
	icon: string
}>()
</script>