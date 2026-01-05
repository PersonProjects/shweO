import { defineStore } from 'pinia'
import { 
  Order, 
  OrderStatus, 
  Channel, 
  OrderFilters,
  DashboardStats 
} from '@/types/commerce'
import { mockOrders } from '@/mocks/orders'

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [...mockOrders] as Order[],
    selectedOrder: null as Order | null,
    filters: {} as OrderFilters,
    loading: false,
  }),

  getters: {
    // All orders
    allOrders: (state) => state.orders,

    // Filtered orders
    filteredOrders: (state) => {
      let filtered = [...state.orders]

      if (state.filters.status) {
        filtered = filtered.filter(o => o.status === state.filters.status)
      }

      if (state.filters.channel) {
        filtered = filtered.filter(o => o.channel === state.filters.channel)
      }

      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase()
        filtered = filtered.filter(o => 
          o.orderNumber.toLowerCase().includes(query) ||
          o.customerName.toLowerCase().includes(query) ||
          o.customerPhone.includes(query)
        )
      }

      if (state.filters.dateFrom) {
        filtered = filtered.filter(o => o.createdAt >= state.filters.dateFrom!)
      }

      if (state.filters.dateTo) {
        filtered = filtered.filter(o => o.createdAt <= state.filters.dateTo!)
      }

      return filtered
    },

    // Unseen orders
    unseenOrders: (state) => 
      state.orders.filter(o => o.status === OrderStatus.UNSEEN),

    // Orders by status
    ordersByStatus: (state) => (status: OrderStatus) =>
      state.orders.filter(o => o.status === status),

    // Orders today
    ordersToday: (state) => {
      const today = new Date().toDateString()
      return state.orders.filter(o => o.createdAt.toDateString() === today)
    },

    // Dashboard stats
    dashboardStats: (state): DashboardStats => {
      const today = new Date().toDateString()
      const ordersToday = state.orders.filter(o => o.createdAt.toDateString() === today)
      const pending = state.orders.filter(o => 
        o.status === OrderStatus.UNSEEN || o.status === OrderStatus.CONFIRMED
      )
      const completed = state.orders.filter(o => o.status === OrderStatus.DELIVERED)
      const cancelled = state.orders.filter(o => o.status === OrderStatus.CANCELLED)
      
      const totalRevenue = completed.reduce((sum, o) => sum + o.totalAmount, 0)

      const ordersByChannel = [
        {
          channel: Channel.TELEGRAM,
          count: state.orders.filter(o => o.channel === Channel.TELEGRAM).length
        },
        {
          channel: Channel.MESSENGER,
          count: state.orders.filter(o => o.channel === Channel.MESSENGER).length
        },
        {
          channel: Channel.VIBER,
          count: state.orders.filter(o => o.channel === Channel.VIBER).length
        },
      ]

      return {
        ordersToday: ordersToday.length,
        pendingOrders: pending.length,
        completedOrders: completed.length,
        cancelledOrders: cancelled.length,
        totalRevenue,
        ordersByChannel
      }
    },

    // Unseen count
    unseenCount: (state) => 
      state.orders.filter(o => !o.isRead).length,
  },

  actions: {
    // Set filters
    setFilters(filters: OrderFilters) {
      this.filters = { ...filters }
    },

    // Clear filters
    clearFilters() {
      this.filters = {}
    },

    // Update order status
    updateOrderStatus(orderId: string, status: OrderStatus) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.status = status
        order.updatedAt = new Date()
        order.isRead = true
      }
    },

    // Mark order as read
    markAsRead(orderId: string) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.isRead = true
      }
    },

    // Select order
    selectOrder(order: Order) {
      this.selectedOrder = order
      this.markAsRead(order.id)
    },

    // Add note to order
    addNote(orderId: string, note: string) {
      const order = this.orders.find(o => o.id === orderId)
      if (order) {
        order.notes = note
        order.updatedAt = new Date()
      }
    },

    // Get order by ID
    getOrderById(orderId: string): Order | undefined {
      return this.orders.find(o => o.id === orderId)
    },

    // Simulate fetching orders (for demo)
    async fetchOrders() {
      this.loading = true
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      this.loading = false
    }
  }
})
