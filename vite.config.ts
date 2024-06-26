import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": loadEnv('', process.cwd(), ''),
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],


        
        runtimeCaching: [{
          handler: 'NetworkFirst',
          urlPattern: /.*\/api\/.*/,
          method: 'GET',
          options: {
            backgroundSync: {
              name: 'getQueueName',
              options: {
                maxRetentionTime: 24 * 60,
                
                // onSync: async ({ queue }) => {
                //   document.querySelector('#root').innerHTML = JSON.stringify(queue);
                // },
              },
            },
          },
        },
        {
          // Nueva configuración para peticiones POST
          urlPattern: /.*\/api\/.*/, // Ajusta este patrón a tus necesidades
          method: 'POST',
          handler: 'NetworkOnly',
          options: {
            backgroundSync: {
              name: 'postQueueName', // Este nombre debe ser único
              options: {
                maxRetentionTime: 24 * 60, // En minutos
                onSync: async ({ queue }) => {
                  // Aquí puedes hacer lo que quieras con la cola de peticiones

                  queue.replayRequests();
                }
              }
            }
          }
        }],
      },
      manifest: {
        name: "Med2k App",
        short_name: "Med2k",
        description: "Med2k es una increíble aplicación para hacer citas médicas y médicas y médicas y médicas",
        theme_color: "#0246e6",
        icons: [
          {
            src: "images/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "images/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "images/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "images/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "images/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      
    }),
  ],
  server: {
    port: 8152,
  }
})
