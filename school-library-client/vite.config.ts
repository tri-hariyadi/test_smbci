import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: false
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      lib: path.resolve(__dirname, './src/lib'),
      pages: path.resolve(__dirname, './src/pages'),
      route: path.resolve(__dirname, './src/route'),
      store: path.resolve(__dirname, './src/store')
    }
  }
});
