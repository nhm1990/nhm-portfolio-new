<script setup lang="ts">
const { data: content } = useSectionData('portfolio')
</script>

<template>
  <section id="portfolio" class="relative py-24 bg-gradient-soft overflow-hidden">
    <!-- Background decoration -->
    <div
      class="absolute top-40 left-0 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-20 animate-pulse"
    />
    <div
      class="absolute bottom-40 right-0 w-96 h-96 bg-mint-200 rounded-full blur-3xl opacity-20 animate-pulse"
      style="animation-delay: 1s"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PortfolioSectionHeader :title="content?.title ?? ''" :subtitle="content?.subtitle ?? ''" />

      <div class="space-y-32">
        <PortfolioCard
          v-for="(project, index) in content?.projects ?? []"
          :key="project.id"
          :project="project"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
