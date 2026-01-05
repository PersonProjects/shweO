<!-- EventGrid.vue -->
<template>
	<v-row>
		<!-- Skeletons -->
		<v-col
			v-if="loading"
			v-for="n in 6"
			:key="'skeleton-' + n"
			cols="12"
			sm="6"
			md="4"
		>
			<EventCardSkeleton />
		</v-col>

		<!-- Real events -->
		<v-col
			v-else
			v-for="event in events"
			:key="event.id"
			cols="12"
			sm="6"
			md="4"
		>
			<EventCard :event="event" :fav="fav"/>
		</v-col>

		<!-- Empty state -->
		<v-col v-if="!loading && !events.length" cols="12">
			<v-alert type="info">
				No events found
			</v-alert>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import EventCard from './EventCard.vue'
import EventCardSkeleton from './EventCardSkeleton.vue'

defineProps<{
	events: any[]
	loading: boolean
	fav?: boolean
}>()
</script>
