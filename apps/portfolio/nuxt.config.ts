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

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // Prerender main pages so content is baked into static HTML at build time.
  // The contact form API still runs as a serverless function.
  routeRules: {
    '/': { prerender: true },
    '/de': { prerender: true },
  },

  nitro: {
    preset: 'vercel',
  },
})
