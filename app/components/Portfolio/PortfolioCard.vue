<script setup lang="ts">
import type { Project } from '~/models/portfolio'

const props = defineProps<{
  project: Project
  index: number
}>()

const isReversed = computed(() => props.index % 2 !== 0)
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
      :link="project.link"
    />
  </div>
</template>
