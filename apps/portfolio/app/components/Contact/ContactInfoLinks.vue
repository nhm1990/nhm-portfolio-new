<script setup lang="ts">
interface Props {
  email?: string
  linkedin?: string
  github?: string
}

defineProps<Props>()
</script>

<template>
  <div class="mt-12 pt-12 border-t border-sage-100">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <a
        :href="email ? `mailto:${email}` : '#'"
        class="flex flex-col items-center group hover:scale-105 transition-transform"
      >
        <div
          class="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:shadow-mint-500/30 transition-shadow"
        >
          <Icon name="mdi:email" class="text-white text-2xl" />
        </div>
        <p class="text-sm text-sage-500">Email</p>
        <p class="font-semibold text-charcoal-900 group-hover:text-mint-600 transition-colors">
          {{ email }}
        </p>
      </a>

      <a
        :href="linkedin ?? '#'"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center group hover:scale-105 transition-transform"
      >
        <div
          class="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:shadow-mint-500/30 transition-shadow p-2"
        >
          <NuxtImg
            src="/images/linkedin.webp"
            alt="LinkedIn"
            class="w-full h-full object-contain"
          />
        </div>
        <p class="text-sm text-sage-500">LinkedIn</p>
        <p class="font-semibold text-charcoal-900 group-hover:text-mint-600 transition-colors">
          Nicolas Hormesch
        </p>
      </a>

      <a
        :href="github ?? '#'"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col items-center group hover:scale-105 transition-transform"
      >
        <div
          class="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-3 group-hover:shadow-lg group-hover:shadow-mint-500/30 transition-shadow p-2"
        >
          <NuxtImg src="/images/github.webp" alt="GitHub" class="w-full h-full object-contain" />
        </div>
        <p class="text-sm text-sage-500">GitHub</p>
        <p class="font-semibold text-charcoal-900 group-hover:text-mint-600 transition-colors">
          nhm1990
        </p>
      </a>
    </div>
  </div>
</template>
