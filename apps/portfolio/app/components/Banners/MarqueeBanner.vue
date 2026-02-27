<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })

const phrases = computed(() => {
  const text = t('marquee.text')
  return text.split('.').filter((phrase: string) => phrase.trim().length > 0)
})
</script>

<template>
  <div
    class="relative overflow-hidden bg-gradient-dark bg-pattern-circuit py-8 border-y-2 border-sage-500/30"
  >
    <!-- Overlay für bessere Lesbarkeit -->
    <div class="absolute inset-0 bg-charcoal-900/40" />

    <!-- Marquee Container -->
    <div class="relative flex whitespace-nowrap animate-marquee">
      <!-- First instance of text -->
      <div class="flex items-center">
        <span
          v-for="(phrase, index) in phrases"
          :key="`first-${index}`"
          class="inline-flex items-center mx-6"
        >
          <span class="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {{ phrase }}
          </span>
          <span class="mx-6 text-mint-400 text-4xl">✦</span>
        </span>
      </div>
      <!-- Second instance for seamless loop -->
      <div class="flex items-center">
        <span
          v-for="(phrase, index) in phrases"
          :key="`second-${index}`"
          class="inline-flex items-center mx-6"
        >
          <span class="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
            {{ phrase }}
          </span>
          <span class="mx-6 text-mint-400 text-4xl">✦</span>
        </span>
      </div>
    </div>
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
  animation: marquee 60s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
