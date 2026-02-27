<script setup lang="ts">
import { Motion } from 'motion-v'
</script>

<template>
  <Motion
    tag="div"
    class="mt-16 text-center max-w-3xl mx-auto space-y-4"
    :initial="{ opacity: 0, y: 30 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    :viewport="{ once: true }"
  >
    <!-- Speed icon -->
    <div
      class="inline-flex items-center gap-2 px-4 py-1.5 bg-charcoal-900 rounded-full border border-sage-600/40 mb-2"
    >
      <span class="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
      <span class="text-xs font-bold tracking-widest text-mint-400 uppercase">Fast Lane</span>
    </div>

    <h3 class="text-2xl md:text-3xl font-bold text-charcoal-900 leading-snug">
      AI is accelerating the skill landscape —<br />
      <span class="bg-gradient-text bg-clip-text text-transparent">
        we're not just on the highway, we're in the fast lane.
      </span>
    </h3>

    <p class="text-charcoal-600 text-lg leading-relaxed">
      Technology evolves at full throttle. Staying ahead means constantly adapting, learning new
      tools, and embracing AI not as a threat — but as the turbocharger that makes every developer
      exponentially more powerful.
    </p>
  </Motion>
</template>
