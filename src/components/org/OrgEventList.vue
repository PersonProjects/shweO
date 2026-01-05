<template>
	<!-- Loading -->
	<v-skeleton-loader
		v-if="loading"
		type="table"
		class="mt-4"
	/>

	<!-- Empty -->
	<v-alert
		v-else-if="!events.length"
		type="info"
		class="mt-4"
	>
		No events found
	</v-alert>

	<!-- Desktop table -->
	<v-data-table
		v-else
		class="d-none d-sm-block"
		:headers="headers"
		:items="events"
		item-key="id"
	>
		<!-- Title -->
		<template #item.title="{ item }">
			<div class="font-weight-medium">
				{{ item.title }}
			</div>
			<div class="text-caption text-medium-emphasis">
				{{ item.date }} · {{ item.location }}
			</div>
		</template>

		<!-- Status -->
		<template #item.status="{ item }">
			<v-chip
				size="small"
				:color="statusColor(item.meta.status)"
			>
				{{ item.meta.status }}
			</v-chip>
		</template>

		<!-- Tickets -->
		<template #item.tickets="{ item }">
			{{ item.meta.tickets.sold }} / {{ item.meta.tickets.capacity }}
		</template>

		<!-- Revenue -->
		<template #item.revenue="{ item }">
			{{ item.meta.revenue.total }}
			{{ item.meta.revenue.currency }}
		</template>

		<!-- Actions -->
		<template #item.actions="{ item }">
			<v-btn
				size="small"
				variant="text"
				color="primary"
				@click="$emit('view', item)"
			>
				View
			</v-btn>

			<v-btn
				v-if="item.meta.status !== 'ended'"
				size="small"
				variant="text"
				color="secondary"
				@click="$emit('edit', item)"
			>
				Edit
			</v-btn>
		</template>
	</v-data-table>

	<!-- Mobile cards -->
	<v-row class="d-sm-none">
		<v-col
			v-for="event in events"
			:key="event.id"
			cols="12"
		>
			<v-card>
				<v-card-title class="d-flex justify-space-between">
					{{ event.title }}
					<v-chip
						size="small"
						:color="statusColor(event.meta.status)"
					>
						{{ event.meta.status }}
					</v-chip>
				</v-card-title>

				<v-card-text>
					<div class="text-caption">
						{{ event.date }} · {{ event.location }}
					</div>

					<div class="mt-2">
						Tickets:
						{{ event.meta.tickets.sold }}
						/
						{{ event.meta.tickets.capacity }}
					</div>

					<div>
						Revenue:
						{{ event.meta.revenue.total }}
						{{ event.meta.revenue.currency }}
					</div>
				</v-card-text>

				<v-card-actions>
					<v-btn
						variant="text"
						color="primary"
						@click="$emit('view', event)"
					>
						View
					</v-btn>
					<v-btn
						v-if="event.meta.status !== 'ended'"
						variant="text"
						@click="$emit('edit', event)"
					>
						Edit
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script setup lang="ts">
import type { OrgEvent } from '@/types/org-events'

defineProps<{
	events: OrgEvent[]
	loading: boolean
}>()

defineEmits<{
	view: [OrgEvent]
	edit: [OrgEvent]
}>()

const headers = [
	{ title: 'Event', value: 'title' },
	{ title: 'Status', value: 'status' },
	{ title: 'Tickets', value: 'tickets' },
	{ title: 'Revenue', value: 'revenue' },
	{ title: 'Actions', value: 'actions', sortable: false },
]

const statusColor = (status: OrgEvent['meta']['status']) => {
	switch (status) {
		case 'published': return 'success'
		case 'draft': return 'grey'
		case 'ended': return 'secondary'
		case 'cancelled': return 'error'
		default: return 'default'
	}
}
</script>
