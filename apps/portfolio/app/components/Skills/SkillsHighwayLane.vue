<script setup lang="ts">
import type { Skill } from '~/models/skills'

const props = defineProps<{
  skills: Skill[]
  direction: 'left' | 'right'
  duration: number
}>()

// Duplicate skills for seamless infinite loop
const doubled = computed(() => [...props.skills, ...props.skills])
</script>

<template>
  <div class="relative h-12 overflow-hidden flex items-center">
    <!-- Lane surface shine -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"
    />

    <!-- Scrolling track -->
    <div
      class="flex gap-4 items-center"
      :class="direction === 'left' ? 'animate-lane-left' : 'animate-lane-right'"
      :style="{ animationDuration: `${duration}s` }"
    >
      <SkillBadge
        v-for="(skill, index) in doubled"
        :key="`${skill.name}-${index}`"
        :name="skill.name"
        :level="skill.level"
        :url="skill.url"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes lane-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@keyframes lane-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-lane-left {
  animation: lane-left linear infinite;
}
.animate-lane-right {
  animation: lane-right linear infinite;
}
</style>
