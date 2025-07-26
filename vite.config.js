import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    host: '0.0.0.0',     // Allow access from any device
    port: 5173,          // Or another port if you changed it
  },
})
