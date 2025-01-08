import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.ADZUNA_APP_ID': JSON.stringify(process.env.ADZUNA_APP_ID),
    'process.env.ADZUNA_API_KEY': JSON.stringify(process.env.ADZUNA_API_KEY),
  },
  server: {
    port: 5173,
  }
});