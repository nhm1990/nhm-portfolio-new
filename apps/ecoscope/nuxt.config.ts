// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],

  fonts: {
    families: [{ name: 'Inter', provider: 'google' }],
    defaults: {
      weights: [300, 400, 500, 600, 700],
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
      // Set NUXT_PUBLIC_PORTFOLIO_URL in Vercel environment variables
      portfolioUrl: '',
    },
  },

  icon: {
    serverBundle: {
      collections: ['mdi'],
    },
    clientBundle: {
      scan: true,
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/explorer': { prerender: true },
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  nitro: {
    preset: 'vercel',
  },
})
