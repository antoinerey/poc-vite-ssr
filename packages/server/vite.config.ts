import { builtinModules } from 'module'

import { defineConfig } from 'vite'

import { dependencies, devDependencies } from '../../package.json'

export default defineConfig({
  root: 'packages/server',

  build: {
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => 'index.js',
    },

    rollupOptions: {
      external: [
        ...builtinModules,
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
      ],
    },
  },
})
