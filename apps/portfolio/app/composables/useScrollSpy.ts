/**
 * Observes section elements and updates the URL hash reactively
 * as the user scrolls, using IntersectionObserver.
 * Uses history.replaceState directly to avoid any router-triggered scrolling.
 * The "home" section maps to no hash (clean URL).
 */
export function useScrollSpy(sectionIds: string[]) {
  if (import.meta.server) return

  const route = useRoute()
  let observer: IntersectionObserver | null = null

  const connect = () => {
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          const id = visible.target.id
          const newHash = id === 'home' ? '' : `#${id}`
          const currentHash = window.location.hash
          if (newHash !== currentHash) {
            history.replaceState(null, '', newHash || window.location.pathname)
          }
        }
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer!.observe(el)
    })
  }

  onMounted(() => connect())

  watch(
    () => route.fullPath,
    () => nextTick(() => connect())
  )

  onUnmounted(() => observer?.disconnect())
}
