<template>
	<v-row>
		<!-- Loading skeletons -->
		<v-col
			v-if="loading"
			v-for="i in 3"
			:key="i"
			cols="12"
			sm="6"
			md="4"
		>
			<MyEventCardSkeleton />
		</v-col>

		<!-- Actual events -->
		<v-col
			v-else
			v-for="event in events"
			:key="event.id"
			cols="12"
			sm="6"
			md="4"
		>
			<MyEventCard :event="event" />
		</v-col>

		<!-- Empty state -->
		<v-col v-if="!loading && !events.length" cols="12">
			<v-alert type="info">
				You have no events yet
			</v-alert>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import MyEventCard from './MyEventCard.vue'
import MyEventCardSkeleton from './MyEventCardSkeleton.vue'
import type { MyEvent } from '@/mocks/my-events'

defineProps<{
	events: MyEvent[]
	loading: boolean
}>()
</script>
