<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'

interface Props {
  project: ExperienceProject
}

const props = defineProps<Props>()
</script>

<template>
  <div class="mb-6">
    <div class="flex items-center gap-2 mb-2">
      <Icon name="mdi:account-tie" class="text-moss-600" />
      <h3 class="text-lg font-semibold text-moss-800">{{ props.project.role }}</h3>
    </div>
    <div class="flex items-center gap-4 text-sm text-sage-600">
      <span class="flex items-center gap-1">
        <Icon name="mdi:domain" />
        {{ props.project.industry }}
      </span>
      <span class="flex items-center gap-1">
        <Icon name="mdi:calendar" />
        {{ props.project.period }}
      </span>
    </div>
  </div>
</template>
