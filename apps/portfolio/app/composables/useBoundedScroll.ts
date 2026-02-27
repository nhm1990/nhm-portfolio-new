import { useMotionValue, useScroll, useTransform } from 'motion-v'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

/**
 * Tracks bounded scroll progress based on scroll deltas, not absolute scroll position.
 * When the user scrolls **down**, progress increases toward 1 (navbar shrinks).
 * When the user scrolls **up**, progress decreases toward 0 (navbar grows back).
 *
 * Ported from the Earthfilter React implementation (framer-motion → motion-v).
 */
export function useBoundedScroll(threshold: number) {
  const { scrollY } = useScroll()
  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, threshold], [0, 1])

  if (import.meta.client) {
    scrollY.on('change', (current: number) => {
      const previous = scrollY.getPrevious() ?? 0
      const diff = current - previous
      const newValue = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newValue, 0, threshold))
    })
  }

  return { scrollYBounded, scrollYBoundedProgress }
}
