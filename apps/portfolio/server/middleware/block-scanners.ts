/**
 * Server middleware to block WordPress vulnerability scanners and malicious bots.
 * These automated requests hit the Nuxt SSR fallback function and cause
 * 15-second timeouts, wasting serverless function invocations and CPU.
 *
 * Returns an immediate 404 for known attack paths instead of letting
 * them go through the full SSR pipeline.
 */
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname.toLowerCase()

  // WordPress scanner paths
  const blockedPrefixes = [
    '/wp-',
    '/wordpress/',
    '/wp/',
    '/xmlrpc',
    '/.env',
    '/admin/',
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
