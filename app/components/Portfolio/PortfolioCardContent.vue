<script setup lang="ts">
import { Motion } from 'motion-v'

defineProps<{
  client: string
  title: string
  category: string
  description: string
  highlights: string[]
  technologies: string[]
  isReversed: boolean
  link?: string
}>()
</script>

<template>
  <Motion
    tag="div"
    class="lg:col-span-6 space-y-6"
    :class="isReversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'"
    :initial="{ opacity: 0, x: isReversed ? -60 : 60 }"
    :while-in-view="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
    :viewport="{ once: true, amount: 0.3 }"
  >
    <!-- Client badge -->
    <div class="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full">
      <div class="w-2 h-2 bg-sage-500 rounded-full animate-pulse" />
      <span class="text-sm font-semibold text-sage-700">{{ client }}</span>
    </div>

    <!-- Title & category -->
    <div>
      <h3 class="text-3xl md:text-4xl font-bold text-charcoal-900 mb-2">
        {{ title }}
      </h3>
      <p class="text-sage-600 font-medium">{{ category }}</p>
    </div>

    <!-- Description -->
    <p class="text-lg text-charcoal-700 leading-relaxed">
      {{ description }}
    </p>

    <!-- Key highlights -->
    <div class="space-y-2">
      <p class="text-sm font-semibold text-charcoal-900 uppercase tracking-wide">Key Features</p>
      <ul class="space-y-2">
        <li v-for="(highlight, index) in highlights" :key="index" class="flex items-start gap-3">
          <span class="text-mint-500 mt-1 shrink-0">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span class="text-charcoal-700">{{ highlight }}</span>
        </li>
      </ul>
    </div>

    <!-- Live Demo Link -->
    <NuxtLink
      v-if="link"
      :to="link"
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sage-500 to-mint-500 text-white font-semibold rounded-xl hover:from-sage-400 hover:to-mint-400 transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-300 text-sm"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
      View Live Demo
    </NuxtLink>

    <!-- Technologies -->
    <div class="space-y-3">
      <p class="text-sm font-semibold text-charcoal-900 uppercase tracking-wide">Technologies</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(tech, index) in technologies"
          :key="index"
          class="px-3 py-1.5 bg-white border border-sage-200 rounded-lg text-sm font-medium text-charcoal-700 hover:border-sage-400 hover:shadow-md transition-all duration-300"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </Motion>
</template>
