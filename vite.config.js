import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import uploadHandler from './api/photos/upload.js'
import photosHandler from './api/photos/index.js'
import authHandler from './api/auth/google.js'

function apiDevPlugin() {
  return {
    name: 'api-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/auth/google')) {
          try {
            const urlObj = new URL(req.url, `http://${req.headers.host}`);
            req.query = Object.fromEntries(urlObj.searchParams);
            await authHandler(req, res);
          } catch (err) {
            console.error('API Auth Dev Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (req.url.startsWith('/api/photos/upload')) {
          try {
            await uploadHandler(req, res);
          } catch (err) {
            console.error('API Upload Dev Error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (req.url.startsWith('/api/photos')) {
          try {
            const urlObj = new URL(req.url, `http://${req.headers.host}`);
            req.query = Object.fromEntries(urlObj.searchParams);
            await photosHandler(req, res);
          } catch (err) {
            console.error('API Photos Dev Error:', err);
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
