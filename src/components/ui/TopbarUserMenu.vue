<template>
	<v-menu location="bottom end">
		<template #activator="{props}">
			<v-btn
				v-bind="props"
				icon
				variant="text"
			>
				<v-avatar size="32">
					<v-img src="https://cdn.vuetifyjs.com/images/john.jpg" />
				</v-avatar>
			</v-btn>
		</template>

		<v-list>
			<v-list-item >

				<AppSettingsMenu :context="context"/>

				<v-divider />
				<v-list-item 
					title="Sign out"
					@click="logout"
				/>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import AppSettingsMenu from './menus/AppSettingsMenu.vue'
import type { TopbarContext } from '@/types/topbar';

defineProps<{
	context: TopbarContext
}>()

const auth = useAuthStore()
const logout = () => auth.logout()
</script>