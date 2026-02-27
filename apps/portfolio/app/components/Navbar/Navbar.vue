<script setup lang="ts">
import { Motion, useTransform } from 'motion-v'

const { locale, setLocale, t } = useI18n({ useScope: 'global' })
const mobileMenuOpen = ref(false)

const { scrollYBoundedProgress } = useBoundedScroll(400)
const scrollYBoundedProgressDelayed = useTransform(scrollYBoundedProgress, [0, 0.75, 1], [0, 0, 1])
const navHeight = useTransform(scrollYBoundedProgressDelayed, [0, 1], [80, 52])

const navItems = computed(() => [
  { id: 'portfolio', label: t('nav.portfolio') },
  { id: 'skills', label: t('nav.skills') },
  { id: 'experience', label: t('nav.experience') },
  { id: 'clients', label: t('nav.clients') },
  { id: 'contact', label: t('nav.contact') },
])

const toggleLanguage = () => {
  setLocale(locale.value === 'en' ? 'de' : 'en')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Height of navbar
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

const handleMobileNavClick = (id: string) => {
  scrollToSection(id)
  mobileMenuOpen.value = false
}
</script>

<template>
  <Motion
    tag="nav"
    class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm overflow-hidden"
    :style="{ height: navHeight }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      <div class="flex justify-between items-center h-full">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <a
            href="#"
            class="text-2xl font-bold bg-gradient-text bg-clip-text text-transparent"
            @click.prevent="scrollToTop()"
            >NH
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-charcoal-900 hover:text-sage-600 transition-colors duration-300 font-medium"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>

          <!-- Language Switcher -->
          <div class="flex items-center ml-4 pl-4 border-l border-gray-200">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-charcoal-700 border border-charcoal-300 hover:border-sage-500 hover:text-sage-600 transition-colors duration-200"
              @click="toggleLanguage"
            >
              <Icon name="mdi:web" class="text-base" />
              {{ locale === 'en' ? 'EN' : 'DE' }}
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button
            icon="pi pi-bars"
            text
            severity="secondary"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition name="slide-down">
        <div v-if="mobileMenuOpen" class="md:hidden pb-4 pt-2">
          <div class="flex flex-col space-y-3">
            <a
              v-for="item in navItems"
              :key="item.id"
              :href="`#${item.id}`"
              class="text-charcoal-900 hover:text-sage-600 transition-colors duration-300 font-medium py-2"
              @click.prevent="handleMobileNavClick(item.id)"
            >
              {{ item.label }}
            </a>
            <button
              class="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-charcoal-700 border border-charcoal-300 hover:border-sage-500 hover:text-sage-600 transition-colors duration-200"
              @click="toggleLanguage"
            >
              <Icon name="mdi:web" class="text-base" />
              {{ locale === 'en' ? 'EN' : 'DE' }}
            </button>
          </div>
        </div>
      </transition>
    </div>
  </Motion>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
