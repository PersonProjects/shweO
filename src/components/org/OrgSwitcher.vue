<template>
	<v-menu
		v-if="hasOrgs" location="bottom"
	>
		<template #activator="{ props }">
			<v-btn
				v-bind="props"
				variant="outlined"
				size="small"
				class="text-none"
			>
				<v-icon start icon="mdi-domain" />
				<span class="mx-1">{{ currentOrg?.name }}</span>
				<v-icon end icon="mdi-chevron-down" />
			</v-btn>
		</template>

		<v-list density="compact" min-width="260">
			<v-list-item
				v-for="org in memberships"
				:key="org.orgId"
				@click="switchOrg(org.orgId)"
			>
				<v-list-item-title class="flex align-center justify-between">
					<span>{{ org.name }}</span>
					<v-chip
						v-if="org.status !== 'verified'"
						size="x-small"
						color="warning"
					>
						{{ org.status }}
					</v-chip>
				</v-list-item-title>

				<v-list-item-subtitle>
					{{ org.role }}
				</v-list-item-subtitle>
			</v-list-item>

			<v-divider />

			<v-list-item 
				prepend-icon="mdi-plus"
				title="Create organization"
				@click="goCreateOrg"
			/>
		</v-list>
	</v-menu>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import { useRouter, useRoute} from 'vue-router'
import { useOrgStore } from '@/stores/org.store';
import { storeToRefs } from 'pinia';

const router = useRouter()
const route = useRoute()
const orgStore = useOrgStore()
const {memberships, currentOrgId } = storeToRefs(orgStore)

const hasOrgs = computed(() => memberships.value.length > 0)

const currentOrg = computed(() => 
	memberships.value.find(o => o.orgId === currentOrgId.value)
)

const switchOrg = (orgId: string) => {
	if (orgId === currentOrgId.value) return

	orgStore.switchOrg(orgId)

	router.push({
		name: 'org-dashboard',
		params: { orgId },
	})
}


const goCreateOrg = () => {
	router.push({ name: 'org-create' })
}

</script>