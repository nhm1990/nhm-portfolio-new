<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

const phrases = computed(() => {
  const text = t('marquee.text')
  return text.split('.').filter((phrase: string) => phrase.trim().length > 0)
})

// ── Speed constants (px/s) ────────────────────────────────────────────────────
const NORMAL_SPEED = 130 // baseline scroll speed
const AUTO_START_SPEED = 280 // mobile: immediately faster when in view
const HOVER_ACCEL = 1800 // desktop: px/s² acceleration on hover
const HOVER_DECEL = 600 // desktop: px/s² deceleration when mouse leaves
const AUTO_ACCEL = 1200 // mobile: px/s² acceleration after short pause
const HAPPY_THRESHOLD = 5500 // speed at which happy message appears

// ── State ─────────────────────────────────────────────────────────────────────
const posX = ref(0)
const showHappy = ref(false)
const bannerRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

let halfWidth = 0
let speed = NORMAL_SPEED
let accel = 0 // current acceleration (px/s²), 0 = constant speed
let lastTs = 0
let rafId: number | null = null

// ── rAF loop ──────────────────────────────────────────────────────────────────
const tick = (ts: number) => {
  if (!lastTs) lastTs = ts
  const dt = Math.min((ts - lastTs) / 1000, 0.05) // cap delta at 50 ms
  lastTs = ts

  if (!showHappy.value) {
    if (accel > 0) {
      speed += accel * dt
      if (speed >= HAPPY_THRESHOLD) {
        speed = HAPPY_THRESHOLD
        accel = 0
        showHappy.value = true // happy state is permanent — no auto-reset
      }
    } else if (accel < 0) {
      // Decelerate back toward normal speed
      speed += accel * dt
      if (speed <= NORMAL_SPEED) {
        speed = NORMAL_SPEED
        accel = 0
      }
    }

    posX.value -= speed * dt
    // Seamless loop: when we've scrolled one full copy, snap back
    if (halfWidth > 0 && posX.value <= -halfWidth) {
      posX.value += halfWidth
    }
  }

  rafId = requestAnimationFrame(tick)
}

// ── Desktop hover handlers ────────────────────────────────────────────────────
const onMouseEnter = () => {
  if (showHappy.value) return // stay in happy state
  accel = HOVER_ACCEL
}

const onMouseLeave = () => {
  if (showHappy.value) return // stay in happy state
  accel = -HOVER_DECEL // decelerate back to normal speed
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(() => {
  nextTick(() => {
    // Measure the width of one copy (trackRef contains 2 identical copies)
    if (trackRef.value) {
      halfWidth = trackRef.value.scrollWidth / 2
    }
  })

  rafId = requestAnimationFrame(tick)

  // Mobile: auto-accelerate when banner enters viewport
  if (window.matchMedia('(pointer: coarse)').matches) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        speed = AUTO_START_SPEED
        setTimeout(() => {
          accel = AUTO_ACCEL
        }, 1200)
      },
      { threshold: 0.5 }
    )
    if (bannerRef.value) observer.observe(bannerRef.value)
  }
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

const marqueeStyle = computed(() => ({
  transform: `translateX(${posX.value}px)`,
  willChange: 'transform',
}))
</script>

<template>
  <div
    ref="bannerRef"
    class="relative overflow-hidden bg-gradient-dark bg-pattern-circuit py-8 border-y-2 border-sage-500/30 cursor-default"
    style="min-height: 5rem"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="absolute inset-0 bg-charcoal-900/40" />

    <!-- Scrolling track — position driven by rAF, never restarts -->
    <div
      ref="trackRef"
      class="relative flex whitespace-nowrap marquee-track"
      :style="marqueeStyle"
      :class="{ 'marquee-hidden': showHappy }"
    >
      <div v-for="instance in 2" :key="instance" class="flex items-center">
        <span
          v-for="(phrase, index) in phrases"
          :key="`${instance}-${index}`"
          class="inline-flex items-center mx-6"
        >
          <span class="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {{ phrase.trim() }}
          </span>
          <span class="mx-6 text-mint-400 text-4xl">✦</span>
        </span>
      </div>
    </div>

    <!-- Happy message -->
    <div class="happy-message" :class="{ 'happy-message--visible': showHappy }">
      <span
        class="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg bg-gradient-text bg-clip-text text-transparent pb-2"
      >
        {{ t('marquee.happy') }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.marquee-track.marquee-hidden {
  opacity: 0;
}

.happy-message {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
}

.happy-message--visible {
  opacity: 1;
}
</style>
