import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Uni from '@uni-helper/plugin-uni'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    Uni(),
  ]
})
