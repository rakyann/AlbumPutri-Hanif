import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import uploadHandler from './api/photos/upload.js'

// Vite plugin to handle /api serverless functions during local development
function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/photos/upload')) {
          try {
            await uploadHandler(req, res);
          } catch (err) {
            console.error('API Dev Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    apiDevPlugin(),
    tailwindcss(),
    react()
  ],
  appType: 'spa',
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
})
