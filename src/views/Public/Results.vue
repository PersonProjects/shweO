<template>
	<v-container>
		<EventFilters
			:filters="filters"
			@update="onFilterUpdate"
		/>

		<EventGrid
			:events="filteredEvents"
			:loading="loading"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventFilters from '@/components/public/EventFilters.vue'
import EventGrid from '@/components/public/EventGrid.vue'
import { EVENTS } from '@/mocks/events'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const filters = computed(() => ({
	query: (route.query.q as string) || '',
	category: (route.query.category as string) || null,
	location: (route.query.location as string) || null,
	price: (route.query.price as string) || 'all',
}))

const filteredEvents = computed(() => {
	return EVENTS.filter(e => {
		if (filters.value.query && !e.title.toLowerCase().includes(filters.value.query.toLowerCase())) {
			return false
		}
		if (filters.value.category && e.category !== filters.value.category) {
			return false
		}
		if (filters.value.location && e.location !== filters.value.location) {
			return false
		}
		if (filters.value.price === 'free' && e.price > 0) return false
		if (filters.value.price === 'paid' && e.price === 0) return false
		return true
	})
})

const onFilterUpdate = (next: typeof filters.value) => {
	router.push({
		query: {
			q: next.query || undefined,
			category: next.category || undefined,
			location: next.location || undefined,
			price: next.price !== 'all' ? next.price : undefined,
		},
	})
}

watch(
	() => route.query,
	async () => {
		loading.value = true
		await new Promise(r => setTimeout(r, 2000))
		loading.value = false
	},
	{ immediate: true }
)

</script>
