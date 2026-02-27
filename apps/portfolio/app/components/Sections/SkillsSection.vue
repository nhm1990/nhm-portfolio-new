<script setup lang="ts">
import { Motion } from 'motion-v'
import type { Skill, SkillsContent } from '~/models/skills'

const { data: rawData } = await useAsyncData('skills', () =>
  queryCollection('content_en').path('/skills').first()
)

const skillsData = computed(() => rawData.value?.meta as unknown as SkillsContent | null)

const allSkills = computed<Skill[]>(() => {
  if (!skillsData.value?.categories) return []
  return skillsData.value.categories.flatMap((cat) => cat.skills)
})

// ── Lane distribution ──────────────────────────────────────
// Rightbound fast  (→): expert skills
// Rightbound slow  (→): first half of advanced
// Leftbound  slow  (←): second half of advanced
// Leftbound  fast  (←): intermediate skills
const laneAFast = computed(() => allSkills.value.filter((s) => s.level === 'expert'))
const advancedSkills = computed(() => allSkills.value.filter((s) => s.level === 'advanced'))
const laneASlow = computed(() =>
  advancedSkills.value.slice(0, Math.ceil(advancedSkills.value.length / 2))
)
const laneBSlow = computed(() =>
  advancedSkills.value.slice(Math.ceil(advancedSkills.value.length / 2))
)
const laneBFast = computed(() => allSkills.value.filter((s) => s.level === 'intermediate'))
</script>

<template>
  <section id="skills" class="relative py-24 bg-sage-50 overflow-hidden">
    <!-- Background blur accents -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-sage-300 rounded-full blur-3xl opacity-20" />
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-mint-300 rounded-full blur-3xl opacity-20" />

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <Motion
        tag="div"
        class="text-center mb-16"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.7, ease: 'easeOut' }"
        :viewport="{ once: true }"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          Skills & Expertise
        </h2>
        <p class="text-xl text-charcoal-600">Technologies & Tools I Work With</p>
      </Motion>

      <!-- Highway -->
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 40 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }"
        :viewport="{ once: true }"
      >
        <SkillsHighway
          :lane-a-fast="laneAFast"
          :lane-a-slow="laneASlow"
          :lane-b-slow="laneBSlow"
          :lane-b-fast="laneBFast"
        />
      </Motion>

      <!-- Fast Lane Quote -->
      <SkillsFastLaneQuote />
    </div>
  </section>
</template>
