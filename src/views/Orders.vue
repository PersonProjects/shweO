<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">{{ $t('orders.title') }}</h1>
      <p class="text-subtitle-1 text-medium-emphasis">
        {{ filteredOrders.length }} {{ $t('orders.title').toLowerCase() }}
      </p>
    </div>

    <!-- Filters -->
    <v-card class="mb-4">
      <v-card-text>
        <v-row>
          <!-- Search -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="searchQuery"
              :label="$t('orders.searchOrders')"
              prepend-inner-icon="mdi-magnify"
              clearable
              variant="outlined"
              density="compact"
              hide-details
            ></v-text-field>
          </v-col>

          <!-- Status Filter -->
          <v-col cols="12" md="4">
            <v-select
              v-model="statusFilter"
              :label="$t('orders.filterByStatus')"
              :items="statusOptions"
              clearable
              variant="outlined"
              density="compact"
              hide-details
            ></v-select>
          </v-col>

          <!-- Channel Filter -->
          <v-col cols="12" md="4">
            <v-select
              v-model="channelFilter"
              :label="$t('orders.filterByChannel')"
              :items="channelOptions"
              clearable
              variant="outlined"
              density="compact"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Orders List -->
    <v-row v-if="filteredOrders.length > 0">
      <v-col
        v-for="order in filteredOrders"
        :key="order.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card
          hover
          :class="{ 'border-2 border-success': !order.isRead }"
          @click="viewOrder(order)"
          style="cursor: pointer;"
        >
          <v-card-text>
            <!-- Header -->
            <div class="d-flex justify-space-between align-center mb-3">
              <h3 class="text-h6 font-weight-bold">{{ order.orderNumber }}</h3>
              <v-chip
                :color="getStatusColor(order.status)"
                size="small"
              >
                {{ $t(`orders.statuses.${order.status}`) }}
              </v-chip>
            </div>

            <!-- Customer Info -->
            <div class="mb-3">
              <div class="d-flex align-center mb-1">
                <v-icon size="small" class="mr-2">mdi-account</v-icon>
                <span class="text-body-2">{{ order.customerName }}</span>
              </div>
              <div class="d-flex align-center">
                <v-icon size="small" class="mr-2">mdi-phone</v-icon>
                <span class="text-body-2">{{ order.customerPhone }}</span>
              </div>
            </div>

            <!-- Items Summary -->
            <div class="mb-3">
              <p class="text-caption text-medium-emphasis mb-1">{{ $t('orders.items') }}:</p>
              <div v-for="item in order.items.slice(0, 2)" :key="item.productId" class="text-body-2">
                {{ item.productName }} x{{ item.quantity }}
              </div>
              <p v-if="order.items.length > 2" class="text-caption text-medium-emphasis mt-1">
                +{{ order.items.length - 2 }} more
              </p>
            </div>

            <!-- Footer -->
            <v-divider class="my-3"></v-divider>
            <div class="d-flex justify-space-between align-center">
              <div>
                <v-chip :color="getChannelColor(order.channel)" size="small">
                  <v-icon start size="small">{{ getChannelIcon(order.channel) }}</v-icon>
                  {{ $t(`orders.channels.${order.channel}`) }}
                </v-chip>
              </div>
              <div class="text-right">
                <p class="text-h6 font-weight-bold">{{ formatCurrency(order.totalAmount) }}</p>
                <p class="text-caption text-medium-emphasis">{{ formatDate(order.createdAt) }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-card v-else>
      <v-card-text class="text-center py-12">
        <v-icon size="80" color="grey-lighten-1">mdi-package-variant-closed-remove</v-icon>
        <h3 class="text-h5 mt-4 mb-2">{{ $t('orders.noOrders') }}</h3>
        <p class="text-medium-emphasis">
          Try adjusting your filters
        </p>
        <v-btn
          color="primary"
          class="mt-4"
          @click="clearFilters"
        >
          {{ $t('common.clear') }}
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Order Detail Dialog -->
    <v-dialog
      v-model="showDialog"
      max-width="800"
      scrollable
    >
      <v-card v-if="selectedOrder">
        <v-card-title class="d-flex justify-space-between align-center bg-primary">
          <span>{{ selectedOrder.orderNumber }}</span>
          <v-btn
            icon
            variant="text"
            @click="showDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <!-- Status and Channel -->
          <div class="d-flex gap-2 mb-4">
            <v-chip :color="getStatusColor(selectedOrder.status)">
              {{ $t(`orders.statuses.${selectedOrder.status}`) }}
            </v-chip>
            <v-chip :color="getChannelColor(selectedOrder.channel)">
              <v-icon start>{{ getChannelIcon(selectedOrder.channel) }}</v-icon>
              {{ $t(`orders.channels.${selectedOrder.channel}`) }}
            </v-chip>
          </div>

          <!-- Customer Information -->
          <v-card variant="tonal" class="mb-4">
            <v-card-subtitle class="font-weight-bold">{{ $t('orders.customer') }}</v-card-subtitle>
            <v-card-text>
              <p><strong>{{ $t('orders.customerName') }}:</strong> {{ selectedOrder.customerName }}</p>
              <p><strong>{{ $t('orders.customerPhone') }}:</strong> {{ selectedOrder.customerPhone }}</p>
              <p><strong>{{ $t('orders.customerAddress') }}:</strong> {{ selectedOrder.customerAddress }}</p>
            </v-card-text>
          </v-card>

          <!-- Order Items -->
          <v-card variant="tonal" class="mb-4">
            <v-card-subtitle class="font-weight-bold">{{ $t('orders.items') }}</v-card-subtitle>
            <v-card-text>
              <v-table density="compact">
                <thead>
                  <tr>
                    <th>{{ $t('products.name') }}</th>
                    <th>{{ $t('products.code') }}</th>
                    <th class="text-right">{{ $t('products.price') }}</th>
                    <th class="text-right">Qty</th>
                    <th class="text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in selectedOrder.items" :key="item.productId">
                    <td>{{ item.productName }}</td>
                    <td>{{ item.productCode }}</td>
                    <td class="text-right">{{ formatCurrency(item.price) }}</td>
                    <td class="text-right">{{ item.quantity }}</td>
                    <td class="text-right font-weight-bold">{{ formatCurrency(item.subtotal) }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-right font-weight-bold">{{ $t('common.total') }}:</td>
                    <td class="text-right font-weight-bold text-h6">{{ formatCurrency(selectedOrder.totalAmount) }}</td>
                  </tr>
                </tfoot>
              </v-table>
            </v-card-text>
          </v-card>

          <!-- Payment & Notes -->
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-subtitle-2 mb-1">{{ $t('orders.payment') }}:</p>
              <v-chip>{{ $t(`orders.paymentMethods.${selectedOrder.paymentMethod}`) }}</v-chip>
            </v-col>
            <v-col cols="12" md="6">
              <p class="text-subtitle-2 mb-1">{{ $t('orders.notes') }}:</p>
              <p class="text-body-2 text-medium-emphasis">{{ selectedOrder.notes || '-' }}</p>
            </v-col>
          </v-row>

          <!-- Timestamps -->
          <v-divider class="my-4"></v-divider>
          <div class="text-caption text-medium-emphasis">
            <p>{{ $t('orders.createdAt') }}: {{ formatDateTime(selectedOrder.createdAt) }}</p>
            <p>{{ $t('orders.updatedAt') }}: {{ formatDateTime(selectedOrder.updatedAt) }}</p>
          </div>
        </v-card-text>

        <v-card-actions class="pa-4">
          <!-- Open in Chat -->
          <v-btn
            :color="getChannelColor(selectedOrder.channel)"
            variant="tonal"
            :href="selectedOrder.chatDeepLink"
            target="_blank"
          >
            <v-icon start>{{ getChannelIcon(selectedOrder.channel) }}</v-icon>
            Open in {{ $t(`orders.channels.${selectedOrder.channel}`) }}
          </v-btn>

          <v-spacer></v-spacer>

          <!-- Update Status -->
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
              >
                {{ $t('orders.updateStatus') }}
                <v-icon end>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="status in Object.values(OrderStatus)"
                :key="status"
                @click="updateStatus(status)"
              >
                <v-list-item-title>
                  <v-chip :color="getStatusColor(status)" size="small">
                    {{ $t(`orders.statuses.${status}`) }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOrdersStore } from '@/stores/orders.store'
import { Order, OrderStatus, Channel } from '@/types/commerce'
import { useToast } from 'vue-toast-notification'

const { t } = useI18n()
const ordersStore = useOrdersStore()
const toast = useToast()

const searchQuery = ref('')
const statusFilter = ref<OrderStatus | null>(null)
const channelFilter = ref<Channel | null>(null)
const showDialog = ref(false)
const selectedOrder = ref<Order | null>(null)

const statusOptions = computed(() =>
  Object.values(OrderStatus).map(status => ({
    title: t(`orders.statuses.${status}`),
    value: status
  }))
)

const channelOptions = computed(() =>
  Object.values(Channel).map(channel => ({
    title: t(`orders.channels.${channel}`),
    value: channel
  }))
)

const filteredOrders = computed(() => {
  ordersStore.setFilters({
    status: statusFilter.value || undefined,
    channel: channelFilter.value || undefined,
    searchQuery: searchQuery.value || undefined
  })
  return ordersStore.filteredOrders
})

const clearFilters = () => {
  searchQuery.value = ''
  statusFilter.value = null
  channelFilter.value = null
}

const viewOrder = (order: Order) => {
  selectedOrder.value = order
  ordersStore.selectOrder(order)
  showDialog.value = true
}

const updateStatus = (status: OrderStatus) => {
  if (selectedOrder.value) {
    ordersStore.updateOrderStatus(selectedOrder.value.id, status)
    toast.success(t('toast.orderUpdated'))
  }
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US') + ' MMK'
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short'
  })
}

const formatDateTime = (date: Date) => {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status: OrderStatus) => {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.UNSEEN]: 'primary',
    [OrderStatus.CONFIRMED]: 'info',
    [OrderStatus.SHIPPED]: 'warning',
    [OrderStatus.DELIVERED]: 'success',
    [OrderStatus.CANCELLED]: 'error',
  }
  return colors[status]
}

const getChannelColor = (channel: Channel) => {
  const colors: Record<Channel, string> = {
    [Channel.TELEGRAM]: 'info',
    [Channel.MESSENGER]: 'primary',
    [Channel.VIBER]: 'purple',
  }
  return colors[channel]
}

const getChannelIcon = (channel: Channel) => {
  const icons: Record<Channel, string> = {
    [Channel.TELEGRAM]: 'mdi-send',
    [Channel.MESSENGER]: 'mdi-facebook-messenger',
    [Channel.VIBER]: 'mdi-phone',
  }
  return icons[channel]
}
</script>
