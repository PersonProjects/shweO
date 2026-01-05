<template>
	<v-container>
		<h1 class="text-h5 font-weight-bold mb-6">
			Create Event
		</h1>

		<v-form @submit.prevent="onSubmit">
			<!-- Basic Info -->
			<v-card class="mb-4">
				<v-card-title>Basic Information</v-card-title>
				<v-card-text>
					<v-text-field
						v-model="form.title"
						label="Event title"
						required
					/>

					<v-textarea
						v-model="form.description"
						label="Description"
						rows="4"
					/>

					<v-select
						v-model="form.category"
						label="Category"
						:items="categories"
					/>
				</v-card-text>
			</v-card>

			<!-- Time & Location -->
			<v-card class="mb-4">
				<v-card-title>Date & Location</v-card-title>
				<v-card-text>
					<v-row>
						<v-col cols="12" md="6">
							<v-text-field
								v-model="form.startDate"
								label="Start date"
								type="datetime-local"
							/>
						</v-col>

						<v-col cols="12" md="6">
							<v-text-field
								v-model="form.endDate"
								label="End date"
								type="datetime-local"
							/>
						</v-col>
					</v-row>

					<v-switch
						v-model="form.isOnline"
						label="Online event"
					/>

					<v-text-field
						v-if="!form.isOnline"
						v-model="form.location"
						label="Location"
					/>
				</v-card-text>
			</v-card>

			<!-- Capacity & Status -->
			<v-card class="mb-6">
				<v-card-title>Settings</v-card-title>
				<v-card-text>
					<v-text-field
						v-model.number="form.capacity"
						label="Capacity"
						type="number"
						min="1"
					/>

					<v-select
						v-model="form.status"
						label="Status"
						:items="['draft', 'published']"
					/>
				</v-card-text>
			</v-card>

			<!-- Actions -->
			<div class="flex gap-3">
				<v-btn
					color="primary"
					type="submit"
				>
					Create Event
				</v-btn>

				<v-btn
					variant="text"
					@click="goBack"
				>
					Cancel
				</v-btn>
			</div>
		</v-form>
	</v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { notify } from '@/services/toast.service'

const router = useRouter()
const route = useRoute()

const categories = [
	'Tech',
	'Business',
	'Music',
	'Art',
	'Health',
]

const form = reactive({
	title: '',
	description: '',
	category: '',
	startDate: '',
	endDate: '',
	location: '',
	isOnline: false,
	capacity: undefined as number | undefined,
	status: 'draft',
})

const onSubmit = async () => {
	// simulate API
	await new Promise(r => setTimeout(r, 800))

	notify.success('Event created successfully')

	router.push({
		name: 'org-events',
		params: { orgId: route.params.orgId },
	})
}

const goBack = () => {
	router.back()
}
</script>
