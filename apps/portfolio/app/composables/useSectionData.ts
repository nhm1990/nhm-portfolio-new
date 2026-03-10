import type { Collections } from '@nuxt/content'
import type { PortfolioContent } from '~/models/portfolio'

/**
 * Fetches the full portfolio content file for the active locale and returns
 * a typed slice for the given section.
 *
 * The composable is SYNCHRONOUS — it returns useAsyncData's Promise-like result
 * directly so the component can `await` it. This ensures Nuxt properly registers
 * the async data in the SSR payload and hydration works on first load.
 *
 * @example
 * const { data } = await useSectionData('hero')
 */
export function useSectionData<K extends keyof PortfolioContent>(section: K) {
  const { locale } = useI18n({ useScope: 'global' })

  const result = useAsyncData(
    () => `portfolio-${section}-${locale.value}`,
    async () => {
      const collection = ('content_' + locale.value) as keyof Collections
      const result = await queryCollection(collection).path('/portfolio').first()
      if (!result && locale.value !== 'en') {
        return await queryCollection('content_en').path('/portfolio').first()
      }
      return result
    },
    {
      // If SSR already fetched this key, use the payload directly — no client re-fetch.
      // When locale changes the key changes, so getCachedData returns undefined → re-fetches.
      getCachedData: (key, nuxtApp) =>
        nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
    }
  )

  const data = computed(() => {
    const meta = result.data.value?.meta as unknown as PortfolioContent | undefined
    return meta?.[section]
  })

  // Object.assign preserves the thenable interface from useAsyncData
  // so components can still `await useSectionData(...)` for SSR suspension.
  return Object.assign(result, { data })
}

/**
 * Fetches a content file at the given path for the active locale.
 *
 * The composable is SYNCHRONOUS — it returns useAsyncData's Promise-like result
 * directly so the component can `await` it. This ensures Nuxt properly registers
 * the async data in the SSR payload and hydration works on first load.
 *
 * @example
 * const { data } = await useContentData('/skills')
 */
export function useContentData(path: string) {
  const { locale } = useI18n({ useScope: 'global' })

  return useAsyncData(
    () => `content-${path}-${locale.value}`,
    async () => {
      const collection = ('content_' + locale.value) as keyof Collections
      const result = await queryCollection(collection).path(path).first()
      if (!result && locale.value !== 'en') {
        return await queryCollection('content_en').path(path).first()
      }
      return result
    },
    {
      getCachedData: (key, nuxtApp) =>
        nuxtApp.payload.data[key] ?? nuxtApp.static.data[key],
    }
  )
}
