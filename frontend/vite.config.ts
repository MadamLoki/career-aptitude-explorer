import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: '', // This removes the VITE_ prefix requirement
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
  }
});