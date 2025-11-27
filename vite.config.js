import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),],
    server: {
    port: 3000,
    proxy:{
      '/api/v1':{
        target:'https://study-notion-backend-deploy-3n73.vercel.app/',
        changeOrigin:true,
        secure:false,
      }
    }

  }
})
