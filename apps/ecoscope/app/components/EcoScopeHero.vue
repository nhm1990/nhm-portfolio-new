<script setup lang="ts">
import { Motion } from 'motion-v'
</script>

<template>
  <section
    class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 py-24 lg:py-32 overflow-hidden"
  >
    <!-- Animated background decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
      />
      <div
        class="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/5 rounded-full blur-3xl"
      />
    </div>

    <!-- Grid pattern overlay -->
    <div class="absolute inset-0 bg-pattern-grid opacity-[0.03]" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Content -->
        <div class="space-y-8">
          <Motion
            tag="div"
            class="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full"
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.6 }"
            :viewport="{ once: true }"
          >
            <span class="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            <span class="text-sm text-teal-300 font-medium">Live Environmental Monitoring</span>
          </Motion>

          <Motion
            tag="h1"
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.1 }"
            :viewport="{ once: true }"
          >
            Eco<span
              class="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400"
              >Scope</span
            >
          </Motion>

          <Motion
            tag="p"
            class="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.2 }"
            :viewport="{ once: true }"
          >
            Monitor global air quality, analyze environmental trends, and explore real-time data
            from 25+ cities worldwide with our interactive intelligence platform.
          </Motion>

          <Motion
            tag="div"
            class="flex flex-wrap gap-4"
            :initial="{ opacity: 0, y: 30 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7, delay: 0.3 }"
            :viewport="{ once: true }"
          >
            <NuxtLink
              to="/explorer"
              class="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-105 duration-300"
            >
              Open Data Explorer
            </NuxtLink>
            <a
              href="#charts"
              class="px-6 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-white/5 hover:border-slate-500 transition-all duration-300"
            >
              View Charts
            </a>
          </Motion>

          <!-- Tech badges -->
          <Motion
            tag="div"
            class="flex flex-wrap gap-2 pt-4"
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: 1 }"
            :transition="{ duration: 0.8, delay: 0.5 }"
            :viewport="{ once: true }"
          >
            <span
              v-for="tech in ['Vue 3', 'Nuxt', 'AG Grid', 'AG Charts', 'Open-Meteo API', 'TypeScript']"
              :key="tech"
              class="px-3 py-1 text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700 rounded-full"
            >
              {{ tech }}
            </span>
          </Motion>
        </div>

        <!-- Right: Decorative visualization -->
        <Motion
          tag="div"
          class="hidden lg:block relative"
          :initial="{ opacity: 0, scale: 0.8 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.8, delay: 0.3 }"
          :viewport="{ once: true }"
        >
          <div class="relative w-full aspect-square max-w-md mx-auto">
            <!-- Orbiting rings -->
            <div
              class="absolute inset-0 rounded-full border border-teal-500/20 animate-spin"
              style="animation-duration: 20s"
            />
            <div
              class="absolute inset-8 rounded-full border border-emerald-500/15 animate-spin"
              style="animation-duration: 15s; animation-direction: reverse"
            />
            <div
              class="absolute inset-16 rounded-full border border-teal-400/10 animate-spin"
              style="animation-duration: 25s"
            />

            <!-- Center globe icon -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-28 h-28 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/30 rotate-12"
              >
                <Icon name="mdi:earth" class="text-white text-5xl -rotate-12" />
              </div>
            </div>

            <!-- Floating data points -->
            <div
              class="absolute top-8 right-8 px-3 py-1.5 bg-slate-800/80 border border-teal-500/30 rounded-lg backdrop-blur-sm animate-float"
            >
              <span class="text-xs text-teal-400 font-mono">PM2.5: 12.4 µg/m³</span>
            </div>
            <div
              class="absolute bottom-16 left-4 px-3 py-1.5 bg-slate-800/80 border border-emerald-500/30 rounded-lg backdrop-blur-sm animate-float"
              style="animation-delay: 2s"
            >
              <span class="text-xs text-emerald-400 font-mono">AQI: 42 ● Good</span>
            </div>
            <div
              class="absolute top-1/3 left-0 px-3 py-1.5 bg-slate-800/80 border border-cyan-500/30 rounded-lg backdrop-blur-sm animate-float"
              style="animation-delay: 4s"
            >
              <span class="text-xs text-cyan-400 font-mono">O₃: 58 µg/m³</span>
            </div>
            <div
              class="absolute bottom-1/3 right-0 px-3 py-1.5 bg-slate-800/80 border border-teal-500/30 rounded-lg backdrop-blur-sm animate-float"
              style="animation-delay: 3s"
            >
              <span class="text-xs text-teal-300 font-mono">25 Cities Live</span>
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </section>
</template>
