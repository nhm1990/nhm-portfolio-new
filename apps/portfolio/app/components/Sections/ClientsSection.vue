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
  <section id="clients" class="relative py-20 bg-mint-50 bg-pattern-leaves overflow-hidden">
    <!-- Decorative blobs -->
    <div class="absolute top-10 right-20 w-64 h-64 bg-mint-200 rounded-full blur-3xl opacity-25" />
    <div
      class="absolute bottom-10 left-20 w-48 h-48 bg-mint-300 rounded-full blur-3xl opacity-20"
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
