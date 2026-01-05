import type { Permission } from '@/config/permissions'
import type { OrgPermission } from '@/config/org.permissions'

export type NavItem = {
	title: string
	icon: string
	to: string

	// auth
	requiresAuth?: boolean
	guestOnly?: boolean
	permission?: Permission

	// org-scoped
	org?: {
		role?: 'admin' | 'organizer' | 'member'
		permission?: OrgPermission
		requiresVerified?: boolean
	}
}