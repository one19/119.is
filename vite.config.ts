import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import rawPlugin from './rawPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rawPlugin(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
});
