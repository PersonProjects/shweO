<template>
	<v-card>
		<v-card-text>
			<v-text-field label="Organization name" v-model="org.name" />
			<v-textarea label="Description" v-model="org.description" />

			<v-alert
				type="info"
				class="mt-4"
			>
				Status: <strong>{{ org.status }}</strong>
			</v-alert>
		</v-card-text>

		<v-card-actions>
			<v-btn color="primary">Save changes</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ORG_SETTINGS } from '@/mocks/org-settings'

const org = reactive({ ...ORG_SETTINGS })
</script>
