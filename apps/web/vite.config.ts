import path from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const port = Number(process.env.WEB_PORT ?? 21998);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('WEB_PORT must be an integer between 1 and 65535');
}

const proxy = {
  '^/api(?:/|\\?|$)': { target: process.env.API_PROXY_TARGET ?? 'http://127.0.0.1:8080' },
};

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
    dedupe: ['react', 'react-dom'],
  },
  root: import.meta.dirname,
  build: { outDir: 'dist/public', emptyOutDir: true },
  server: { host: '127.0.0.1', port, strictPort: true, proxy },
  preview: { host: '127.0.0.1', port, strictPort: true, proxy },
});
