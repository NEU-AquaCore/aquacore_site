import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { optimizedImages } from './scripts/optimized-images.mjs'

export default defineConfig({
  base: '/',
  plugins: [optimizedImages(), react()],
})