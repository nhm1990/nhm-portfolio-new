/**
 * Diagnostic endpoint to verify content is accessible on the server.
 * Visit /api/debug-content to check.
 * DELETE THIS FILE after debugging.
 */
export default defineEventHandler(async (event) => {
  try {
    // Use $fetch to call Nuxt Content's built-in API
    const enPortfolio = await $fetch('/api/_content/query/content_en', {
      method: 'GET',
      params: { path: '/portfolio' },
    }).catch(() => null)

    const dePortfolio = await $fetch('/api/_content/query/content_de', {
      method: 'GET',
      params: { path: '/portfolio' },
    }).catch(() => null)

    return {
      status: 'ok',
      content_en_portfolio: enPortfolio
        ? { hasData: true, type: typeof enPortfolio, isArray: Array.isArray(enPortfolio) }
        : null,
      content_de_portfolio: dePortfolio
        ? { hasData: true, type: typeof dePortfolio, isArray: Array.isArray(dePortfolio) }
        : null,
    }
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return {
      status: 'error',
      message,
    }
  }
})
