import type { Collections } from '@nuxt/content'
import type { PortfolioContent } from '~/models/portfolio'

/**
 * Fetches the full portfolio content file for the active locale and returns
 * a typed slice for the given section. Falls back to English if missing.
 *
 * Must be awaited in <script setup> to ensure SSR data is ready on first render.
 *
 * @example
 * const { data } = await useSectionData('hero')
 */
export async function useSectionData<K extends keyof PortfolioContent>(section: K) {
  const { locale } = useI18n({ useScope: 'global' })

  const { data } = await useAsyncData(
    () => `portfolio-${section}-${locale.value}`,
    async () => {
      const collection = ('content_' + locale.value) as keyof Collections
      const result = await queryCollection(collection).path('/portfolio').first()
      if (!result && locale.value !== 'en') {
        return await queryCollection('content_en').path('/portfolio').first()
      }
      return result
    }
  )

  const sectionData = computed(() => {
    const meta = data.value?.meta as unknown as PortfolioContent | undefined
    return meta?.[section]
  })

  return { data: sectionData }
}

/**
 * Fetches a content file at the given path for the active locale.
 * Falls back to English if the locale-specific file is missing.
 *
 * Must be awaited in <script setup> to ensure SSR data is ready on first render.
 *
 * @example
 * const { data } = await useContentData('/skills')
 */
export async function useContentData(path: string) {
  const { locale } = useI18n({ useScope: 'global' })

  const { data } = await useAsyncData(
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

  return { data }
}
