<script setup lang="ts">
const { t } = useI18n({ useScope: 'global' })
const { data: content } = useSectionData('clients')

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="clients" class="relative py-20 bg-mint-100 overflow-hidden">
    <!-- Decorative blobs -->
    <div
      class="absolute top-10 right-10 w-96 h-96 bg-mint-200 rounded-full blur-3xl opacity-30 animate-float"
    />
    <div
      class="absolute bottom-10 left-10 w-80 h-80 bg-sage-200 rounded-full blur-3xl opacity-25 animate-float"
      style="animation-delay: 2s"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-mint-300 rounded-full blur-3xl opacity-15 animate-float"
      style="animation-delay: 1s"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section heading -->
      <ClientsSectionHeading :title="content?.title ?? ''" :subtitle="content?.subtitle ?? ''" />

      <!-- Logo grid -->
      <ClientsLogoGrid :clients="content?.list ?? []" />

      <!-- CTA banner -->
      <ClientsCtaBanner
        :cta="content?.cta ?? ''"
        :contact-label="t('nav.contact')"
        @on-scroll-to-contact="scrollToContact"
      />
    </div>
  </section>
</template>
