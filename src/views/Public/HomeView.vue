<template>
	<div class="public-home">
		<HeroCarousel />

		<v-container class="mt-6">
			<EventFilters
				:filters="filters"
				@update="onFilterUpdate"
			/>

			<EventGrid
				:events="events"
				:loading="loading"
			/>
		</v-container>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroCarousel from '@/components/public/HeroCarousel.vue'
import EventFilters from '@/components/public/EventFilters.vue'
import EventGrid from '@/components/public/EventGrid.vue'
import { EVENTS } from '@/mocks/events'

const router = useRouter()

const filters = ref({
	query: '',
	category: null as string | null,
	location: null as string | null,
	price: 'all',
})

const events = ref(EVENTS.slice(0, 6)) // featured preview
const loading = ref(false)

const onFilterUpdate = (next: typeof filters.value) => {
	router.push({
		name: 'results',
		query: {
			q: next.query || undefined,
			category: next.category || undefined,
			location: next.location || undefined,
			price: next.price !== 'all' ? next.price : undefined,
		},
	})
}

onMounted(async () => {
	loading.value = true
	await new Promise(r => setTimeout(r, 2000))
	events.value = EVENTS
	loading.value = false
})
</script>

