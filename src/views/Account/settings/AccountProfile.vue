<template>
	<v-card>
		<v-card-text>
			<v-avatar size="96" class="mb-4">
				<v-img :src="profile.avatar" />
			</v-avatar>

			<v-text-field label="Name" v-model="profile.name" />
			<v-text-field label="Email" :model-value="profile.email" disabled />
		</v-card-text>

		<v-card-actions>
			<v-btn color="primary">Save</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ACCOUNT_PROFILE } from '@/mocks/account'

const profile = reactive({ ...ACCOUNT_PROFILE })
</script>
