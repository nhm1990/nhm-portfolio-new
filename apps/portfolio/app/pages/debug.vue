<script setup lang="ts">
/**
 * Debug page — visit /debug to see content loading diagnostics.
 * DELETE THIS FILE after debugging.
 */
import type { Collections } from '@nuxt/content'

const { locale } = useI18n({ useScope: 'global' })

const { data: diagnostics, status } = await useAsyncData(
  () => `debug-${locale.value}`,
  async () => {
    const collection = ('content_' + locale.value) as keyof Collections
    const enCollection = 'content_en' as keyof Collections

    const portfolio = await queryCollection(collection)
      .path('/portfolio')
      .first()
      .catch(() => null)
    const portfolioEn = await queryCollection(enCollection)
      .path('/portfolio')
      .first()
      .catch(() => null)
    const skills = await queryCollection(collection)
      .path('/skills')
      .first()
      .catch(() => null)
    const experience = await queryCollection(collection)
      .path('/experience')
      .first()
      .catch(() => null)

    return {
      timestamp: new Date().toISOString(),
      locale: locale.value,
      ssrOrClient: import.meta.server ? 'SSR' : 'CLIENT',
      portfolio: portfolio
        ? {
            hasData: true,
            hasMeta: !!portfolio.meta,
            metaKeys: portfolio.meta ? Object.keys(portfolio.meta as Record<string, unknown>) : [],
            title: portfolio.title,
          }
        : null,
      portfolioEn: portfolioEn
        ? {
            hasData: true,
            hasMeta: !!portfolioEn.meta,
            metaKeys: portfolioEn.meta
              ? Object.keys(portfolioEn.meta as Record<string, unknown>)
              : [],
            title: portfolioEn.title,
          }
        : null,
      skills: skills ? { hasData: true, title: skills.title } : null,
      experience: experience ? { hasData: true, title: experience.title } : null,
    }
  }
)
</script>

<template>
  <div
    style="font-family: monospace; padding: 2rem; background: #111; color: #0f0; min-height: 100vh"
  >
    <h1 style="color: #0f0; margin-bottom: 1rem">Content Debug ({{ locale }})</h1>
    <p>
      Status: <strong>{{ status }}</strong>
    </p>
    <hr style="border-color: #333; margin: 1rem 0" />
    <pre style="white-space: pre-wrap; word-break: break-all">{{
      JSON.stringify(diagnostics, null, 2)
    }}</pre>
  </div>
</template>
