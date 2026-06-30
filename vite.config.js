import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base: './' makes built asset URLs relative, so the app works whether it is
// served from the domain root or a GitHub Pages project subpath (/jonaki/).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    open: true,
  },
})
