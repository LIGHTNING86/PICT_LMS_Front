import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses, including external IPs
    port: process.env.PORT || 3000, // Use the port provided by Render or fallback to 3000
  }
})
