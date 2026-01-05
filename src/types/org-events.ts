import type { Event } from "@/mocks/events"

export type OrgEventMeta = {
	orgId: string

	status: 'draft' | 'published' | 'ended' | 'cancelled'

	tickets: {
		capacity: number
		sold: number
	}

	revenue: {
		total: number
		currency: 'USD' | 'THB'
	}

	createdAt: string
	updatedAt: string
}

export type OrgEvent = Event & {
	meta: OrgEventMeta
}
