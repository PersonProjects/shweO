<template>
	<v-card>
		<v-img
			:src="event.cover"
			height="160"
			cover
			lazy-src="https://picsum.photos/id/11/100/60"
			class="cursor-pointer"
			@click="goDetail"
		/>

		<v-card-title>
			{{ event.title }}
		</v-card-title>

		<v-card-subtitle>
			{{ event.date }} • {{ event.location }}
		</v-card-subtitle>

		<v-card-text>
			<v-chip
				size="small"
				:color="event.role === 'organizer' ? 'primary' : 'default'"
			>
				{{ event.role === 'organizer' ? 'Organizer' : 'Attending' }}
			</v-chip>
		</v-card-text>

		<v-card-actions>
			<v-btn
				variant="text"
				color="primary"
				@click="goDetail"
			>
				View Event
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import type { MyEvent } from '@/mocks/my-events'
import { useRouter } from 'vue-router'

const props = defineProps<{
	event: MyEvent
}>()

const router = useRouter()

const goDetail = () => {
	router.push({
		name: 'event-detail',
		params: { eventId: props.event.id },
	})
}
</script>


