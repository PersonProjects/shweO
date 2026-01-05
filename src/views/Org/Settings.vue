<template>
	<v-container>
		<h1 class="text-h5 font-weight-bold mb-4">
			Organization Settings
		</h1>

		<v-tabs v-model="tab" class="mb-6">
			<v-tab value="general">General</v-tab>
			<v-tab value="members">Members</v-tab>
			<v-tab value="permissions">Permissions</v-tab>
			<v-tab value="danger">Danger Zone</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item value="general">
				<OrgGeneralSettings />
			</v-window-item>

			<v-window-item value="members">
				<OrgMembers />
			</v-window-item>

			<v-window-item value="permissions">
				<OrgPermissions />
			</v-window-item>

			<v-window-item value="danger">
				<OrgDangerZone />
			</v-window-item>
		</v-window>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OrgGeneralSettings from './settings/OrgGeneralSettings.vue'
import OrgMembers from './settings/OrgMembers.vue'
import OrgPermissions from './settings/OrgPermissions.vue'
import OrgDangerZone from './settings/OrgDangerZone.vue'

const tab = ref('general')
</script>
