// Order Status
export enum OrderStatus {
  UNSEEN = 'unseen',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

// Channel Types
export enum Channel {
  TELEGRAM = 'telegram',
  MESSENGER = 'messenger',
  VIBER = 'viber'
}

// Payment Methods
export enum PaymentMethod {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer'
}

// Order Interface
export interface Order {
  id: string
  orderNumber: string
  channel: Channel
  status: OrderStatus
  customerName: string
  customerPhone: string
  customerAddress: string
  items: OrderItem[]
  totalAmount: number
  paymentMethod: PaymentMethod
  notes?: string
  chatDeepLink: string  // Link back to original chat
  createdAt: Date
  updatedAt: Date
  isRead: boolean
}

// Order Item
export interface OrderItem {
  productId: string
  productName: string
  productCode: string
  quantity: number
  price: number
  subtotal: number
}

// Product Interface
export interface Product {
  id: string
  name: string
  code: string
  price: number
  stockQuantity?: number
  isActive: boolean
  image?: string
  createdAt: Date
  updatedAt: Date
}

// Channel Connection
export interface ChannelConnection {
  channel: Channel
  isConnected: boolean
  isEnabled: boolean
  botToken?: string
  webhookUrl?: string
  lastSyncAt?: Date
}

// Dashboard Stats
export interface DashboardStats {
  ordersToday: number
  pendingOrders: number
  completedOrders: number
  cancelledOrders: number
  totalRevenue: number
  ordersByChannel: {
    channel: Channel
    count: number
  }[]
}

// Order Filters
export interface OrderFilters {
  status?: OrderStatus
  channel?: Channel
  dateFrom?: Date
  dateTo?: Date
  searchQuery?: string
}
