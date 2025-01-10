/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: process.env.NODE_ENV === 'production' 
                    ? process.env.API_URL 
                    : 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                ws: true
            }
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
        emptyOutDir: true
    }
});