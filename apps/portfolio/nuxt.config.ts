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

  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_ECOSCOPE_URL in Vercel for production
      ecoscopeUrl: process.env.NUXT_PUBLIC_ECOSCOPE_URL ?? 'http://localhost:3001',
    },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
