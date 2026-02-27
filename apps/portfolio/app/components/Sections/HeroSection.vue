<script setup lang="ts">
const { t, locale } = useI18n()
const { data: content } = useSectionData('hero')

const seoTitle = computed(() =>
  locale.value === 'de'
    ? 'Nicolas Hormesch – Software-Entwickler Portfolio'
    : 'Nicolas Hormesch – Software Developer Portfolio'
)

const seoOgTitle = computed(() =>
  locale.value === 'de'
    ? 'Nicolas Hormesch – Software-Entwickler'
    : 'Nicolas Hormesch – Software Developer'
)

useSeoMeta({
  title: () => seoTitle.value,
  description: () => content.value?.description ?? '',
  ogTitle: () => seoOgTitle.value,
  ogDescription: () => content.value?.description ?? '',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

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
  <section
    id="home"
    class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white"
  >
    <!-- Hintergrundmuster -->
    <div class="absolute inset-0 bg-pattern-leaves opacity-100" />
    <div class="absolute inset-0 bg-gradient-hero" />
    <div
      class="absolute top-20 right-10 w-96 h-96 bg-mint-200 rounded-full blur-3xl opacity-30 animate-float"
    />
    <div
      class="absolute bottom-20 left-10 w-80 h-80 bg-sage-300 rounded-full blur-3xl opacity-40 animate-float"
      style="animation-delay: 1s"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div
          v-motion
          class="text-center lg:text-left order-2 lg:order-1"
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <div class="inline-block mb-4">
            <span
              class="px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-semibold shadow-sm border border-sage-200"
            >
              {{ content?.greeting }}
            </span>
          </div>
          <h1
            class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-text bg-clip-text text-transparent"
          >
            {{ content?.title }}
          </h1>
          <p class="text-lg md:text-xl text-charcoal-700 mb-8 max-w-2xl leading-relaxed">
            {{ content?.description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              :label="t('nav.portfolio')"
              class="!bg-gradient-primary !border-0 !text-white !px-8 !py-3 !text-lg !shadow-lg hover:!shadow-xl hover:!scale-105 !transition-all"
              raised
              @click="scrollToSection('portfolio')"
            />
            <Button
              :label="t('nav.contact')"
              class="!border-2 !border-sage-500 !text-sage-600 !px-8 !py-3 !text-lg hover:!bg-sage-50 !transition-all"
              outlined
              @click="scrollToSection('contact')"
            />
          </div>
        </div>

        <!-- Profile Image -->
        <div
          v-motion
          class="flex justify-center lg:justify-end order-1 lg:order-2"
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
        >
          <div class="relative">
            <!-- Decorative blurred circles -->
            <div
              class="absolute -top-4 -left-4 w-72 h-72 bg-mint-200 rounded-full blur-3xl opacity-40"
            />
            <div
              class="absolute -bottom-4 -right-4 w-72 h-72 bg-sage-200 rounded-full blur-3xl opacity-40"
            />

            <!-- Image container with gradient border -->
            <div class="relative p-1 bg-gradient-primary rounded-full shadow-2xl">
              <div class="bg-white p-2 rounded-full">
                <img
                  src="/images/profile.jpeg"
                  alt="Nicolas Hormesch"
                  class="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover"
                />
              </div>
            </div>

            <!-- Floating elements -->
            <div
              class="absolute -top-6 right-10 bg-white rounded-2xl shadow-xl p-4 animate-float z-10 border border-sage-100"
            >
              <Icon name="mdi:code-tags" class="text-3xl text-sage-600" />
            </div>
            <div
              class="absolute -bottom-6 left-10 bg-white rounded-2xl shadow-xl p-4 animate-float z-10 border border-mint-100"
              style="animation-delay: 0.5s"
            >
              <Icon name="mdi:laptop" class="text-3xl text-mint-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
