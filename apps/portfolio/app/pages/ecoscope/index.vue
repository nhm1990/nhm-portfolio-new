<script setup lang="ts">
definePageMeta({ layout: 'ecoscope' })

useHead({
  title: 'EcoScope — Environmental Data Intelligence',
  meta: [
    {
      name: 'description',
      content:
        'Interactive environmental monitoring platform. Track air quality, analyze trends, and explore data from 25+ global cities.',
    },
  ],
})
</script>

<template>
  <div>
    <EcoScopeHero />
    <EcoScopeStats />
    <EcoScopeCharts />
    <EcoScopeFeatures />
  </div>
</template>
