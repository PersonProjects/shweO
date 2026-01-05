<!-- src/views/Org/events/OrgEventList.vue -->
<template>
	<v-container fluid>
		<!-- Header -->
		<div class="d-flex justify-space-between align-center mb-4">
			<h1 class="text-h5 font-weight-bold">
				Org Events
			</h1>

			<v-btn
				color="primary"
				prepend-icon="mdi-plus"
				@click="goCreate"
			>
				Create Event
			</v-btn>
		</div>

		<!-- Filters -->
		<v-row class="mb-4">
			<v-col cols="12" sm="4">
				<v-text-field
					v-model="filters.search"
					label="Search events"
					prepend-inner-icon="mdi-magnify"
					clearable
				/>
			</v-col>

			<v-col cols="12" sm="3">
				<v-select
					v-model="filters.status"
					label="Status"
					:items="STATUS_OPTIONS"
					clearable
				/>
			</v-col>
		</v-row>

		<!-- Event list -->
		<OrgEventList
			:events="filteredEvents"
			:loading="loading"
			@view="goView"
			@edit="goEdit"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import OrgEventList from '@/components/org/OrgEventList.vue'
import { ORG_EVENTS } from '@/mocks/org-events'
import type { OrgEvent } from '@/types/org-event'

const router = useRouter()
const route = useRoute()

/* ----------------------------------
   State
---------------------------------- */
const loading = ref(true)
const events = ref<OrgEvent[]>([])

const filters = ref({
	search: '',
	status: null as null | OrgEvent['meta']['status'],
})

const STATUS_OPTIONS = [
	{ title: 'Draft', value: 'draft' },
	{ title: 'Published', value: 'published' },
	{ title: 'Ended', value: 'ended' },
	{ title: 'Cancelled', value: 'cancelled' },
]

/* ----------------------------------
   Fetch (mock)
---------------------------------- */
const fetchEvents = async () => {
	loading.value = true
	await new Promise(r => setTimeout(r, 800))
	events.value = ORG_EVENTS
	loading.value = false
}

onMounted(fetchEvents)

/* ----------------------------------
   Filters
---------------------------------- */
const filteredEvents = computed(() => {
	return events.value.filter(e => {
		if (
			filters.value.search &&
			!e.title.toLowerCase().includes(filters.value.search.toLowerCase())
		) {
			return false
		}

		if (
			filters.value.status &&
			e.meta.status !== filters.value.status
		) {
			return false
		}

		return true
	})
})

/* ----------------------------------
   Actions
---------------------------------- */
const goView = (event: OrgEvent) => {
	router.push({
		name: 'org-event-detail',
		params: {
			orgId: route.params.orgId,
			eventId: event.id,
		},
	})
}

const goEdit = (event: OrgEvent) => {
	router.push({
		name: 'org-event-edit',
		params: {
			orgId: route.params.orgId,
			eventId: event.id,
		},
	})
}

const goCreate = () => {
	router.push({
		name: 'org-event-create',
		params: { orgId: route.params.orgId },
	})
}
</script>
