import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 相對路徑：不論部署在網域根目錄或 GitHub Pages 的 /專案名/ 底下都能正確載入資源
  base: './',
  plugins: [react()],
})
