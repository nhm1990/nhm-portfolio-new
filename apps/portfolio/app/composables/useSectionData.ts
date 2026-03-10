import type { Collections } from '@nuxt/content'
import type { PortfolioContent } from '~/models/portfolio'

/**
 * Fetches the portfolio content for the active locale and returns the
 * section slice directly. The composable is SYNCHRONOUS — components
 * `await` the returned PromiseLike from `useAsyncData`.
 *
 * Key: getter function `() => \`...-${locale.value}\`` so Nuxt automatically
 * re-fetches when locale changes (recommended by @nuxtjs/i18n maintainer).
 * No `watch` option needed (causes infinite loading on homepage).
 *
 * @see https://github.com/nuxt-modules/i18n/issues/3599
 *
 * @example
 * const { data } = await useSectionData('hero')
 */
export function useSectionData<K extends keyof PortfolioContent>(section: K) {
  const { locale } = useI18n({ useScope: 'global' })

  return useAsyncData(
    () => `portfolio-${section}-${locale.value}`,
    async () => {
      const collection = ('content_' + locale.value) as keyof Collections
      const result = await queryCollection(collection).path('/portfolio').first()
      if (!result && locale.value !== 'en') {
        const fallback = await queryCollection('content_en').path('/portfolio').first()
        return (fallback?.meta as unknown as PortfolioContent)?.[section] ?? null
      }
      return (result?.meta as unknown as PortfolioContent)?.[section] ?? null
    }
  )
}

/**
 * Fetches a content file at the given path for the active locale.
 * Falls back to English if the locale-specific file is missing.
 *
 * @see https://github.com/nuxt-modules/i18n/issues/3599
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
    }
  )
}
