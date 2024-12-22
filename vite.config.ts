import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      path: 'path-browserify',
      '@': path.resolve(__dirname, './src'),
      querystring: require.resolve('querystring-es3'),
    },
  },
  server: {
    port: 80,
  },
  optimizeDeps: {},
})
