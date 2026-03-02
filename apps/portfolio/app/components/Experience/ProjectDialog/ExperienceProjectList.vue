<script setup lang="ts">
interface Props {
  title: string
  items: string[]
  titleIcon: string
  itemIcon: string
  itemIconClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  itemIconClass: 'text-moss-600',
})
</script>

<template>
  <div>
    <h4 class="text-sm font-semibold text-moss-700 mb-3 flex items-center gap-2">
      <Icon :name="props.titleIcon" class="text-moss-600" />
      {{ props.title }}
    </h4>
    <ul class="space-y-2">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="flex items-start gap-2 text-sm text-sage-700"
      >
        <Icon :name="props.itemIcon" :class="['mt-0.5 flex-shrink-0', props.itemIconClass]" />
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
