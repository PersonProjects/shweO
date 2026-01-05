<template>
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

		<!-- Date & Location -->
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

		<!-- Pricing -->
		<v-card class="mb-4">
			<v-card-title>Pricing</v-card-title>
			<v-card-text>
				<v-text-field
					v-model.number="form.price"
					label="Ticket price"
					type="number"
					min="0"
					prefix="$"
					:disabled="!paid"
				/>

				<v-alert
					v-if="!paid"
					type="info"
					density="compact"
				>
					This is a free event
				</v-alert>
			</v-card-text>
		</v-card>

		<!-- Settings -->
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
				{{ submitLabel }}
			</v-btn>

			<v-btn
				variant="text"
				@click="$emit('cancel')"
			>
				Cancel
			</v-btn>
		</div>
	</v-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineProps<{
	paid: boolean
	submitLabel?: string
	initial?: any
}>()

const emit = defineEmits<{
	(e: 'submit', payload: any): void
	(e: 'cancel'): void
}>()

const categories = ['Tech', 'Business', 'Music', 'Art', 'Health']

const form = reactive({
	title: '',
	description: '',
	category: '',
	startDate: '',
	endDate: '',
	location: '',
	isOnline: false,
	price: 0,
	capacity: undefined as number | undefined,
	status: 'draft',
})

const onSubmit = () => {
	emit('submit', {
		...form,
		price: paid ? form.price : 0,
	})
}
</script>
