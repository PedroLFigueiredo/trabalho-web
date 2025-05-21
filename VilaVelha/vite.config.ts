import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths' // ✅ importa o plugin

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // ✅ aplica o plugin
  ],
})
