import 'vue-router'
import type { OrgPermission } from '@/config/org.permissions'

declare module 'vue-router' {
	interface RouteMeta {
		requiresAuth?: boolean
		guestOnly?: boolean
		permission?: string

		org?: {
			role?: 'admin' | 'organizer' | 'member'
			permission?: OrgPermission
			requiresVerified?: boolean
		}
	}
}
