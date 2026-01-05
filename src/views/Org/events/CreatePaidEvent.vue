<template>
	<v-container>
		<h1 class="text-h5 font-weight-bold mb-6">
			Create Paid Event
		</h1>

		<EventForm
			paid
			submit-label="Create Paid Event"
			@submit="onSubmit"
			@cancel="goBack"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { notify } from '@/services/toast.service'
import EventForm from '@/components/org/EventForm.vue'

const router = useRouter()
const route = useRoute()

const onSubmit = async (payload: any) => {
	// validation example
	if (payload.price <= 0) {
		notify.error('Paid event must have a price')
		return
	}

	await new Promise(r => setTimeout(r, 800))

	notify.success('Paid event created')

	router.push({
		name: 'org-events',
		params: { orgId: route.params.orgId },
	})
}

const goBack = () => router.back()
</script>
