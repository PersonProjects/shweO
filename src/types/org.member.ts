export type OrgMembership = {
	orgId: string
	name: string
	role: 'admin' | 'organizer' | 'member'
	status: 'draft' | 'pending_verification' | 'verified' | 'rejected' | 'suspended'
}