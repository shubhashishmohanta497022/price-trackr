import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // The official Vite plugin for React.
    // This enables Fast Refresh (HMR) during development and optimizes the build for production.
    react()
  ],
  resolve: {
    alias: {
      // Sets up a path alias. Now, instead of writing `import Component from '../../components/Component'`,
      // you can simply write `import Component from '@/components/Component'`.
      // This makes imports much cleaner and easier to manage in a large project.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // This configuration is useful when running the frontend and backend locally (not in Docker).
    // It proxies API requests from the frontend dev server (e.g., localhost:5173)
    // to the backend API server (e.g., localhost:8000) to avoid CORS issues.
    // This is not used in the Docker setup but is very helpful for local development.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true,
      },
    }
  }
})

