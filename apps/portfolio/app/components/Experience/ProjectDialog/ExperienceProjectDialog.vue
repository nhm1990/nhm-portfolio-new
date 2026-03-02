<script setup lang="ts">
import type { ExperienceProject } from '~/types/experience'

interface Props {
  project: ExperienceProject | null
}

const props = defineProps<Props>()
const visible = defineModel<boolean>('visible', { default: false })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="props.project?.company"
    :modal="true"
    :dismissable-mask="true"
    :style="{ width: '90vw', maxWidth: '800px' }"
    class="project-dialog"
  >
    <div v-if="props.project">
      <ExperienceProjectHeader :project="props.project" />

      <Divider />

      <div class="mb-6">
        <p class="text-sage-700">{{ props.project.shortDescription }}</p>
      </div>

      <ExperienceProjectTechnologies :technologies="props.project.technologies" />

      <Divider />

      <div class="mb-6">
        <ExperienceProjectList
          title="Key Responsibilities"
          title-icon="mdi:checkbox-marked-circle"
          :items="props.project.responsibilities"
          item-icon="mdi:chevron-right"
        />
      </div>

      <ExperienceProjectList
        title="Key Achievements"
        title-icon="mdi:trophy"
        :items="props.project.achievements"
        item-icon="mdi:star"
        item-icon-class="text-mint-400"
      />
    </div>

    <template #footer>
      <Button
        label="Close"
        icon="mdi:close"
        class="!bg-gradient-to-r from-moss-600 to-mint-400 !border-0 !text-white"
        @click="visible = false"
      />
    </template>
  </Dialog>
</template>
