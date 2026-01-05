import { createRouter, createWebHistory } from 'vue-router'
import CommerceLayout from '@/layouts/CommerceLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Commerce Routes (Main App)
    {
      path: '/',
      component: CommerceLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('@/views/Orders.vue'),
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('@/views/Products.vue'),
        },
        {
          path: 'channels',
          name: 'channels',
          component: () => import('@/views/Channels.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/Settings.vue'),
        },
      ],
    },
  ],
})

export default router
