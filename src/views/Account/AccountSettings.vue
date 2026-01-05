<template>
	<v-container>
		<h1 class="text-h5 font-weight-bold mb-4">
			Account Settings
		</h1>

		<v-tabs v-model="tab" class="mb-6">
			<v-tab value="profile">Profile</v-tab>
			<v-tab value="preferences">Preferences</v-tab>
			<v-tab value="security">Security</v-tab>
			<v-tab value="danger">Danger Zone</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item value="profile">
				<AccountProfile />
			</v-window-item>

			<v-window-item value="preferences">
				<AccountPreferences />
			</v-window-item>

			<v-window-item value="security">
				<AccountSecurity />
			</v-window-item>

			<v-window-item value="danger">
				<AccountDangerZone />
			</v-window-item>
		</v-window>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AccountProfile from './settings/AccountProfile.vue'
import AccountPreferences from './settings/AccountPreferences.vue'
import AccountSecurity from './settings/AccountSecurity.vue'
import AccountDangerZone from './settings/AccountDangerZone.vue'

const tab = ref('profile')
</script>
