<!-- AppSidebar.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="!isMobile && rail"
    :permanent="!isMobile"
	:temporary="isMobile"
	location="left"
	floating
  >
  <v-list v-if="visibleItems.length" density="compact" nav>
      <v-list-item 
		v-for="item in visibleItems"
		:key="item.to"
		:to="resolveTo(item.to)"
		:prepend-icon="item.icon"
		:title="$t(item.title)"
		exact
	  />
    </v-list>

	<v-list v-else density="compact">
		<v-list-item
			prepend-icon="mdi-lock"
			title="No available actions"
		/>
	</v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui.store'
import { useAuthStore } from '@/stores/auth.store'
import { useOrgStore } from '@/stores/org.store'
import type { NavItem } from '@/config/navigation/types'

const props = defineProps<{
	navItems: NavItem[]
}>()

const ui = useUiStore()
const org =useOrgStore()
const { drawer, rail, isMobile } = storeToRefs(ui)
const { toggleRail, toggleDrawer } = ui

const roleRank = {
	admin: 3,
	organizer: 2,
	member: 1,
}

const auth = useAuthStore()
const visibleItems = computed(() => {
	return props.navItems.filter(item => {

		// 1. auth
		if (item.requiresAuth && !auth.isAuthenticated) return false
		if (item.guestOnly && auth.isAuthenticated) return false

		// 2. global permission
		if (item.permission && !auth.hasPermission(item.permission)) {
			return false
		}

		// 3. org-scoped rules
		if (item.org) {
			const orgId = org.currentOrgId
			if (!orgId) return false

			const membership = org.memberships.find(m => m.orgId === orgId)
			if (!membership) return false

			// role hierarchy
			if (
				item.org.role &&
				roleRank[membership.role] < roleRank[item.org.role]
			) {
				return false
			}

			// org permission
			if (
				item.org.permission && 
				!org.hasOrgPermission(orgId, item.org.permission)
			) {
				return false
			}

			// verification
			if (
				item.org.requiresVerified &&
				membership.status !== 'verified'
			) {
				return false
			}
		}
		return true
	})
})

const resolveTo = (path: string) => {
	if (!path.includes(":orgId")) return path
	return path.replace(':orgId', org.currentOrgId ?? '')
}

</script>
