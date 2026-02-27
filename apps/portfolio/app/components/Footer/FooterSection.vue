<template>
  <footer class="bg-gradient-dark bg-pattern-circuit text-white py-12 relative overflow-hidden">
    <div class="absolute inset-0 bg-charcoal-900/70" />
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3
            class="text-xl font-bold mb-4 bg-gradient-to-r from-white to-mint-400 bg-clip-text text-transparent"
          >
            Nicolas Hormesch
          </h3>
          <p class="text-white/70">
            {{ t('footer.description') }}
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ t('footer.quickLinks') }}</h4>
          <ul class="space-y-2">
            <li>
              <a href="#home" class="text-white/70 hover:text-white transition-colors">{{
                t('nav.home')
              }}</a>
            </li>
            <li>
              <a href="#clients" class="text-white/70 hover:text-white transition-colors">{{
                t('nav.clients')
              }}</a>
            </li>
            <li>
              <a href="#portfolio" class="text-white/70 hover:text-white transition-colors">{{
                t('nav.portfolio')
              }}</a>
            </li>
            <li>
              <a href="#contact" class="text-white/70 hover:text-white transition-colors">{{
                t('nav.contact')
              }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-4">{{ t('footer.connect') }}</h4>
          <div class="flex space-x-4">
            <a
              href="https://github.com/nhm1990"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors p-2"
            >
              <NuxtImg src="/images/github.png" alt="GitHub" class="w-full h-full object-contain" />
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-hormesch-432411280/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors p-2"
            >
              <NuxtImg
                src="/images/linkedin.png"
                alt="LinkedIn"
                class="w-full h-full object-contain"
              />
            </a>
            <a
              href="mailto:nhormesch@posteo.de"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon name="mdi:email" class="text-2xl text-white" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-white/20 pt-8 text-center text-white/60">
        <p>&copy; {{ new Date().getFullYear() }} Nicolas Hormesch. {{ t('footer.rights') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
</script>
