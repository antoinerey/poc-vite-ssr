import { createApp } from './main'

const { app, router } = createApp()

async function start() {
  await router.isReady()
  app.mount('#app')

  // Act like a ninja, do not leave any trace behind you!
  delete window.__DICTIONARY__
}

start()
