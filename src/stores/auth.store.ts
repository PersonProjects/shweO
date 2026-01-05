import { defineStore } from 'pinia'
import type { Permission } from '@/config/permissions'
import { ROLE_PERMISSIONS } from '@/config/roles'
import { notify } from '@/services/toast.service'
import { useOrgStore } from './org.store'

type UserRole = 'user' | 'admin'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		isAuthenticated: false,
		user: null as null | {
			id: string
			name: string
			role: UserRole
			permissions: Permission[]
		},
	}),

	getters: {
		hasPermission: (state) => {
			return (permission: Permission) => {
				return state.user?.permissions.includes(permission)
			}
		}
	},

	actions: {
		loginNormalUser() {
			this.isAuthenticated = true
			this.user = {
				id: 'u1',
				name: 'Normal User',
				role: 'user',
				permissions: ROLE_PERMISSIONS.user ?? [],
			}

			// clear org state
			useOrgStore().$reset()

			notify.success('Logged in as normal user')
		},

		loginPowerUser() {
			this.isAuthenticated = true
			this.user = {
				id: 'u2',
				name: 'Power User',
				role: 'admin',
				permissions: ROLE_PERMISSIONS.admin ?? [],
			}

			// seed org memberships
			const org = useOrgStore()
			org.$reset()

			org.memberships = [
				{
					orgId: 'org-draft',
					name: 'Draft Org',
					role: 'admin',
					status: 'draft',
				},
				{
					orgId: 'org-pending',
					name: 'Pending Org',
					role: 'organizer',
					status: 'pending_verification',
				},
				{
					orgId: 'org-verified-admin',
					name: 'Verified Admin Org',
					role: 'admin',
					status: 'verified',
				},
				{
					orgId: 'org-verified-organizer',
					name: 'Verified Organizer Org',
					role: 'organizer',
					status: 'verified',
				},
				// {
				// 	orgId: 'org-verified-member',
				// 	name: 'Verified Member Org',
				// 	role: 'member',
				// 	status: 'verified',
				// },
				{
					orgId: 'org-rejected',
					name: 'Rejected Org',
					role: 'admin',
					status: 'rejected',
				},
				{
					orgId: 'org-suspended',
					name: 'Suspended Org',
					role: 'admin',
					status: 'suspended',
				},
			]

			// default org context
			org.currentOrgId = 'org-verified-admin'

			notify.success('Logged in as power user')
		},

		logout() {
			this.isAuthenticated = false
			this.user = null
			useOrgStore().$reset()

			notify.info('Signed out')
		}
	},

})