<template>
	<v-card>
		<v-card-text class="flex align-center justify-between">
			<div>
				<div class="text-body-2 text-medium-emphasis">
					{{ title }}
				</div>
				<div class="text-h5 font-weight-bold">
					{{ value }}
				</div>
			</div>

			<v-icon size="32" :icon="icon" />
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
defineProps<{
	title: string
	value: string | number
	icon: string
}>()
</script>
