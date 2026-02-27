<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
const { data: content } = useSectionData('clients')

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}
</script>

<template>
  <section id="clients" class="relative py-20 bg-sage-50 bg-pattern-grid overflow-hidden">
    <!-- Dekorative Elemente -->
    <div class="absolute top-10 right-20 w-64 h-64 bg-mint-200 rounded-full blur-3xl opacity-20" />
    <div
      class="absolute bottom-10 left-20 w-48 h-48 bg-sage-300 rounded-full blur-3xl opacity-20"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        class="text-center mb-16"
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          {{ content?.title }}
        </h2>
        <p class="text-xl text-charcoal-700">
          {{ content?.subtitle }}
        </p>
      </div>

      <!-- Clients Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
        <div
          v-for="(client, index) in content?.list ?? []"
          :key="client.name"
          :style="{ transitionDelay: `${index * 100}ms` }"
          class="flex items-center justify-center p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-sage-100"
        >
          <div class="text-center">
            <div class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {{ client.icon }}
            </div>
            <p
              class="text-sm font-semibold text-charcoal-900 group-hover:text-sage-600 transition-colors"
            >
              {{ client.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div
        class="relative overflow-hidden bg-gradient-dark bg-pattern-circuit rounded-2xl p-12 text-center shadow-2xl"
      >
        <div class="absolute inset-0 bg-charcoal-900/60" />
        <div class="relative z-10">
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ content?.cta }}
          </h3>
          <Button
            :label="t('nav.contact')"
            class="!bg-white !text-sage-600 !border-0 !px-8 !py-3 !text-lg !font-semibold hover:!scale-105 hover:!shadow-xl transition-all"
            raised
            @click="scrollToSection('contact')"
          />
        </div>

        <!-- Decorative elements -->
        <div class="absolute top-0 left-0 w-40 h-40 bg-mint-500/20 rounded-full blur-3xl" />
        <div class="absolute bottom-0 right-0 w-40 h-40 bg-sage-500/20 rounded-full blur-3xl" />
      </div>
    </div>
  </section>
</template>
