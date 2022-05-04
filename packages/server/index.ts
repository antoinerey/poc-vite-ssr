import fs from 'fs'
import path from 'path'

import express from 'express'

// Importing node-fetch must be done through dynamic imports because it's
// entirely written in ESM and requiring it fails.
async function polyfillFetch() {
  const {
    default: fetch,
    Headers,
    Request,
    Response,
  } = await import('node-fetch')

  // The node-fetch team is aware of the issue. For some reasons, their types
  // are not compatible with the ones from the DOM TS library.
  // See: https://github.com/node-fetch/node-fetch/issues/1137
  // @ts-ignore
  globalThis.fetch = fetch
  // @ts-ignore
  globalThis.Headers = Headers
  // @ts-ignore
  globalThis.Request = Request
  // @ts-ignore
  globalThis.Response = Response
}

async function createServer() {
  const { createServer: createViteServer } = await import('vite')

  const app = express()
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  })

  app.use(vite.middlewares)
  app.use('*', async (request, response, next) => {
    const url = request.originalUrl

    try {
      const templatePath = path.resolve(__dirname, '../app/index.html')
      const templateRaw = fs.readFileSync(templatePath, 'utf-8')
      const template = await vite.transformIndexHtml(url, templateRaw)

      const { render } = await vite.ssrLoadModule('/entry-node.ts')
      const { outlet } = await render({ url })
      const html = template.replace('<!--ssr-outlet-->', outlet)

      response.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (error) {
      if (error instanceof Error) {
        vite.ssrFixStacktrace(error)
      }

      next(error)
    }
  })

  return app
}

async function start() {
  // Since we rely on `fetch` to fetch the translations and locales, we must
  // install the polyfill before attempting to fire the HTTP requests.
  await polyfillFetch()

  const server = await createServer()

  server.listen(80)
  console.info('Listening on http://localhost')
}

start()
