<script setup lang="ts">
import { useIndustryColor } from '~/composables/useIndustryColor'

interface Props {
  year: string
  date: string
  industry: string
}

const props = defineProps<Props>()

const { getIndustryColor } = useIndustryColor()
</script>

<template>
  <div class="text-center whitespace-nowrap pb-2">
    <span
      class="inline-block text-5xl font-black leading-none"
      :style="{ color: getIndustryColor(props.industry) }"
    >
      {{ props.year }}
    </span>
    <div class="text-[11px] text-charcoal-500 mt-1 font-medium">
      {{ props.date }}
    </div>
  </div>
</template>
