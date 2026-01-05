import { PERMISSIONS } from '@/config/permissions'
import type { NavItem } from './types'

export const MY_EVENT_NAV: NavItem[] = [
	{
		title: 'nav.myEvents',
		icon: 'mdi-calendar',
		to: '/my-events/events',
		requiresAuth: true,
		permission: PERMISSIONS.EVENTS_ALL,
	},
	{
		title: 'nav.favorites',
		icon: 'mdi-heart',
		to: '/my-events/favorite',
		requiresAuth: true,
		permission: PERMISSIONS.EVENTS_FAV,
	},
	{
		title: 'nav.tickets',
		icon: 'mdi-ticket',
		to: '/my-events/tickets',
		requiresAuth: true,
		permission: PERMISSIONS.EVENTS_TICKET,
	},
]