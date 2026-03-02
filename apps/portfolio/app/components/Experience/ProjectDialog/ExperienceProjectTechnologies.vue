<script setup lang="ts">
interface Props {
  technologies: string[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="mb-6">
    <h4 class="text-sm font-semibold text-moss-700 mb-3 flex items-center gap-2">
      <Icon name="mdi:code-tags" class="text-moss-600" />
      Technologies
    </h4>
    <div class="flex flex-wrap gap-2">
      <Chip
        v-for="tech in props.technologies"
        :key="tech"
        :label="tech"
        class="!bg-gradient-to-r from-moss-600 to-mint-400 !text-white"
      />
    </div>
  </div>
</template>
