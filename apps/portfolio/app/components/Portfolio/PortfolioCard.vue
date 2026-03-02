<script setup lang="ts">
import type { Project } from '~/models/portfolio'

const props = defineProps<{
  project: Project
  index: number
}>()

const config = useRuntimeConfig()
const isReversed = computed(() => props.index % 2 !== 0)

// Resolve special link markers to their runtime URLs
const resolvedLink = computed(() => {
  if (props.project.link === '$ecoscope') {
    return config.public.ecoscopeUrl as string
  }
  return props.project.link
})
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
    <PortfolioCardImage
      :image="project.image"
      :title="project.title"
      :client="project.client"
      :category="project.category"
      :is-reversed="isReversed"
    />
    <PortfolioCardContent
      :client="project.client"
      :title="project.title"
      :category="project.category"
      :description="project.description"
      :highlights="project.highlights"
      :technologies="project.technologies"
      :is-reversed="isReversed"
      :link="resolvedLink"
    />
  </div>
</template>
