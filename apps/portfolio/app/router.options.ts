import type { RouterConfig } from '@nuxt/schema'

/**
 * Custom scroll behavior:
 * - Locale switch on the same page → preserve scroll position (no jump)
 * - Hash navigation → smooth scroll to element
 * - Normal navigation → scroll to top
 */
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Strip the i18n locale suffix (e.g. "index___de" → "index") from route names
    const toBase = to.name?.toString().replace(/___\w+$/, '')
    const fromBase = from.name?.toString().replace(/___\w+$/, '')

    // Same page, only locale changed → keep current scroll position
    if (toBase && fromBase && toBase === fromBase) {
      return false
    }

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    if (savedPosition) {
      return savedPosition
    }

    return { left: 0, top: 0 }
  },
}
