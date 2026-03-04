<script setup lang="ts">
const { data: content } = useSectionData('contact')
</script>

<template>
  <section id="contact" class="relative py-20 bg-white overflow-hidden">
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-mint-200 rounded-full blur-3xl opacity-25 animate-float"
    />
    <div
      class="absolute bottom-0 left-0 w-80 h-80 bg-sage-200 rounded-full blur-3xl opacity-30 animate-float"
      style="animation-delay: 1.5s"
    />
    <div
      class="absolute top-1/3 left-1/4 w-64 h-64 bg-sage-100 rounded-full blur-3xl opacity-35 animate-float"
      style="animation-delay: 3s"
    />

    <div class="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Heading -->
      <ContactSectionHeading :title="content?.title ?? ''" :subtitle="content?.subtitle ?? ''" />

      <!-- Form card -->
      <div class="bg-white rounded-2xl shadow-xl border border-sage-100 p-8 md:p-12">
        <ContactForm />
      </div>
    </div>
  </section>
</template>
