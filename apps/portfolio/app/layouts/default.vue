<script setup lang="ts">
useScrollSpy(['home', 'portfolio', 'skills', 'experience', 'clients', 'contact'])
</script>

<template>
  <div class="min-h-screen bg-[#FFFFF8]">
    <Navbar />
    <slot />
  </div>
</template>
