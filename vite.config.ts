import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rawPlugin from './rawPlugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [rawPlugin(), react()],
})
