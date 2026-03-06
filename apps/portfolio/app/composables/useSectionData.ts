import type { Collections } from '@nuxt/content'
import type { PortfolioContent } from '~/models/portfolio'

/**
 * Generic composable that fetches the full portfolio content for the active locale
 * and returns the typed data for a specific section.
 *
 * Falls back to English content when the locale content is unavailable.
 *
 * @example
 * const { data } = useSectionData('hero')
 * // data is typed as ComputedRef<PortfolioContent['hero'] | undefined>
 */
export function useSectionData<K extends keyof PortfolioContent>(section: K) {
  const { locale } = useI18n({ useScope: 'global' })

  const { data } = useAsyncData(
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
