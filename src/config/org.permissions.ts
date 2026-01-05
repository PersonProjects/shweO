export const ORG_PERMISSIONS = {
	// organization
	ORG_VIEW: 'org.view',
	ORG_UPDATE: 'org.update',
	ORG_VERIFY_SUBMIT: 'org.verify.submit',
	ORG_MEMBER_INVITE: 'org.member.invite',
	ORG_MEMBER_REMOVE: 'org.member.remove',

	// events
	EVENT_CREATE: 'event.create',
	EVENT_EDIT_OWN: 'event.edit.own',
	EVENT_EDIT_ANY: 'event.edit.any',
	EVENT_PUBLISH: 'event.publish',
	EVENT_CANCEL: 'event.cancel',

	// finance
	EVENT_PAID_CREATE: 'event.paid.create',
	EVENT_REVENUE_VIEW: 'event.revenue.view',
} as const

export type OrgPermission =
  typeof ORG_PERMISSIONS[keyof typeof ORG_PERMISSIONS]
