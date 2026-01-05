export const ORG_STATUS = {
	DRAFT: 'draft',
	PENDING: 'pending_verification',
	VERIFIED: 'verified',
	REJECTED: 'rejected',
	SUSPENDED: 'suspended'

} as const

export type OrgStatus =
  typeof ORG_STATUS[keyof typeof ORG_STATUS]
