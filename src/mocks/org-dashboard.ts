export type OrgDashboardKPI = {
	totalEvents: number
	upcomingEvents: number
	pastEvents: number

	totalAttendees: number
	attendeesThisMonth: number

	totalRevenue: number
	revenueThisMonth: number

	draftEvents: number
}

export const ORG_DASHBOARD_KPI: Record<string, OrgDashboardKPI> = {
	'org-1': {
		totalEvents: 12,
		upcomingEvents: 5,
		pastEvents: 7,

		totalAttendees: 1240,
		attendeesThisMonth: 320,

		totalRevenue: 18450,
		revenueThisMonth: 4200,

		draftEvents: 2,
	},
	'org-2': {
		totalEvents: 4,
		upcomingEvents: 1,
		pastEvents: 3,

		totalAttendees: 180,
		attendeesThisMonth: 40,

		totalRevenue: 0,
		revenueThisMonth: 0,

		draftEvents: 1,
	},
}
