import {
  createMemoryHistory,
  createRouter as createVueRouter,
  createWebHistory,
} from 'vue-router'

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function createRouter({ dictionary } = {}) {
  const createRoute = ({ name, path, component, meta, children }) => {
    return {
      name,
      path,
      component,
      meta,
      children,
      props: () => {
        if (import.meta.env.SSR) {
          return dictionary ? dictionary[name] : {}
        }

        return window.__DICTIONARY__[name]
      },
    }
  }

  const router = createVueRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes: [
      createRoute({
        name: 'home',
        path: '/',
        component: () => import('./pages/Home.vue'),
        meta: {
          loader: async () => {
            await sleep(2000)
            return { name: 'Jane Did' }
          },
        },
        children: [
          createRoute({
            name: 'nested',
            path: '/nested',
            component: () => import('./pages/Nested.vue'),
            meta: {
              loader: async () => {
                await sleep(1000)
                return { age: 9999 }
              },
            },
          }),
        ],
      }),
    ],
  })

  return router
}
