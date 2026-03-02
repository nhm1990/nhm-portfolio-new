<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<template>
  <div
    v-motion
    class="text-center mb-16"
    :initial="{ opacity: 0, y: 30 }"
    :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
  >
    <h2 class="text-4xl md:text-5xl font-bold mb-4 pb-2 bg-gradient-text bg-clip-text text-transparent">
      {{ title }}
    </h2>
    <p class="text-xl text-sage-600">{{ subtitle }}</p>
  </div>
</template>
