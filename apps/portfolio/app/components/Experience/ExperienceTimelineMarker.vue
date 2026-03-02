<script setup lang="ts">
import type { TimelineEvent } from '~/types/experience'
import { useIndustryColor } from '~/composables/useIndustryColor'

interface Props {
  event: TimelineEvent
}

const props = defineProps<Props>()

const { getIndustryColor } = useIndustryColor()
</script>

<template>
  <span
    class="flex w-10 h-10 items-center justify-center text-white rounded-full z-10 shadow-lg transition-transform duration-200 hover:scale-110"
    :style="{ backgroundColor: getIndustryColor(props.event.industry) }"
    :class="{
      'ring-3 ring-moss-300 ring-offset-2': props.event.status === 'active',
    }"
  >
    <Icon
      :name="props.event.status === 'active' ? 'mdi:briefcase' : 'mdi:check-circle'"
      class="text-lg"
    />
  </span>
</template>
