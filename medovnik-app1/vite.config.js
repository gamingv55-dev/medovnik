import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    minify: 'esbuild',
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },
});
