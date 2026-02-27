<script setup lang="ts">
import { Motion } from 'motion-v'

interface Feature {
  title: string
  description: string
  icon: string
  color: string
}

const features: Feature[] = [
  {
    title: 'Real-time Monitoring',
    description:
      'Track air quality data from 25+ cities worldwide with live updates and automated alerts.',
    icon: 'mdi:monitor-eye',
    color: 'from-teal-500 to-teal-600',
  },
  {
    title: 'Interactive Data Grid',
    description:
      'Powered by AG Grid with inline editing, filtering, sorting, validation, and CSV export.',
    icon: 'mdi:table-large',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Advanced Visualizations',
    description:
      'Beautiful charts built with AG Charts — line, bar, donut, and area charts for deep analysis.',
    icon: 'mdi:chart-areaspline',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    title: 'Data Validation',
    description:
      'Edit pollutant values and watch AQI recalculate instantly with color-coded status indicators.',
    icon: 'mdi:shield-check-outline',
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Multi-City Comparison',
    description:
      'Compare air quality across continents — from Stockholm to Mumbai, from Auckland to Cairo.',
    icon: 'mdi:earth',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Export & Reporting',
    description:
      'Export filtered datasets as CSV for further analysis. Full data portability built in.',
    icon: 'mdi:file-export-outline',
    color: 'from-violet-500 to-violet-600',
  },
]
</script>

<template>
  <section class="py-20 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <Motion
        tag="div"
        class="text-center mb-14"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Platform Features</h2>
        <p class="text-lg text-slate-500 max-w-2xl mx-auto">
          Built with modern technologies to deliver a professional-grade environmental data platform
        </p>
      </Motion>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Motion
          v-for="(feature, index) in features"
          :key="feature.title"
          tag="div"
          class="bg-white rounded-2xl p-8 border border-slate-200 hover:border-teal-200 hover:shadow-xl transition-all duration-300 group"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: index * 0.08 }"
          :viewport="{ once: true }"
        >
          <div
            class="w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-lg"
            :class="feature.color"
          >
            <Icon :name="feature.icon" class="text-white text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-3">{{ feature.title }}</h3>
          <p class="text-slate-500 leading-relaxed">{{ feature.description }}</p>
        </Motion>
      </div>

      <!-- CTA Section -->
      <Motion
        tag="div"
        class="mt-16 text-center"
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.3 }"
        :viewport="{ once: true }"
      >
        <NuxtLink
          to="/ecoscope/explorer"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 duration-300 text-lg"
        >
          <Icon name="mdi:table-large" class="text-xl" />
          Start Exploring Data
          <Icon name="mdi:arrow-right" class="text-xl" />
        </NuxtLink>
      </Motion>
    </div>
  </section>
</template>
