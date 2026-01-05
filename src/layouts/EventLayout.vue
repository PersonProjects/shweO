<template>
	<v-app>
		<v-layout>
			<AppTopBar context="event"/>
			<AppSidebar :navItems="MY_EVENT_NAV"/>
			
			<v-main>
				<v-container fluid>
					<RouterView />
				</v-container>
			</v-main>
		</v-layout>
	</v-app>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppTopBar from '@/components/layout/AppTopBar.vue';
import { onMounted, onBeforeUnmount } from 'vue';
import { useUiStore } from '@/stores/ui.store';
import { MY_EVENT_NAV } from '@/config/navigation';

const ui = useUiStore()

const checkMobile = () => {
	ui.setMobile(window.innerWidth < 560)
}

onMounted(() => {
	checkMobile()
	window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
	window.removeEventListener('resize', checkMobile)
})
</script>