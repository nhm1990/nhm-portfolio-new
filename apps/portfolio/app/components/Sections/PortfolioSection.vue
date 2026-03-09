<script setup lang="ts">
import { ref, computed } from 'vue'

const { data: content } = await useSectionData('portfolio')
const config = useRuntimeConfig()

const currentIndex = ref(0)
const direction = ref<'none' | 'left' | 'right'>('none')

const projects = computed(() => content.value?.projects ?? [])
const currentProject = computed(() => projects.value[currentIndex.value])
const totalProjects = computed(() => projects.value.length)

const resolvedLink = computed(() => {
  const link = currentProject.value?.link
  if (link === '$ecoscope') {
    return config.public.ecoscopeUrl as string
  }
  return link
})

const goToPrev = () => {
  if (currentIndex.value > 0) {
    direction.value = 'left'
    currentIndex.value--
  }
}

const goToNext = () => {
  if (currentIndex.value < totalProjects.value - 1) {
    direction.value = 'right'
    currentIndex.value++
  }
}
</script>

<template>
  <section id="portfolio" class="relative min-h-screen bg-gradient-soft overflow-hidden">
    <!-- Background decoration -->
    <div
      class="absolute top-20 left-0 w-[28rem] h-[28rem] bg-sage-200 rounded-full blur-3xl opacity-30 animate-float"
    />
    <div
      class="absolute bottom-20 right-0 w-[28rem] h-[28rem] bg-mint-200 rounded-full blur-3xl opacity-25 animate-float"
      style="animation-delay: 1s"
    />
    <div
      class="absolute top-1/2 right-1/4 w-80 h-80 bg-sage-300 rounded-full blur-3xl opacity-20 animate-float"
      style="animation-delay: 2s"
    />
    <div
      class="absolute bottom-1/3 left-1/3 w-72 h-72 bg-mint-300 rounded-full blur-3xl opacity-15 animate-float"
      style="animation-delay: 3s"
    />

    <!-- 3D Scene — fixed viewport height so monitor size never changes with content -->
    <ClientOnly v-if="currentProject">
      <div class="absolute top-0 left-0 w-full h-screen pointer-events-none hidden lg:block">
        <PortfolioScene :image-src="currentProject.image" :direction="direction" />
      </div>
      <template #fallback>
        <div />
      </template>
    </ClientOnly>

    <!-- Content layer on top -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <PortfolioSectionHeader :title="content?.title ?? ''" :subtitle="content?.subtitle ?? ''" />

      <!-- Project Info — right-aligned -->
      <div v-if="currentProject" class="flex justify-end mt-12">
        <div class="w-full lg:w-1/2 lg:pl-8">
          <div
            class="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-sage-100/30"
          >
            <PortfolioProjectInfo
              :project="currentProject"
              :direction="direction"
              :link="resolvedLink"
            />
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <PortfolioNavigation
        :current-index="currentIndex"
        :total="totalProjects"
        @on-prev="goToPrev"
        @on-next="goToNext"
      />
    </div>
  </section>
</template>
