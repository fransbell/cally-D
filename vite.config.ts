import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cally-D/',
  build: {
    outDir: 'build',
    minify: 'esbuild',
    rollupOptions: {
      treeshake: false,
    },
  },
})
