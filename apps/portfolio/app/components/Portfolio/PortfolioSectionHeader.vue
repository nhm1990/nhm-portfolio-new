<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <Motion
    tag="div"
    class="text-center mb-20"
    :initial="{ opacity: 0, y: 40 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.7, ease: 'easeOut' }"
    :viewport="{ once: true }"
  >
    <h2 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent">
      {{ title }}
    </h2>
    <p class="text-xl md:text-2xl text-charcoal-600 max-w-3xl mx-auto">
      {{ subtitle }}
    </p>
  </Motion>
</template>
