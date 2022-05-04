import { createApp } from './main'

const { app, router } = createApp()

async function start() {
  await router.isReady()
  app.mount('#app')
}

start()
