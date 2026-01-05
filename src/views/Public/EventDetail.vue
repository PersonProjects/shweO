<template>
	<div v-if="event">
		<!-- Hero -->
		<v-img
			:src="event.cover"
			height="360"
			cover
			class="mb-6"
		/>

		<v-container>
			<v-row>
				<!-- Main content -->
				<v-col cols="12" md="8">
					<h1 class="text-h4 font-weight-bold mb-2">
						{{ event.title }}
					</h1>
					<v-chip
						v-if="isOrganizer"
						color="primary"
						size="small"
						class="ml-2"
					>
						Organizer
					</v-chip>

					<v-chip
						v-else-if="isAttendee"
						color="success"
						size="small"
						class="ml-2"
					>
						Attending
					</v-chip>

					<div class="text-body-2 text-medium-emphasis mb-4">
						{{ event.organizerName }} · {{ event.category }}
					</div>

					<p class="text-body-1">
						{{ event.description }}
					</p>
				</v-col>

				<!-- Sidebar -->
				<v-col cols="12" md="4">
					<v-card>
						<v-card-text>
							<v-list density="compact">
								<v-list-item prepend-icon="mdi-calendar">
									{{ event.date }}
								</v-list-item>

								<v-list-item prepend-icon="mdi-map-marker">
									{{ event.location }}
								</v-list-item>

								<v-list-item prepend-icon="mdi-currency-usd">
									{{ event.price === 0 ? 'Free' : `$${event.price}` }}
								</v-list-item>
							</v-list>
						</v-card-text>

						<v-card-actions v-if="!isJoined">
							<v-btn
								block
								color="primary"
								@click="onJoin"
								:disabled="joining"
							>
								Join Event
							</v-btn>
						</v-card-actions>

						<v-card-actions v-if="isAttendee">
							<v-btn
								block
								variant="outlined"
								color="success"
								disabled
							>
								Joined
							</v-btn>
						</v-card-actions>

						<v-card-actions v-if="isOrganizer">
							<v-btn
								block
								color="primary"
								@click="goManage"
							>
								Manage Event
							</v-btn>

							<v-btn
								block
								variant="outlined"
								color="error"
								@click="onCancelEvent"
							>
								Cancel Event
							</v-btn>
						</v-card-actions>

						<v-card-actions v-if="isJoined || !isJoined">
							<v-btn
								block
								variant="text"
								@click="onFavorite"
								:disabled="addingFav"
							>
								Favorite
							</v-btn>
						</v-card-actions>

					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</div>

	<v-container v-else>
		<v-alert type="error">
			Event not found
		</v-alert>
	</v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EVENTS } from '@/mocks/events'
import { useAuthStore } from '@/stores/auth.store'
import { notify } from '@/services/toast.service'
import { storeToRefs } from 'pinia'
import { USER_EVENTS } from '@/mocks/my-events'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const {isAuthenticated} = storeToRefs(auth)

const event = computed(() => {
	return EVENTS.find(e => e.id === route.params.eventId)
})

const userEvents = computed(() => 
	USER_EVENTS.find(ue => ue.eventId === route.params.eventId)
)

const isJoined = computed(() => !!userEvents.value)
const isOrganizer = computed(() => userEvents.value?.role === 'organizer')
const isAttendee = computed(() => userEvents.value?.role === 'attendee')

const joining = ref(false)
const addingFav = ref(false)
const onJoin = async () => {
	if (!isAuthenticated) {
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
	if (!isAuthenticated) {
		router.push({
			name: 'login',
			query: { redirect: route.fullPath },
		})
		return
	}

	addingFav.value = true
	await new Promise(r => setTimeout(r, 500))
	addingFav.value = false
	notify.success('You have added this event to your favorites!')
}

const goManage = () => {
	router.push({
		name: 'org-event-manage', // future route
		params: { eventId: route.params.eventId },
	})
}

const onCancelEvent = async () => {
	if (!confirm('Are you sure you want to cancel this event?')) return
	notify.info('Event has been cancelled (mock)')
}

</script>

