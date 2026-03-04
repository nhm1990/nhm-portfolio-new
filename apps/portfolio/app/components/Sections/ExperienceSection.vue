<script setup lang="ts">
import type { TimelineEvent, ExperienceProject } from '~/types/experience'

const { data: rawData } = await useAsyncData('experience', () =>
  queryCollection('content_en').path('/experience').first()
)

const experienceData = computed(() => rawData.value?.meta || null)

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
  <section id="experience" class="relative py-20 bg-white bg-pattern-dots overflow-hidden">
    <div
      class="absolute top-10 left-10 w-64 h-64 bg-mint-100 rounded-full blur-3xl opacity-40 animate-float"
    />
    <div
      class="absolute bottom-20 right-20 w-72 h-72 bg-mint-200 rounded-full blur-3xl opacity-30 animate-float"
      style="animation-delay: 2s"
    />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          Professional Experience
        </h2>
        <p class="text-xl text-sage-600">Recent Projects & Achievements</p>
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
