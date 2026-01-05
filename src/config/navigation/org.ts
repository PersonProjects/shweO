import { ORG_PERMISSIONS } from '@/config/org.permissions'
import type { NavItem } from './types'

export const ORG_NAV: NavItem[] = [
  {
    title: 'nav.orgDashboard',
    icon: 'mdi-view-dashboard',
    to: '/org/:orgId/dashboard',
    requiresAuth: true,
    org: {
      role: 'organizer',
    },
  },

  {
    title: 'nav.orgEvents',
    icon: 'mdi-calendar-multiple',
    to: '/org/:orgId/events',
    requiresAuth: true,
    org: {
      role: 'organizer',
    },
  },

  {
    title: 'nav.createEvent',
    icon: 'mdi-calendar-plus',
    to: '/org/:orgId/events/create',
    requiresAuth: true,
    org: {
      permission: ORG_PERMISSIONS.EVENT_CREATE,
	  requiresVerified: true,
    },
  },

  {
    title: 'nav.createPaidEvent',
    icon: 'mdi-currency-usd',
    to: '/org/:orgId/events/create-paid',
    requiresAuth: true,
    org: {
      permission: ORG_PERMISSIONS.EVENT_PAID_CREATE,
      requiresVerified: true,
    },
  },

  {
    title: 'nav.orgSettings',
    icon: 'mdi-cog',
    to: '/org/:orgId/settings',
    requiresAuth: true,
    org: {
      role: 'admin',
    },
  },
]
