<script setup lang="ts">
import type { SkillLevel } from '~/models/skills'

defineProps<{
  name: string
  level: SkillLevel
  url?: string
}>()

const badgeClass: Record<SkillLevel, string> = {
  expert:
    'bg-charcoal-900 text-white border border-sage-500 shadow-sage-500/30 shadow-md font-bold',
  advanced:
    'bg-sage-700 text-white border border-sage-400 shadow-sage-400/20 shadow-sm font-semibold',
  intermediate: 'bg-sage-100 text-charcoal-900 border border-sage-300 font-medium',
}

// Tire (outer ring) stroke color per level
const tireStroke: Record<SkillLevel, string> = {
  expert: '#86efac', // mint-400
  advanced: '#a3c4a3', // sage-300
  intermediate: '#7a9e7a', // sage-400
}

// Rim fill color per level
const rimFill: Record<SkillLevel, string> = {
  expert: '#86efac',
  advanced: '#d1e8d1',
  intermediate: '#c6d9c6',
}
</script>

<template>
  <component
    :is="url ? 'a' : 'span'"
    v-bind="url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {}"
    class="inline-flex flex-col items-stretch gap-0 px-2.5 py-0 rounded-lg text-sm whitespace-nowrap select-none transition-transform hover:scale-110 no-underline"
    :class="[badgeClass[level], url ? 'cursor-pointer' : 'cursor-default']"
  >
    <!-- Top axle: 2 tires -->
    <span class="flex justify-between -mx-1 -mt-1">
      <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" :stroke="tireStroke[level]" stroke-width="2" fill="#1a1a1a" />
        <circle cx="7" cy="7" r="3" :stroke="tireStroke[level]" stroke-width="1" fill="none" />
        <circle cx="7" cy="7" r="1.2" :fill="rimFill[level]" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" :stroke="tireStroke[level]" stroke-width="2" fill="#1a1a1a" />
        <circle cx="7" cy="7" r="3" :stroke="tireStroke[level]" stroke-width="1" fill="none" />
        <circle cx="7" cy="7" r="1.2" :fill="rimFill[level]" />
      </svg>
    </span>

    <!-- Badge label -->
    <span class="px-1 py-1.5 text-center">{{ name }}</span>

    <!-- Bottom axle: 2 tires -->
    <span class="flex justify-between -mx-1 -mb-1">
      <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" :stroke="tireStroke[level]" stroke-width="2" fill="#1a1a1a" />
        <circle cx="7" cy="7" r="3" :stroke="tireStroke[level]" stroke-width="1" fill="none" />
        <circle cx="7" cy="7" r="1.2" :fill="rimFill[level]" />
      </svg>
      <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
        <circle cx="7" cy="7" r="6" :stroke="tireStroke[level]" stroke-width="2" fill="#1a1a1a" />
        <circle cx="7" cy="7" r="3" :stroke="tireStroke[level]" stroke-width="1" fill="none" />
        <circle cx="7" cy="7" r="1.2" :fill="rimFill[level]" />
      </svg>
    </span>
  </component>
</template>
