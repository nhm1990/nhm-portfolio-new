<script setup lang="ts">
import type { Skill } from '~/models/skills'

defineProps<{
  laneAFast: Skill[]
  laneASlow: Skill[]
  laneBSlow: Skill[]
  laneBFast: Skill[]
}>()
</script>

<template>
  <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-charcoal-800">
    <!-- Asphalt background -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-charcoal-950 via-charcoal-900 to-charcoal-950"
    />

    <!-- ═══ GUARD RAIL TOP ═══ -->
    <div
      class="relative h-3 bg-gradient-to-r from-sage-700 via-sage-500 to-sage-700 border-b border-sage-400/40"
    />

    <!-- Direction label: right -->
    <div class="relative flex items-center gap-2 px-6 py-1 bg-charcoal-950/60">
      <div class="flex gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-mint-400" />
        <span class="w-1.5 h-1.5 rounded-full bg-mint-400/60" />
        <span class="w-1.5 h-1.5 rounded-full bg-mint-400/30" />
      </div>
      <span class="text-[10px] font-bold tracking-widest text-mint-400/70 uppercase"
        >Rightbound</span
      >
    </div>

    <!-- LANE A1 → slow (outer / right lane) -->
    <div class="relative px-0 py-2 bg-charcoal-900/60">
      <SkillsHighwayLane :skills="laneASlow" direction="left" :duration="28" />
    </div>

    <!-- Dashed lane separator -->
    <div class="relative h-px mx-6">
      <div class="h-full border-t border-dashed border-charcoal-600/60" />
    </div>

    <!-- LANE A2 → fast (inner / overtaking lane, adjacent to center) -->
    <div class="relative px-0 py-2 bg-charcoal-900/80">
      <SkillsHighwayLane :skills="laneAFast" direction="left" :duration="18" />
    </div>

    <!-- ═══ CENTER DIVIDER ═══ -->
    <div class="relative h-5 bg-charcoal-950 flex items-center justify-center gap-2 px-8">
      <div class="flex-1 h-px bg-yellow-400/80" />
      <div class="flex-1 h-px bg-yellow-400/80" />
    </div>

    <!-- Direction label: left -->
    <div class="relative flex items-center gap-2 px-6 py-1 bg-charcoal-950/60 justify-end">
      <span class="text-[10px] font-bold tracking-widest text-sage-400/70 uppercase"
        >Leftbound</span
      >
      <div class="flex gap-1">
        <span class="w-1.5 h-1.5 rounded-full bg-sage-400/30" />
        <span class="w-1.5 h-1.5 rounded-full bg-sage-400/60" />
        <span class="w-1.5 h-1.5 rounded-full bg-sage-400" />
      </div>
    </div>

    <!-- LANE B1 ← fast (inner / overtaking lane, adjacent to center) -->
    <div class="relative px-0 py-2 bg-charcoal-900/80">
      <SkillsHighwayLane :skills="laneBFast" direction="right" :duration="20" />
    </div>

    <!-- Dashed lane separator -->
    <div class="relative h-px mx-6">
      <div class="h-full border-t border-dashed border-charcoal-600/60" />
    </div>

    <!-- LANE B2 ← slow (outer / right lane) -->
    <div class="relative px-0 py-2 bg-charcoal-900/60">
      <SkillsHighwayLane :skills="laneBSlow" direction="right" :duration="30" />
    </div>

    <!-- ═══ GUARD RAIL BOTTOM ═══ -->
    <div
      class="relative h-3 bg-gradient-to-r from-sage-700 via-sage-500 to-sage-700 border-t border-sage-400/40"
    />

    <!-- Fade edges left -->
    <div
      class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-charcoal-950 to-transparent pointer-events-none z-10"
    />
    <!-- Fade edges right -->
    <div
      class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-charcoal-950 to-transparent pointer-events-none z-10"
    />
  </div>
</template>
