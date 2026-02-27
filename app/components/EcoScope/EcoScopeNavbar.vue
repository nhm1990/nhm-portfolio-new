<script setup lang="ts">
import { Motion } from 'motion-v'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Dashboard', path: '/ecoscope', icon: 'mdi:view-dashboard-outline' },
  { name: 'Data Explorer', path: '/ecoscope/explorer', icon: 'mdi:table-large' },
]

const isActive = (path: string): boolean => route.path === path
</script>

<template>
  <Motion
    tag="nav"
    class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-teal-500/20"
    :initial="{ y: -80 }"
    :animate="{ y: 0 }"
    :transition="{ duration: 0.5, ease: 'easeOut' }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/ecoscope" class="flex items-center gap-3 group">
          <div
            class="w-9 h-9 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-shadow duration-300"
          >
            <Icon name="mdi:leaf" class="text-white text-lg" />
          </div>
          <span class="text-xl font-bold text-white">
            Eco<span class="text-teal-400">Scope</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="
              isActive(link.path)
                ? 'bg-teal-500/20 text-teal-400'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            "
          >
            <Icon :name="link.icon" class="text-base" />
            {{ link.name }}
          </NuxtLink>
        </div>

        <!-- Back to Portfolio -->
        <div class="hidden md:flex items-center">
          <NuxtLink
            to="/#portfolio"
            class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 transition-all duration-200"
          >
            <Icon name="mdi:arrow-left" class="text-base" />
            Portfolio
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle -->
        <button
          class="md:hidden text-slate-300 hover:text-white p-2"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-slate-700/50 bg-slate-900/98 backdrop-blur-md"
      >
        <div class="px-4 py-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            :class="
              isActive(link.path)
                ? 'bg-teal-500/20 text-teal-400'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            "
            @click="isMobileMenuOpen = false"
          >
            <Icon :name="link.icon" class="text-lg" />
            {{ link.name }}
          </NuxtLink>
          <NuxtLink
            to="/#portfolio"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <Icon name="mdi:arrow-left" class="text-lg" />
            Back to Portfolio
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Motion>
</template>
