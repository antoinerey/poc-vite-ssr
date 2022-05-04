import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  // By default, the root directory is the project root. While it works well at
  // first, it quickly becomes messy; the `index.html` file and the `public`
  // directory are lost between configuration and tooling stuff. By setting the
  // root property to app, we ask Vite to look for those files elsewhere.
  root: 'packages/app',

  plugins: [vue()],

  build: {
    sourcemap: true,
  },
})
