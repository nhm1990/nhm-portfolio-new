<script setup lang="ts">
import { Motion } from 'motion-v'
import { AgCharts } from 'ag-charts-vue3'

const { hourlyData, cityData, isLoading, getAqiDistribution, getCityComparison } = useEnvData()

const cityComparison = computed(() => getCityComparison())
const aqiDistribution = computed(() => getAqiDistribution(cityData.value))

// AG Charts v13: chart options are computed so they react to live API data
// Chart 1: Pollutant Trends (Line)
const trendOptions = computed(() => ({
  data: hourlyData.value,
  title: { text: 'Air Quality Trends (24h)' },
  subtitle: { text: 'Berlin, Germany — Hourly Measurements' },
  series: [
    {
      type: 'line' as const,
      xKey: 'time',
      yKey: 'pm25',
      yName: 'PM2.5 (µg/m³)',
      stroke: '#14b8a6',
      strokeWidth: 2,
      marker: { enabled: false },
    },
    {
      type: 'line' as const,
      xKey: 'time',
      yKey: 'pm10',
      yName: 'PM10 (µg/m³)',
      stroke: '#f59e0b',
      strokeWidth: 2,
      marker: { enabled: false },
    },
    {
      type: 'line' as const,
      xKey: 'time',
      yKey: 'o3',
      yName: 'O₃ (µg/m³)',
      stroke: '#8b5cf6',
      strokeWidth: 2,
      marker: { enabled: false },
    },
  ],
  axes: [
    { type: 'category' as const, position: 'bottom' as const },
    { type: 'number' as const, position: 'left' as const, title: { text: 'µg/m³' } },
  ],
  legend: { enabled: true, position: 'bottom' as const },
}))

// Chart 2: City Comparison (Bar)
const comparisonOptions = computed(() => ({
  data: cityComparison.value,
  title: { text: 'Air Quality Index by City' },
  subtitle: { text: 'Selected Cities — Lower is Better' },
  series: [
    {
      type: 'bar' as const,
      xKey: 'city',
      yKey: 'aqi',
      yName: 'AQI',
      fill: '#14b8a6',
    },
    {
      type: 'bar' as const,
      xKey: 'city',
      yKey: 'pm25',
      yName: 'PM2.5 (µg/m³)',
      fill: '#f59e0b',
    },
  ],
  axes: [
    { type: 'category' as const, position: 'bottom' as const },
    { type: 'number' as const, position: 'left' as const },
  ],
  legend: { enabled: true, position: 'bottom' as const },
}))

// Chart 3: AQI Distribution (Donut/Pie)
const distributionOptions = computed(() => ({
  data: aqiDistribution.value,
  title: { text: 'Global AQI Distribution' },
  subtitle: { text: 'Across 25 Monitored Cities' },
  series: [
    {
      type: 'donut' as const,
      angleKey: 'count',
      legendItemKey: 'status',
      innerRadiusRatio: 0.6,
      fills: ['#4ade80', '#fbbf24', '#fb923c', '#f87171', '#c084fc', '#7f1d1d'],
      strokes: ['#ffffff'],
    },
  ],
  legend: { enabled: true, position: 'bottom' as const },
}))

// Chart 4: AQI Trend (Area)
const aqiTrendOptions = computed(() => ({
  data: hourlyData.value,
  title: { text: 'AQI Trend (24h)' },
  subtitle: { text: 'Berlin, Germany — Air Quality Index Over Time' },
  series: [
    {
      type: 'area' as const,
      xKey: 'time',
      yKey: 'aqi',
      yName: 'AQI',
      fill: '#14b8a6',
      fillOpacity: 0.15,
      stroke: '#14b8a6',
      strokeWidth: 2,
      marker: { enabled: false },
    },
  ],
  axes: [
    { type: 'category' as const, position: 'bottom' as const },
    { type: 'number' as const, position: 'left' as const, title: { text: 'AQI' } },
  ],
  legend: { enabled: false },
}))

const charts = computed(() => [
  { options: trendOptions.value, label: 'Pollutant Trends' },
  { options: comparisonOptions.value, label: 'City Comparison' },
  { options: distributionOptions.value, label: 'AQI Distribution' },
  { options: aqiTrendOptions.value, label: 'AQI Timeline' },
])
</script>

<template>
  <section id="charts" class="py-20 bg-white">
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
        <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Environmental Insights</h2>
        <p class="text-lg text-slate-500 max-w-2xl mx-auto">
          Real-time analysis of global air quality data with interactive visualizations powered by AG
          Charts
        </p>
      </Motion>

      <!-- Charts Grid -->
      <div class="grid md:grid-cols-2 gap-8">
        <Motion
          v-for="(chart, index) in charts"
          :key="chart.label"
          tag="div"
          class="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all duration-300"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: index * 0.1 }"
          :viewport="{ once: true }"
        >
          <ClientOnly>
            <div v-if="isLoading" class="h-[350px] bg-slate-100 rounded-xl animate-pulse flex items-center justify-center">
              <div class="text-center">
                <Icon name="mdi:chart-line" class="text-3xl text-slate-300 mb-2" />
                <p class="text-sm text-slate-400">Fetching live data…</p>
              </div>
            </div>
            <AgCharts v-else :options="chart.options" style="height: 350px; width: 100%" />
            <template #fallback>
              <div
                class="h-[350px] bg-slate-100 rounded-xl animate-pulse flex items-center justify-center"
              >
                <div class="text-center">
                  <Icon name="mdi:chart-line" class="text-3xl text-slate-300 mb-2" />
                  <p class="text-sm text-slate-400">Loading {{ chart.label }}...</p>
                </div>
              </div>
            </template>
          </ClientOnly>
        </Motion>
      </div>
    </div>
  </section>
</template>
