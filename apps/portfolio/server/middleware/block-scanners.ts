/**
 * Server middleware to block WordPress vulnerability scanners, malicious bots,
 * and aggressive AI crawlers.
 *
 * These automated requests hit the Nuxt SSR fallback function and cause
 * 15-second timeouts, wasting serverless function invocations and CPU.
 *
 * Returns an immediate 404 for known attack paths and blocks known
 * AI crawler user-agents before they reach the SSR pipeline.
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname.toLowerCase()
  const userAgent = (getRequestHeader(event, 'user-agent') ?? '').toLowerCase()

  // Block aggressive AI crawlers by user-agent
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

  // WordPress scanner paths and common attack vectors
  const blockedPrefixes = [
    '/wp-',
    '/wordpress/',
    '/wp/',
    '/xmlrpc',
    '/.env',
    '/admin',
    '/phpmyadmin',
    '/cgi-bin/',
    '/.git',
    '/.well-known/security.txt',
  ]

  const blockedExact = [
    '/xmlrpc.php',
    '/wp-login.php',
    '/wp-cron.php',
    '/wp-config.php',
    '/readme.html',
    '/license.txt',
    '/sellers.json',
    '/ads.txt',
    '/app-ads.txt',
    '/sitemap.xml',
  ]

  // Block if path starts with a blocked prefix
  const isBlockedPrefix = blockedPrefixes.some((prefix) => path.startsWith(prefix))

  // Block if path matches exactly
  const isBlockedExact = blockedExact.includes(path)

  // Block common PHP file requests (no PHP on this site)
  const isPhpRequest = path.endsWith('.php')

  if (isBlockedPrefix || isBlockedExact || isPhpRequest) {
    setResponseStatus(event, 404)
    setResponseHeader(event, 'Content-Type', 'text/plain')
    return 'Not Found'
  }
})
