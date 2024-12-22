import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import { useUserStore } from '@/stores/user-store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'login' },
  },
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        name: 'trip',
        path: 'trips/:id',
        component: () => import('@/pages/trips/TripDashboard.vue'),
      },
      {
        name: 'trip-form',
        path: 'trips/:id/:mode',
        component: () => import('@/pages/trips/widgets/TripForm.vue'),
      },
      {
        name: 'trans-form',
        path: 'trips/:id/transactions/:idTransaction/:mode',
        component: () => import('@/pages/trips/widgets/TripTransactionForm.vue'),
      },
      {
        name: 'home',
        path: 'trips',
        component: () => import('@/pages/TripHome.vue'),
      },
      {
        name: 'trips',
        path: 'trips',
        component: () => import('@/pages/TripHome.vue'),
      },
    ],
  },
  {
    path: '',
    component: AuthLayout,

    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        name: 'logout',
        path: 'logout',
        component: () => import('../pages/auth/Logout.vue'),
      },
      {
        name: 'callback',
        path: 'auth/callback',
        component: () => import('../pages/auth/Callback.vue'),
      },

      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})
router.beforeEach(async function (to, _, next) {
  const userStore = useUserStore()
  if (to.name !== 'login' && !userStore.jwt == null) {
    next({ name: 'login' })
  } else {
    next()
  }
})
export default router
