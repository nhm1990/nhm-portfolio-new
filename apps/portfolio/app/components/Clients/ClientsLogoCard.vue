<script setup lang="ts">
import type { Client } from '~/models/portfolio'

interface Props {
  client: Client
  index: number
}

const props = defineProps<Props>()
</script>

<template>
  <component
    :is="props.client.url ? 'a' : 'div'"
    :href="props.client.url ?? undefined"
    :target="props.client.url ? '_blank' : undefined"
    :rel="props.client.url ? 'noopener noreferrer' : undefined"
    :style="{ transitionDelay: `${props.index * 100}ms` }"
    class="flex items-center justify-center p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-sage-100 w-40 h-36"
  >
    <div class="w-full h-full flex items-center justify-center">
      <NuxtImg
        :src="props.client.logo"
        :alt="props.client.name"
        width="160"
        loading="lazy"
        format="webp"
        class="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  </component>
</template>
