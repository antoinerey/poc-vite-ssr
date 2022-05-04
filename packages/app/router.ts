import {
  createMemoryHistory,
  createRouter as createVueRouter,
  createWebHistory,
} from 'vue-router'

export function createRouter() {
  const router = createVueRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [{
      name: 'home',
      path: '/',
      component: () => import('./pages/Home.vue')
    }],
  })

  return router
}
