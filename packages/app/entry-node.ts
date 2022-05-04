import { renderToString } from 'vue/server-renderer'

import { createApp } from './main'

export async function render({ url, dictionary }: { url: string }) {
  const { app, router } = createApp({ dictionary })

  router.push(url)
  await router.isReady()

  const html = await renderToString(app)

  return {
    outlet: html,
  }
}
