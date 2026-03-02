<script setup lang="ts">
import type { TimelineEvent } from '~/types/experience'
import { useIndustryColor } from '~/composables/useIndustryColor'

interface Props {
  event: TimelineEvent
}

interface Emit {
  click: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const { getIndustryColor } = useIndustryColor()

const handleClick = () => emit('click')
</script>

<template>
  <div
    class="w-72 mt-4 p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-sage-100 hover:border-sage-300 hover:-translate-y-1 group flex flex-col overflow-hidden"
    style="height: 220px"
    @click="handleClick"
  >
    <!-- Company + Industry badge -->
    <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="text-base font-bold text-charcoal-900 leading-tight">
        {{ props.event.company }}
      </h3>
      <span
        class="shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full text-white whitespace-nowrap"
        :style="{ backgroundColor: getIndustryColor(props.event.industry) }"
      >
        {{ props.event.industry }}
      </span>
    </div>

    <!-- Role -->
    <p class="text-xs font-semibold text-sage-600 mb-2">
      {{ props.event.role }}
    </p>

    <!-- Description -->
    <p class="text-xs text-charcoal-700 mb-3 line-clamp-3 flex-1">
      {{ props.event.description }}
    </p>

    <!-- Technologies -->
    <div class="flex flex-wrap gap-1 mb-3">
      <span
        v-for="tech in props.event.technologies?.slice(0, 4)"
        :key="tech"
        class="px-2 py-0.5 text-[10px] bg-sage-100 text-sage-700 rounded-full border border-sage-200"
      >
        {{ tech }}
      </span>
      <span
        v-if="props.event.technologies?.length > 4"
        class="px-2 py-0.5 text-[10px] text-sage-500 font-medium"
      >
        +{{ props.event.technologies.length - 4 }}
      </span>
    </div>

    <!-- View Details -->
    <div
      class="flex items-center gap-1 text-xs text-sage-600 font-medium group-hover:text-moss-600 transition-colors mt-auto"
    >
      <Icon name="mdi:arrow-right" class="text-sm transition-transform group-hover:translate-x-1" />
      View Details
    </div>
  </div>
</template>
