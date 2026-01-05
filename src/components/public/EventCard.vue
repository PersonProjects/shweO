<template>
	<v-card class="event-card">
		<!-- Image + favorite -->
		<div class="image-wrapper">
			<v-img
				lazy-src="https://picsum.photos/id/11/100/60"
				:src="event.cover"
				height="160"
				cover
				class="cursor-pointer"
				@click="$router.push({ name: 'event-detail', params: { eventId: event.id } })"
			/>

			<v-btn
				icon
				size="small"
				variant="elevated"
				class="fav-btn"
				@click.stop="onFavorite"
			>
				<v-icon :icon="isAdded || fav ? 'mdi-heart' : 'mdi-heart-outline'" />
			</v-btn>
		</div>

		<v-card-title>
			{{ event.title }}
		</v-card-title>

		<v-card-subtitle>
			{{ event.date }} • {{ event.location }}
		</v-card-subtitle>

		<v-card-actions>
			<v-btn
				variant="text"
				color="primary"
				@click="$router.push({ name: 'event-detail', params: { eventId: event.id } })"
			>
				View
			</v-btn>

			<v-btn
				v-if="!fav"
				color="primary"
				:loading="joining"
				@click="onJoin"
			>
				Join
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import { notify } from '@/services/toast.service'

defineProps<{ event: any, fav?: boolean }>()

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { isAuthenticated } = storeToRefs(auth)

const joining = ref(false)
const addingFav = ref(false)
const isAdded = ref(false)

const onJoin = async () => {
	if (!isAuthenticated.value) {
		router.push({
			name: 'login',
			query: { redirect: route.fullPath },
		})
		return
	}

	joining.value = true
	await new Promise(r => setTimeout(r, 500))
	joining.value = false
	notify.success('You have joined this event!')
}

const onFavorite = async () => {
	if (!isAuthenticated.value) {
		router.push({
			name: 'login',
			query: { redirect: route.fullPath },
		})
		return
	}

	addingFav.value = true
	await new Promise(r => setTimeout(r, 400))
	addingFav.value = false
	notify.success('Added to favorites')
	isAdded.value = true
}
</script>

<style scoped>
.image-wrapper {
	position: relative;
}

.fav-btn {
	position: absolute;
	top: 8px;
	right: 8px;
}
</style>
