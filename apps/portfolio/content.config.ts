import { defineContentConfig, defineCollection } from '@nuxt/content'

// @ts-expect-error - TypeScript inference issue with content config
export default defineContentConfig({
  collections: {
    // English content collection
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
    }),
    // German content collection
    content_de: defineCollection({
      type: 'page',
      source: {
        include: 'de/**',
        prefix: '',
      },
    }),
  },
})
