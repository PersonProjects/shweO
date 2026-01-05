import { 
  Order, 
  OrderStatus, 
  Channel, 
  PaymentMethod,
  type OrderItem 
} from '@/types/commerce'

// Helper to generate order number
const generateOrderNumber = (index: number) => {
  const date = new Date()
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '')
  return `SO-${dateStr}-${String(index).padStart(4, '0')}`
}

// Helper to generate random date within last 30 days
const randomDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  return date
}

// Mock products for order items
const mockProducts = [
  { id: 'p1', name: 'ကျန်းမာရေး လက်ဖက်ရည်', code: 'HT-001', price: 5000 },
  { id: 'p2', name: 'မျက်နှာသုတ်ပုဝါ', code: 'FC-002', price: 3500 },
  { id: 'p3', name: 'ဆံပင်ဆေး', code: 'HC-003', price: 12000 },
  { id: 'p4', name: 'လက်မောင်းနာရီ', code: 'WT-004', price: 25000 },
  { id: 'p5', name: 'ဖိနပ်', code: 'SH-005', price: 18000 },
  { id: 'p6', name: 'လက်ဆွဲအိတ်', code: 'BG-006', price: 15000 },
  { id: 'p7', name: 'မျက်မှန်', code: 'GL-007', price: 8000 },
  { id: 'p8', name: 'ရေဘူး', code: 'WB-008', price: 4500 },
  { id: 'p9', name: 'ဖုန်းအိတ်', code: 'PC-009', price: 6000 },
  { id: 'p10', name: 'နားကပ်', code: 'ER-010', price: 7500 },
]

// Myanmar customer names
const customerNames = [
  'မအေးသန်းသန်း', 'ကိုမင်းခန့်', 'မဆုမွန်', 'ကိုသူရိန်', 'မနီလာ',
  'ကိုအောင်ကိုကို', 'မခင်ဇာဝင့်', 'ကိုမြတ်မင်းထွန်း', 'မရွှေစင်မြင့်', 'ကိုကျော်စွာ',
  'မသဲ့ဆု', 'ကိုဇော်လင်း', 'မစုဝေ', 'ကိုစည်သူ', 'မအိအိမွန်',
  'ကိုသန့်လင်း', 'မမြတ်မြတ်မွန်', 'ကိုအေးကျော်', 'မဝင်းဝင်းမော်', 'ကိုညီညီ',
  'မနန္ဒာထွန်း', 'ကိုမြင့်သူရ', 'မစုစုရီ', 'ကိုဖြိုးစိုး', 'မသင်းသင်းအေး',
  'ကိုထူးရာဇ်', 'မခင်မာမာလတ်', 'ကိုရဲမင်းထက်', 'မမေမေခိုင်', 'ကိုစိုးမိုး'
]

// Myanmar addresses (Yangon areas)
const addresses = [
  'အမှတ် ၁၂၃၊ သာကေတမြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၄၅၊ မရမ်းကုန်းမြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၇၈၊ ဗဟန်းမြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၂၃၄၊ ကမာရွတ်မြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၅၆၇၊ ဒဂုံမြို့သစ်မြောက်ပိုင်း၊ ရန်ကုန်',
  'အမှတ် ၉၈၊ လှိုင်သာယာမြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၁၅၆၊ ဆိပ်ကြီးခနောင်တိုမြို့နယ်၊ မန္တလေး',
  'အမှတ် ၃၄၂၊ အမရပူရမြို့နယ်၊ မန္တလေး',
  'အမှတ် ၈၉၊ တာမွေမြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၂၁၁၊ လမ်းမတော်မြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၄၅၆၊ သာကေတမြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၇၈၉၊ မင်္ဂလာတောင်ညွှန့်မြို့နယ်၊ ရန်ကုန်',
  'အမှတ် ၁၂၃၊ လှည်းကြီးမြို့နယ်၊ မန္တလေး',
  'အမှတ် ၃၄၅၊ ဒဂုံမြို့သစ်အရှေ့ပိုင်း၊ ရန်ကုန်',
  'အမှတ် ၆၇၈၊ အင်းစိန်မြို့နယ်၊ ရန်ကုန်'
]

// Phone numbers
const generatePhone = () => {
  const prefixes = ['09-25', '09-26', '09-42', '09-43', '09-77', '09-78', '09-79']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0')
  return `${prefix}${number}`
}

// Generate random order items
const generateOrderItems = (): OrderItem[] => {
  const numItems = Math.floor(Math.random() * 3) + 1 // 1-3 items
  const items: OrderItem[] = []
  const usedProducts = new Set()
  
  for (let i = 0; i < numItems; i++) {
    let product
    do {
      product = mockProducts[Math.floor(Math.random() * mockProducts.length)]
    } while (usedProducts.has(product.id))
    
    usedProducts.add(product.id)
    const quantity = Math.floor(Math.random() * 3) + 1 // 1-3 quantity
    
    items.push({
      productId: product.id,
      productName: product.name,
      productCode: product.code,
      quantity,
      price: product.price,
      subtotal: product.price * quantity
    })
  }
  
  return items
}

// Generate chat deep links
const generateChatLink = (channel: Channel, orderNumber: string): string => {
  const encodedOrder = encodeURIComponent(orderNumber)
  switch (channel) {
    case Channel.TELEGRAM:
      return `https://t.me/mathandar_shop?start=order_${encodedOrder}`
    case Channel.MESSENGER:
      return `https://m.me/mathandar.shop?ref=order_${encodedOrder}`
    case Channel.VIBER:
      return `viber://pa?chatURI=mathandarshop&context=order_${encodedOrder}`
  }
}

// Generate mock orders
export const generateMockOrders = (count: number = 50): Order[] => {
  const orders: Order[] = []
  const channels = [Channel.TELEGRAM, Channel.MESSENGER, Channel.VIBER]
  const statuses = [
    { status: OrderStatus.UNSEEN, weight: 10 },
    { status: OrderStatus.CONFIRMED, weight: 15 },
    { status: OrderStatus.SHIPPED, weight: 5 },
    { status: OrderStatus.DELIVERED, weight: 20 },
    { status: OrderStatus.CANCELLED, weight: 5 },
  ]
  
  for (let i = 0; i < count; i++) {
    // Weighted random status
    const totalWeight = statuses.reduce((sum, s) => sum + s.weight, 0)
    let random = Math.random() * totalWeight
    let status = OrderStatus.CONFIRMED
    
    for (const s of statuses) {
      random -= s.weight
      if (random <= 0) {
        status = s.status
        break
      }
    }
    
    const channel = channels[Math.floor(Math.random() * channels.length)]
    const paymentMethod = Math.random() > 0.7 ? PaymentMethod.BANK_TRANSFER : PaymentMethod.COD
    const items = generateOrderItems()
    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0)
    const orderNumber = generateOrderNumber(count - i)
    const createdAt = randomDate(30)
    const isToday = createdAt.toDateString() === new Date().toDateString()
    
    orders.push({
      id: `order-${i + 1}`,
      orderNumber,
      channel,
      status,
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      customerPhone: generatePhone(),
      customerAddress: addresses[Math.floor(Math.random() * addresses.length)],
      items,
      totalAmount,
      paymentMethod,
      notes: Math.random() > 0.7 ? 'ညနေပိုင်းမှသာ ပို့ပေးပါ' : undefined,
      chatDeepLink: generateChatLink(channel, orderNumber),
      createdAt,
      updatedAt: createdAt,
      isRead: status !== OrderStatus.UNSEEN
    })
  }
  
  // Sort by date (newest first)
  return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export const mockOrders = generateMockOrders(50)
