<template>
  <v-container>
    <h1 class="text-h5 font-weight-bold mb-4">
      My Tickets
    </h1>

    <TicketList :tickets="tickets" :loading="loading" />
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { USER_TICKETS } from '@/mocks/tickets'
import TicketList from '@/components/ticket/TicketList.vue'

const loading = ref(true)
const tickets = ref([])

onMounted(async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 700))
  tickets.value = USER_TICKETS
  loading.value = false
})
</script>
