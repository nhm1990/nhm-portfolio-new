// https://nuxt.com/docs/api/configuration/nuxt-config
import MyTheme from './app/themes/mytheme'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@vueuse/motion/nuxt',
    '@tresjs/nuxt',
  ],

  content: {
    database: {
      type: 'sqlite',
      // In-memory SQLite: restored from build-time dump on each cold start.
      // Prevents issues with Vercel's read-only filesystem.
      filename: ':memory:',
    },
  },

  primevue: {
    options: {
      theme: MyTheme,
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: '../app/locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
    ],
    vueI18n: './i18n.config.ts',
  },

  fonts: {
    families: [{ name: 'Poppins', provider: 'google' }],
    defaults: {
      weights: [300, 400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    ssr: {
      noExternal: ['swiper'],
    },
  },

  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY,
  },

  // Bundle MDI icons at build time so the server never fetches them at runtime.
  // Without this, every SSR request triggers an HTTP fetch to Iconify's API,
  // which times out after 1500ms and causes 300-second Vercel function runs.
  icon: {
    serverBundle: {
      collections: ['mdi'],
    },
    clientBundle: {
      scan: true,
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // Only the two real pages exist — everything else is anchor-scrolled (#skills, #contact, etc.).
  routeRules: {
    '/': { prerender: true },
    '/impressum': { prerender: true },
    '/de': { prerender: true },
    '/de/impressum': { prerender: true },
  },

  nitro: {
    preset: 'vercel',
  },
})
