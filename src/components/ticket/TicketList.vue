<template>
  <v-row>
    <v-col
      v-for="ticket in tickets"
      :key="ticket.id"
      cols="12"
      md="6"
    >
      <TicketCard :ticket="ticket" />
    </v-col>

    <v-col v-if="!tickets.length && !loading" cols="12">
      <v-alert type="info">No tickets</v-alert>
    </v-col>

    <v-col v-if="loading" cols="12">
      <v-skeleton-loader type="card" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import TicketCard from './TicketCard.vue'
import type { Ticket } from '@/mocks/tickets'

defineProps<{
  tickets: Ticket[]
  loading: boolean
}>()
</script>
