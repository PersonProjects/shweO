import type { OrgEvent } from '@/types/org-events'

export const ORG_EVENTS: OrgEvent[] = [
	{
		id: '1',
		title: 'Bangkok Tech Meetup',
		category: 'Tech',
		date: '2025-04-12',
		location: 'Bangkok',
		price: 0,
		cover: 'https://picsum.photos/400/200?1',
		description: 'A meetup for developers and tech founders.',
		organizerName: 'Bangkok Dev Community',

		meta: {
			orgId: 'org-1',
			status: 'published',
			tickets: {
				capacity: 200,
				sold: 120,
			},
			revenue: {
				total: 0,
				currency: 'THB',
			},
			createdAt: '2025-01-10',
			updatedAt: '2025-03-01',
		},
	},
	{
		id: '2',
		title: 'Startup Pitch Night',
		category: 'Business',
		date: '2025-05-02',
		location: 'Singapore',
		price: 25,
		cover: 'https://picsum.photos/400/200?2',
		description: 'Early-stage startups pitch to investors.',
		organizerName: 'SEA Startup Hub',

		meta: {
			orgId: 'org-1',
			status: 'draft',
			tickets: {
				capacity: 150,
				sold: 0,
			},
			revenue: {
				total: 0,
				currency: 'USD',
			},
			createdAt: '2025-02-01',
			updatedAt: '2025-02-01',
		},
	},
	{
		id: '3',
		title: 'AI & Cybersecurity Conference',
		category: 'Tech',
		date: '2024-12-10',
		location: 'Bangkok',
		price: 80,
		cover: 'https://picsum.photos/400/200?3',
		description: 'Industry leaders discuss AI-driven security.',
		organizerName: 'Asia Cyber Forum',

		meta: {
			orgId: 'org-2',
			status: 'ended',
			tickets: {
				capacity: 300,
				sold: 300,
			},
			revenue: {
				total: 24000,
				currency: 'USD',
			},
			createdAt: '2024-09-01',
			updatedAt: '2024-12-10',
		},
	},
]
