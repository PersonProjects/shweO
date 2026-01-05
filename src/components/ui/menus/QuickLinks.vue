<template>
	<template v-if="links.length">
		<v-list-subheader>
			{{ $t('common.quickActions') }}
		</v-list-subheader>
		<v-list-item
			v-for="item in links"
			:key="item.label"
			@click="go(item.to)"
			link
		>
			<template #prepend>
				<v-icon :icon="item.icon" />
			</template>

			<v-list-item-title>
				{{ item.label }}
			</v-list-item-title>
		</v-list-item>

		<v-divider class="my-2" />
	</template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { TopbarContext } from '@/types/topbar'
import { useOrgStore } from '@/stores/org.store'

const props = defineProps<{
	context: TopbarContext
}>()

const router = useRouter()
const org = useOrgStore()

const go = (to: string | null) => {
	if (!to) return
	router.push(to)
}

const links = computed(() => {
	const base = (() => {
		switch (props.context) {
			case 'public':
				return [
					{ label: 'My Events', to: '/my-events/events', icon: 'mdi-calendar' },
					{ label: 'My Orgs', to: org.currentOrgId ? `/org/${org.currentOrgId}/dashboard` : null, icon: 'mdi-office-building-outline' },
				]

			case 'event':
				return [
					{ label: 'Browse Events', to: '/', icon: 'mdi-calendar-search' },
					{ label: 'My Orgs', to: org.currentOrgId ? `/org/${org.currentOrgId}/dashboard` : null, icon: 'mdi-office-building-outline' },
				]

			case 'org':
				return [
					{ label: 'Browse Events', to: '/', icon: 'mdi-calendar-search' },
					{ label: 'My Events', to: '/my-events/events', icon: 'mdi-calendar' },
				]

			case 'account':
				return [
					{ label: 'Browse Events', to: '/', icon: 'mdi-calendar-search' },
					{ label: 'My Events', to: '/my-events/events', icon: 'mdi-calendar' },
					{ label: 'My Orgs', to: org.currentOrgId ? `/org/${org.currentOrgId}/dashboard` : null, icon: 'mdi-office-building-outline' },
				]

			default: 
				return []
		}
	})()

	// filter invalid entries
	return base.filter(i => !!i.to)
})
</script>
