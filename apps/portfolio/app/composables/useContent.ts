import type { Collections } from '@nuxt/content'
import type { PortfolioContent } from '~/models/portfolio'

/**
 * Fetches a locale-aware content document by path.
 * Falls back to the English collection if the active locale has no match.
 *
 * Key: getter function `() => \`...-${locale.value}\`` ensures Nuxt
 * re-fetches when locale changes (recommended by @nuxtjs/i18n maintainer).
 *
 * @see https://github.com/nuxt-modules/i18n/issues/3599
 *
 * @example
 * const { data } = await useContent('/skills')
 * const { data } = await useContent('/portfolio')
 */
export async function useContent(path: string) {
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

/**
 * Typed convenience wrapper around {@link useContent} for portfolio sections.
 * Fetches `/portfolio` once (shared cache key across all sections) and
 * returns a computed ref for the requested section.
 *
 * @example
 * const { data } = await useSectionData('hero')
 */
export async function useSectionData<K extends keyof PortfolioContent>(section: K) {
  const { data } = await useContent('/portfolio')

  const sectionData = computed(() => {
    const meta = data.value?.meta as unknown as PortfolioContent | undefined
    return meta?.[section]
  })

  return { data: sectionData }
}
