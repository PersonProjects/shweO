import { defineStore } from "pinia";
import { ORG_ROLE_PERMISSIONS } from "@/config/org.roles";
import type { OrgPermission } from "@/config/org.permissions";
import type { OrgMembership } from "@/types/org.member";

export const useOrgStore = defineStore('org', {
	state: () => ({
		currentOrgId: null as string | null,

		memberships: [] as OrgMembership[],
	}),

	getters: {
		currentOrg(state) {
			return state.memberships.find(m => m.orgId === state.currentOrgId)
		},

		hasOrgPermission: (state) => {
			return (orgId: string, permission: OrgPermission) => {
				const membership = state.memberships.find(m => m.orgId === orgId)
				if (!membership) return false

				return ORG_ROLE_PERMISSIONS[membership.role]?.includes(permission)
			}
		},
	},

	actions: {
		switchOrg(orgId: string) {
			this.currentOrgId = orgId
		}
	}
})