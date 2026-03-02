<script setup lang="ts">
import type { Client } from '~/models/portfolio'

interface Props {
  clients: Client[]
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-wrap justify-center gap-6 mb-16">
    <ClientsLogoCard
      v-for="(client, index) in clients"
      :key="client.name"
      :client="client"
      :index="index"
    />
  </div>
</template>
