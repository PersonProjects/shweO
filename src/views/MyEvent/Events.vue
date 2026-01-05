<template>
	<v-container>
		<h1 class="text-h5 font-weight-bold mb-4">
			My Events
		</h1>

		<v-tabs v-model="tab" class="mb-4">
			<v-tab value="upcoming">Upcoming</v-tab>
			<v-tab value="past">Past</v-tab>
		</v-tabs>

		<MyEventList
			:events="filteredEvents"
			:loading="loading"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import MyEventList from '@/components/my-event/MyEventList.vue'
import { EVENTS } from '@/mocks/events'
import { USER_EVENTS } from '@/mocks/my-events'

type MyEventView = {
	id: string
	title: string
	date: string
	location: string
	cover: string
	role: 'attendee' | 'organizer'
	status: 'upcoming' | 'past'
}

const tab = ref<'upcoming' | 'past'>('upcoming')
const loading = ref(true)
const events = ref<MyEventView[]>([])

const fetchEvents = async () => {
	loading.value = true
	await new Promise(r => setTimeout(r, 800)) // simulate API

	events.value = USER_EVENTS
		.map(ue => {
			const event = EVENTS.find(e => e.id === ue.eventId)
			if (!event) return null

			return {
				id: event.id,
				title: event.title,
				date: event.date,
				location: event.location,
				cover: event.cover,
				role: ue.role,
				status: ue.status,
			}
		})
		.filter(Boolean) as MyEventView[]

	loading.value = false
}

onMounted(fetchEvents)

const filteredEvents = computed(() =>
	events.value.filter(e => e.status === tab.value)
)
</script>
