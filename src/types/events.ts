export type EventStatus = 'draft' | 'published' | 'cancelled'

export type Event = {
	id: string
	orgId: string

	title: string
	description: string
	category: string

	startDate: string
	endDate: string
	location: string
	isOnline: boolean

	price: number // 0 = free
	capacity?: number

	cover?: string

	status: EventStatus
	createdAt: string
}
