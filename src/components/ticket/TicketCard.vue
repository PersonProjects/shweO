<template>
  <v-card>
    <v-card-title>
      {{ event?.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ event?.date }} • {{ event?.location }}
    </v-card-subtitle>

    <v-card-text>
      <v-chip
        size="small"
        :color="ticket.status === 'active' ? 'success' : 'default'"
      >
        {{ ticket.status.toUpperCase() }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-btn
        variant="text"
        color="primary"
        @click="goEvent"
      >
        View Event
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { EVENTS } from '@/mocks/events'
import type { Ticket } from '@/mocks/tickets'

const props = defineProps<{ ticket: Ticket }>()
const router = useRouter()

const event = computed(() =>
  EVENTS.find(e => e.id === props.ticket.eventId)
)

const goEvent = () => {
  router.push({
    name: 'event-detail',
    params: { eventId: props.ticket.eventId },
  })
}
</script>
