import type { Plugin } from 'vite'

// Vite 7 pre-transform can still resolve `import("#app-manifest")` when
// `import.meta.server` becomes `if (false)` unless `/* @vite-ignore */` sits on
// the same line as `import(`. Upstream fix: nuxt/nuxt@ff1bfe15 (not yet in 4.4.5).
function viteIgnoreAppManifestDynamicImport(): Plugin {
  const multilineAppManifestImport =
    /_manifest\s*=\s*import\(\s*\/\* webpackIgnore: true \*\/\s*\/\* @vite-ignore \*\/\s*["']#app-manifest["']\s*\)/s

  return {
    name: 'logging-frontend:app-manifest-vite-ignore',
    enforce: 'pre',
    transform(code: string, id: string) {
      const normalized = id.replace(/\\/g, '/').split('?')[0] ?? ''
      if (!normalized.includes('/nuxt/') || !normalized.endsWith('composables/manifest.js')) {
        return
      }
      if (!code.includes('#app-manifest')) return
      const next = code.replace(
        multilineAppManifestImport,
        '_manifest = import(/* webpackIgnore: true */ /* @vite-ignore */ "#app-manifest")'
      )
      if (next !== code) {
        return { code: next, map: null }
      }
    }
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    apiSecret: '123',
    backendApiOrigin: 'http://127.0.0.1:8080',
    public: {
      apiBase: '/api',
      title: 'Hello Nuxt',
    },
  },
   $production: {
    routeRules: {
      '/**': { isr: true },
    },
  },
  $development: {
    //
  },
  $env: {
    staging: {
      //
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@nuxt/test-utils/module'],
  vite: {
    plugins: [viteIgnoreAppManifestDynamicImport()]
  },
  debug: true,
})