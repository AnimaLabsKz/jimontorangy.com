import { defineConfig } from 'vite'
import { TanStackStartVite } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    TanStackStartVite({ 
      target: 'vercel', 
      adapter: 'vercel' 
    }),
    react(),
  ],
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
})
