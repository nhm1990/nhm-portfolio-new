<script setup lang="ts">
import { Motion } from 'motion-v'

const { t } = useI18n({ useScope: 'global' })

const phrases = computed(() => {
  const text = t('marquee.text')
  return text.split('.').filter((phrase: string) => phrase.trim().length > 0)
})

const NORMAL_DURATION = 60
const THRESHOLD = 0.5
const MULTIPLIER = 0.977
const TICK_MS = 55

const duration = ref(NORMAL_DURATION)
const showHappy = ref(false)
let speedInterval: ReturnType<typeof setInterval> | null = null

const onMouseEnter = () => {
  showHappy.value = false
  speedInterval = setInterval(() => {
    duration.value = Math.max(THRESHOLD * 0.7, duration.value * MULTIPLIER)
    if (duration.value <= THRESHOLD) {
      showHappy.value = true
      if (speedInterval) {
        clearInterval(speedInterval)
        speedInterval = null
      }
    }
  }, TICK_MS)
}

const onMouseLeave = () => {
  if (speedInterval) {
    clearInterval(speedInterval)
    speedInterval = null
  }
  // Only fully reset once the easter egg has been triggered;
  // otherwise keep the current speed so the marquee continues where it left off
  if (showHappy.value) {
    showHappy.value = false
    duration.value = NORMAL_DURATION
  }
}

const marqueeStyle = computed(() => ({
  animationDuration: `${duration.value}s`,
}))
</script>

<template>
  <div
    class="relative overflow-hidden bg-gradient-dark bg-pattern-circuit py-8 border-y-2 border-sage-500/30 cursor-default"
    style="min-height: 5rem"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <!-- Overlay für bessere Lesbarkeit -->
    <div class="absolute inset-0 bg-charcoal-900/40" />

    <!-- Marquee — always in DOM to preserve container width/height -->
    <Motion
      tag="div"
      class="relative flex whitespace-nowrap animate-marquee"
      :style="marqueeStyle"
      :animate="{ opacity: showHappy ? 0 : 1 }"
      :transition="{ duration: 0.5, ease: 'easeInOut' }"
    >
      <div v-for="instance in 2" :key="instance" class="flex items-center">
        <span
          v-for="(phrase, index) in phrases"
          :key="`${instance}-${index}`"
          class="inline-flex items-center mx-6"
        >
          <span class="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {{ phrase }}
          </span>
          <span class="mx-6 text-mint-400 text-4xl">✦</span>
        </span>
      </div>
    </Motion>

    <!-- Happy message — absolutely positioned, fades over the marquee -->
    <Motion
      tag="div"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
      :animate="{ opacity: showHappy ? 1 : 0 }"
      :transition="{ duration: 0.6, ease: 'easeInOut' }"
    >
      <span
        class="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg bg-gradient-text bg-clip-text text-transparent pb-2"
      >
        {{ t('marquee.happy') }}
      </span>
    </Motion>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee linear infinite;
}
</style>
