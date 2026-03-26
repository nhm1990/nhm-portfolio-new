/**
 * Server middleware using an ALLOWLIST approach to protect against scanners,
 * bots, and any unknown paths hitting the Nuxt SSR fallback function.
 *
 * Instead of maintaining an ever-growing blocklist, this middleware only
 * allows requests to known legitimate routes. Everything else gets an
 * immediate 404 — no SSR rendering, no 15-second timeouts, no wasted CPU.
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname.toLowerCase()
  const userAgent = (getRequestHeader(event, 'user-agent') ?? '').toLowerCase()

  // Block aggressive AI crawlers by user-agent (regardless of path)
  const blockedUserAgents = [
    'claudebot',
    'claude-searchbot',
    'gptbot',
    'ccbot',
    'bytespider',
    'amazonbot',
    'anthropic-ai',
  ]

  const isBotBlocked = blockedUserAgents.some((bot) => userAgent.includes(bot))
  if (isBotBlocked) {
    setResponseStatus(event, 403)
    setResponseHeader(event, 'Content-Type', 'text/plain')
    return 'Forbidden'
  }

  // --- Allowlist: only these paths/prefixes may reach Nuxt SSR ---

  // Exact valid page routes
  const allowedExact = ['/', '/de', '/impressum', '/de/impressum', '/favicon.ico', '/robots.txt']

  // Valid path prefixes (internal assets, APIs, static files)
  const allowedPrefixes = [
    '/_nuxt/', // Vite-built client assets
    '/__nuxt_image/', // @nuxt/image optimization
    '/__nuxt_content/', // @nuxt/content internal query API (used during prerender)
    '/api/', // Server API routes (contact, debug-content, _content)
    '/images/', // Static images from public/
  ]

  const isAllowedExact = allowedExact.includes(path)
  const isAllowedPrefix = allowedPrefixes.some((prefix) => path.startsWith(prefix))

  if (!isAllowedExact && !isAllowedPrefix) {
    setResponseStatus(event, 404)
    setResponseHeader(event, 'Content-Type', 'text/plain')
    return 'Not Found'
  }
})
