export type UserEvent = {
	eventId: string
	role: 'attendee' | 'organizer'
	status: 'upcoming' | 'past'
}

export const USER_EVENTS: UserEvent[] = [
	{
		eventId: '1',
		role: 'attendee',
		status: 'upcoming',
	},
	{
		eventId: '2',
		role: 'organizer',
		status: 'upcoming',
	},
	{
		eventId: '3',
		role: 'attendee',
		status: 'past',
	},
]
