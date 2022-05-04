import { createSSRApp } from 'vue'

import App from './App.vue'
import { createRouter } from './router'

export function createApp({ dictionary } = {}) {
  const app = createSSRApp(App)
  const router = createRouter({ dictionary })

  app.use(router)

  return { app, router }
}
