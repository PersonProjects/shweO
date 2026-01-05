<template>
	<v-row dense>
		<v-col cols="12" md="4">
			<v-text-field
				label="Search events"
				prepend-inner-icon="mdi-magnify"
				v-model="local.query"
				clearable
			/>
		</v-col>

		<v-col cols="6" md="2">
			<v-select
				label="Category"
				:items="categories"
				v-model="local.category"
				clearable
			/>
		</v-col>

		<v-col cols="6" md="2">
			<v-select
				label="Price"
				:items="['all', 'free', 'paid']"
				v-model="local.price"
			/>
		</v-col>

		<v-col cols="12" md="2">
			<v-btn
				block
				color="primary"
				@click="apply"
			>
				Apply
			</v-btn>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
	(e: 'update', filters: any): void
}>()

const local = reactive({
	query: '',
	category: null,
	price: 'all',
})

const categories = [
	'Music',
	'Tech',
	'Business',
	'Art',
]

const apply = () => emit('update', { ...local })
</script>
