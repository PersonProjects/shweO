export type TicketStatus = 'active' | 'used' | 'cancelled'

export type Ticket = {
  id: string
  eventId: string
  userId: string
  type: 'free' | 'paid'
  status: TicketStatus
  issuedAt: string
}

export const USER_TICKETS: Ticket[] = [
  {
    id: 't1',
    eventId: '1',
    userId: 'u1',
    type: 'free',
    status: 'active',
    issuedAt: '2025-04-01',
  },
  {
    id: 't2',
    eventId: '2',
    userId: 'u1',
    type: 'paid',
    status: 'active',
    issuedAt: '2025-03-15',
  },
]
