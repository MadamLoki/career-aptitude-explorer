import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {  // This should match the path you use in your fetch requests
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
});