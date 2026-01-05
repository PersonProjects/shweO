<template>
	<v-container>
		<div class="mb-6">
			<h1 class="text-h5 font-weight-bold">
				{{ currentOrg?.name }} Dashboard
			</h1>
			<div class="text-body-2 text-medium-emphasis">
				Overview of your organization
			</div>
		</div>

		<v-row>
			<OrgKpiCard
				title="Total Events"
				:value="kpi.totalEvents"
				icon="mdi-calendar"
			/>

			<OrgKpiCard
				title="Upcoming Events"
				:value="kpi.upcomingEvents"
				icon="mdi-calendar-clock"
			/>

			<OrgKpiCard
				title="Total Attendees"
				:value="kpi.totalAttendees"
				icon="mdi-account-group"
			/>

			<OrgKpiCard
				title="Revenue"
				:value="formattedRevenue"
				icon="mdi-currency-usd"
			/>

			<OrgKpiCard
				title="Draft Events"
				:value="kpi.draftEvents"
				icon="mdi-file-edit"
			/>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrgStore } from '@/stores/org.store'
import { ORG_DASHBOARD_KPI } from '@/mocks/org-dashboard'
import OrgKpiCard from '@/components/org/OrgKpiCard.vue'

const orgStore = useOrgStore()
const { currentOrgId, memberships } = storeToRefs(orgStore)

const currentOrg = computed(() =>
	memberships.value.find(o => o.orgId === currentOrgId.value)
)

const kpi = computed(() =>
	ORG_DASHBOARD_KPI[currentOrgId.value!] ?? {
		totalEvents: 0,
		upcomingEvents: 0,
		pastEvents: 0,
		totalAttendees: 0,
		attendeesThisMonth: 0,
		totalRevenue: 0,
		revenueThisMonth: 0,
		draftEvents: 0,
	}
)

const formattedRevenue = computed(() =>
	`$${kpi.value.totalRevenue.toLocaleString()}`
)
</script>
