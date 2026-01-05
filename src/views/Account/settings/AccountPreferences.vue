<template>
	<v-card>
		<v-card-text>
			<v-select
				label="Language"
				:items="['en', 'th', 'my']"
				v-model="profile.language"
			/>

			<v-select
				label="Location"
				:items="['Thailand', 'Singapore', 'Myanmar']"
				v-model="profile.location"
			/>

			<v-select
				label="Theme"
				:items="['light', 'dark', 'system']"
			/>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ACCOUNT_PROFILE } from '@/mocks/account'

const profile = reactive({ ...ACCOUNT_PROFILE })
</script>
