<template>
	<v-container>
		<h1 class="text-h5 font-weight-bold mb-4">
			Favorite Events
		</h1>

		<EventGrid
			:events="favoriteEvents"
			:loading="loading"
			:fav="true"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { EVENTS } from '@/mocks/events'
import { USER_FAVORITES } from '@/mocks/my-favorites'
import EventGrid from '@/components/public/EventGrid.vue'

const loading = ref(false)

const favoriteEvents = computed(() => {
	return USER_FAVORITES
		.map(fav => EVENTS.find(e => e.id === fav.eventId))
		.filter(Boolean)
})
</script>
