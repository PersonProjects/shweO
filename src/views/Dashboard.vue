<template>
  <div>
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold mb-2">{{ $t('dashboard.title') }}</h1>
      <p class="text-subtitle-1 text-medium-emphasis">{{ $t('dashboard.overview') }}</p>
    </div>

    <!-- Stats Cards -->
    <v-row>
      <!-- Orders Today -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="h-100">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <v-icon color="primary" size="40">mdi-calendar-today</v-icon>
              <v-chip color="primary" size="small">{{ $t('common.today') }}</v-chip>
            </div>
            <h2 class="text-h3 font-weight-bold">{{ stats.ordersToday }}</h2>
            <p class="text-subtitle-2 text-medium-emphasis">{{ $t('dashboard.ordersToday') }}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Pending Orders -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="h-100">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <v-icon color="warning" size="40">mdi-clock-outline</v-icon>
              <v-chip color="warning" size="small">{{ $t('dashboard.pending') }}</v-chip>
            </div>
            <h2 class="text-h3 font-weight-bold">{{ stats.pendingOrders }}</h2>
            <p class="text-subtitle-2 text-medium-emphasis">{{ $t('dashboard.pending') }}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Completed Orders -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="h-100">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <v-icon color="success" size="40">mdi-check-circle</v-icon>
              <v-chip color="success" size="small">{{ $t('dashboard.completed') }}</v-chip>
            </div>
            <h2 class="text-h3 font-weight-bold">{{ stats.completedOrders }}</h2>
            <p class="text-subtitle-2 text-medium-emphasis">{{ $t('dashboard.completed') }}</p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Revenue -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="h-100">
          <v-card-text>
            <div class="d-flex justify-space-between align-center mb-2">
              <v-icon color="success" size="40">mdi-cash</v-icon>
              <v-chip color="success" size="small">MMK</v-chip>
            </div>
            <h2 class="text-h3 font-weight-bold">{{ formatCurrency(stats.totalRevenue) }}</h2>
            <p class="text-subtitle-2 text-medium-emphasis">{{ $t('dashboard.revenue') }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Orders by Channel -->
    <v-row class="mt-4">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>{{ $t('dashboard.channelBreakdown') }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="item in stats.ordersByChannel"
                :key="item.channel"
              >
                <template v-slot:prepend>
                  <v-icon :color="getChannelColor(item.channel)">
                    {{ getChannelIcon(item.channel) }}
                  </v-icon>
                </template>
                <v-list-item-title>{{ $t(`orders.channels.${item.channel}`) }}</v-list-item-title>
                <template v-slot:append>
                  <v-chip :color="getChannelColor(item.channel)">{{ item.count }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Recent Orders -->
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>{{ $t('dashboard.recentOrders') }}</span>
            <v-btn
              color="primary"
              variant="text"
              :to="{ name: 'orders' }"
            >
              {{ $t('dashboard.viewAll') }}
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-list v-if="recentOrders.length > 0">
              <v-list-item
                v-for="order in recentOrders"
                :key="order.id"
                @click="viewOrder(order)"
                style="cursor: pointer;"
              >
                <template v-slot:prepend>
                  <v-avatar :color="getStatusColor(order.status)" size="40">
                    <v-icon color="white">{{ getStatusIcon(order.status) }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title>{{ order.orderNumber }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ order.customerName }} • {{ formatCurrency(order.totalAmount) }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <div class="d-flex flex-column align-end">
                    <v-chip :color="getStatusColor(order.status)" size="small" class="mb-1">
                      {{ $t(`orders.statuses.${order.status}`) }}
                    </v-chip>
                    <v-chip :color="getChannelColor(order.channel)" size="x-small">
                      <v-icon start size="small">{{ getChannelIcon(order.channel) }}</v-icon>
                      {{ $t(`orders.channels.${order.channel}`) }}
                    </v-chip>
                  </div>
                </template>
              </v-list-item>
            </v-list>

            <v-alert v-else type="info" variant="tonal">
              {{ $t('orders.noOrders') }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOrdersStore } from '@/stores/orders.store'
import { Order, OrderStatus, Channel } from '@/types/commerce'
import { useToast } from 'vue-toast-notification'

const { t } = useI18n()
const ordersStore = useOrdersStore()
const toast = useToast()

const showDialog = ref(false)
const selectedOrder = ref<Order | null>(null)

const stats = computed(() => ordersStore.dashboardStats)
const recentOrders = computed(() => ordersStore.allOrders.slice(0, 10))

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US')
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

const getStatusIcon = (status: OrderStatus) => {
  const icons: Record<OrderStatus, string> = {
    [OrderStatus.UNSEEN]: 'mdi-email',
    [OrderStatus.CONFIRMED]: 'mdi-check',
    [OrderStatus.SHIPPED]: 'mdi-truck',
    [OrderStatus.DELIVERED]: 'mdi-check-circle',
    [OrderStatus.CANCELLED]: 'mdi-close-circle',
  }
  return icons[status]
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

onMounted(async () => {
  await ordersStore.fetchOrders()
})
</script>
