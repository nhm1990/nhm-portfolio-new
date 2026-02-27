<script setup lang="ts">
import { Motion } from 'motion-v'

interface StatItem {
  label: string
  value: string
  icon: string
  color: 'teal' | 'emerald' | 'cyan' | 'green'
  description: string
}

const stats: StatItem[] = [
  {
    label: 'Cities Monitored',
    value: '25+',
    icon: 'mdi:city-variant-outline',
    color: 'teal',
    description: 'Across 6 continents',
  },
  {
    label: 'Data Points',
    value: '10K+',
    icon: 'mdi:database-outline',
    color: 'emerald',
    description: 'Updated hourly',
  },
  {
    label: 'Pollutants Tracked',
    value: '6',
    icon: 'mdi:molecule',
    color: 'cyan',
    description: 'PM2.5, PM10, NO₂, SO₂, O₃, CO',
  },
  {
    label: 'Update Frequency',
    value: 'Real-time',
    icon: 'mdi:refresh',
    color: 'green',
    description: 'Live data streams',
  },
]

const colorClasses: Record<StatItem['color'], { bg: string; text: string }> = {
  teal: { bg: 'bg-teal-100', text: 'text-teal-600' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600' },
}
</script>

<template>
  <section class="py-16 bg-white border-b border-slate-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Motion
          v-for="(stat, index) in stats"
          :key="stat.label"
          tag="div"
          class="text-center p-6 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors duration-300 group cursor-default"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: index * 0.1 }"
          :viewport="{ once: true }"
        >
          <div
            class="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            :class="[colorClasses[stat.color].bg, colorClasses[stat.color].text]"
          >
            <Icon :name="stat.icon" class="text-2xl" />
          </div>
          <p class="text-2xl md:text-3xl font-bold text-slate-900">{{ stat.value }}</p>
          <p class="text-sm font-medium text-slate-600 mt-1">{{ stat.label }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ stat.description }}</p>
        </Motion>
      </div>
    </div>
  </section>
</template>
