import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: '', // Remove the VITE_ prefix from environment variables
  server: {
    port: 3000,
  },
});