import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/media-proxy': {
        target: 'https://www.elegancia.com.pk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/media-proxy/, ''),
      },
    },
  },
});
