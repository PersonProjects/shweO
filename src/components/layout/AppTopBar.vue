<template>
  <v-app-bar location="top">
	<v-app-bar-nav-icon v-if="context !== 'public' && context !== 'account'"
	  @click="isMobile ? toggleDrawer() : toggleRail()"
	/>

	<AppLogo />

	<!-- Search bar -->
	<!-- <SearchBar v-if="context === 'public'"/> -->

	<!-- Org switcher -->
	<OrgSwitcher v-if="isAuthenticated && context === 'org'" />

	<v-spacer />

	<!-- profile -->
	<TopbarActions :context="context" class="me-3"/>
	
  </v-app-bar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui.store'
import TopbarActions from '@/components/ui/TopbarActions.vue'
import OrgSwitcher from '@/components/org/OrgSwitcher.vue'
import { useAuthStore } from '@/stores/auth.store'
import AppLogo from '@/components/ui/AppLogo.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import type { TopbarContext } from '@/types/topbar'

defineProps<{
	context: TopbarContext
}>()

const ui = useUiStore()
const { isMobile } = storeToRefs(ui)
const { toggleRail, toggleDrawer } = ui
const { isAuthenticated } = storeToRefs(useAuthStore())

</script>
