<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  image: string
  title: string
  client: string
  category: string
  isReversed: boolean
}>()
</script>

<template>
  <Motion
    tag="div"
    class="lg:col-span-6 relative group"
    :class="isReversed ? 'lg:col-start-7' : 'lg:col-start-1'"
    :initial="{ opacity: 0, scale: 0.9, x: isReversed ? 60 : -60 }"
    :while-in-view="{ opacity: 1, scale: 1, x: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    :viewport="{ once: true, amount: 0.3 }"
  >
    <!-- Glow effect -->
    <div
      class="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
    />

    <!-- Image container -->
    <div
      class="relative overflow-hidden rounded-2xl shadow-2xl bg-charcoal-900 border-2 border-sage-100 group-hover:border-sage-300 transition-all duration-500"
    >
      <NuxtImg
        :src="image"
        :alt="title"
        class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      <!-- Hover overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-sage-600/90 to-mint-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
      >
        <div class="text-center text-white p-8">
          <p class="text-lg font-semibold mb-2">{{ client }}</p>
          <p class="text-sm opacity-90">{{ category }}</p>
        </div>
      </div>
    </div>

    <!-- Decorative corner accent -->
    <div
      class="absolute -bottom-6 -right-6 w-24 h-24 bg-mint-400 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"
    />
  </Motion>
</template>
