import { fileURLToPath, URL } from 'node:url'

import type { PluginOption } from 'vite'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { VitePWA } from 'vite-plugin-pwa'
import { ngrok } from 'vite-plugin-ngrok'
import pluginExternal from 'vite-plugin-external'

// load env
const {
  VITE_NGROK_TOKEN,
  VITE_NGROK_ENABLED,
  VITE_DEV_PORT,
  VITE_PRE_PORT,
  VITE_PWA_ENABLED,
  VITE_DTOOLS_ENABLED,
  VITE_PWA_DTOOLS_ENABLED,
} = loadEnv('', process.cwd(), 'VITE')

// plugin renderer base on env values
const renderPluginBasedEnv = (plugin: PluginOption, isEnvConstName: string) => {
  return String(isEnvConstName ?? false).toLowerCase() === 'true' ? plugin : null
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    pluginExternal({
      externals: {
        jsstore: 'jsstore',
      },
    }),
    renderPluginBasedEnv(vueDevTools(), VITE_DTOOLS_ENABLED),
    renderPluginBasedEnv(
      ngrok({
        compression: true,
        authtoken: VITE_NGROK_TOKEN ?? null,
      }),
      VITE_NGROK_ENABLED,
    ),
    renderPluginBasedEnv(
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-icon-180.png', 'manifest-icon-512.maskable.png'],
        manifest: {
          name: 'dignify',
          short_name: 'dignify',
          description: 'fin track & manager',
          theme_color: '#ffffff',
          start_url: '.',
          icons: [
            {
              src: 'manifest-icon-192.maskable.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'manifest-icon-512.maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'manifest-icon-512.maskable.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: ({ request }) =>
                request.destination === 'style' ||
                request.destination === 'script' ||
                request.destination === 'worker',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-resources',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            {
              urlPattern: ({ request }) => request.destination === 'image',
              handler: 'CacheFirst',
              options: {
                cacheName: 'images',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: String(VITE_PWA_DTOOLS_ENABLED ?? false).toLowerCase() === 'true',
        },
      }),
      VITE_PWA_ENABLED,
    ),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ["@sqlite.org/sqlite-wasm", "sqlocal"],
  },
  server: {
    port: Number(VITE_DEV_PORT ?? '3000'),
    allowedHosts: ['.ngrok-free.app'],
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  preview: {
    port: Number(VITE_PRE_PORT ?? '4000'),
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 500000,
      },
    },
  },
})
