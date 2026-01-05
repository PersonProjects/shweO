<template>
	<!-- Three-dot menu -->
	<v-menu location="bottom end">
		<template #activator="{props}">
			<v-btn
				v-bind="props"
				icon
				variant="text"
			>
				<v-icon icon="mdi-dots-vertical"/>
			</v-btn>
		</template>

		<AppSettingsMenu />
	</v-menu>

	<!-- Sign in button -->
	 <v-btn
	 	variant="outlined"
		class="pa-0"
		rounded
		@click="goLogin"
	 >
		<div class="flex align-center gap-2 ps-1 pe-2">
			<v-avatar size="32">
				<v-icon icon="mdi-account-circle" />
			</v-avatar>
			<span>Sign in</span>
		</div>
	 </v-btn>

</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppSettingsMenu from './menus/AppSettingsMenu.vue'

const router = useRouter()
const goLogin = () => router.push({name: 'login'})
</script>