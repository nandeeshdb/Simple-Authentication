import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],



  //using proxy for CORS policy - means it occurs when client and server are running in differnt ports

  //when ever client  get '/api' it is targeted in 3000port
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        secure:false
      }
    }
  }
})
