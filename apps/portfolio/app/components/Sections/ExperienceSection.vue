<script setup lang="ts">
import { useContentData } from '~/composables/useSectionData'
import type { TimelineEvent, ExperienceProject } from '~/types/experience'

const { data: rawData } = await useContentData('/experience')

const experienceData = computed(() => rawData.value?.meta || null)
const experienceTitle = computed(() => rawData.value?.title ?? 'Professional Experience')
const experienceSubtitle = computed(
  () => (rawData.value?.meta as any)?.subtitle ?? 'Recent Projects & Achievements'
)

const selectedProject = ref<ExperienceProject | null>(null)
const dialogVisible = ref(false)

const openProjectDetails = (project: ExperienceProject) => {
  selectedProject.value = project
  dialogVisible.value = true
}

const parseEndDate = (period: string): Date => {
  if (period.includes('Present')) return new Date(9999, 11)
  const matches = [...period.matchAll(/(\d{2})\/(\d{4})/g)]
  const last = matches.at(-1)
  if (last?.[1] && last?.[2]) return new Date(parseInt(last[2]), parseInt(last[1]) - 1)
  return new Date()
}

const sortByEndDateDesc = (a: any, b: any): number =>
  parseEndDate(b.period).getTime() - parseEndDate(a.period).getTime()

const timelineEvents = computed<TimelineEvent[]>(() => {
  const data = experienceData.value as any
  if (!data?.projects) return []

  return [...data.projects].sort(sortByEndDateDesc).map(
    (project: any): TimelineEvent => ({
      status: project.period.includes('Present') ? 'active' : 'completed',
      date: project.period,
      company: project.company,
      role: project.role,
      industry: project.industry,
      description: project.shortDescription,
      technologies: project.technologies,
      projectData: project,
      startYear: project.period.match(/\d{4}/)?.[0] || '',
    })
  )
})
</script>

<template>
  <section id="experience" class="relative py-20 bg-white overflow-hidden">
    <div
      class="absolute top-10 left-10 w-80 h-80 bg-mint-200 rounded-full blur-3xl opacity-35 animate-float"
    />
    <div
      class="absolute bottom-20 right-10 w-96 h-96 bg-sage-200 rounded-full blur-3xl opacity-25 animate-float"
      style="animation-delay: 2s"
    />
    <div
      class="absolute top-1/2 right-1/3 w-64 h-64 bg-mint-300 rounded-full blur-3xl opacity-20 animate-float"
      style="animation-delay: 1s"
    />
    <div
      class="absolute bottom-1/3 left-1/4 w-72 h-72 bg-sage-300 rounded-full blur-3xl opacity-15 animate-float"
      style="animation-delay: 3s"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-text bg-clip-text text-transparent"
        >
          {{ experienceTitle }}
        </h2>
        <p class="text-xl text-sage-600">{{ experienceSubtitle }}</p>
      </div>

      <div
        v-if="experienceData"
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <ExperienceTimeline :events="timelineEvents" @open-project="openProjectDetails" />
      </div>

      <ExperienceProjectDialog v-model:visible="dialogVisible" :project="selectedProject" />
    </div>
  </section>
</template>
