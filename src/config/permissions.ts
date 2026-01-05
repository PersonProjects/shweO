export const PERMISSIONS = {
	// Events
	EVENTS_ALL : 'all-events',
	EVENTS_FAV : 'fav-envents',
	EVENTS_TICKET : 'ticket-events',
	EVENTS_JOIN : 'join-event',
	EVENTS_WISHLIST : 'wishlist-event',

	// Account Settings
	ACCOUNT_SETTING : 'account-settings',
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]
