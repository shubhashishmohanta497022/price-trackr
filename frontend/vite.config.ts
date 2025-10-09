import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- Add this

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'resolve' section
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})