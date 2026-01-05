<template>
	<v-data-table
		:headers="headers"
		:items="members"
		density="compact"
	>
		<template #item.role="{ value }">
			<v-chip size="small">{{ value }}</v-chip>
		</template>

		<template #item.status="{ value }">
			<v-chip
				size="small"
				:color="value === 'active' ? 'success' : 'warning'"
			>
				{{ value }}
			</v-chip>
		</template>
	</v-data-table>
</template>

<script setup lang="ts">
import { ORG_MEMBERS } from '@/mocks/org-settings'

const headers = [
	{ title: 'Name', key: 'name' },
	{ title: 'Role', key: 'role' },
	{ title: 'Status', key: 'status' },
]

const members = ORG_MEMBERS
</script>
