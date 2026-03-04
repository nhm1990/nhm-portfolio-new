<script setup lang="ts">
interface Props {
  currentIndex: number
  total: number
}

interface Emits {
  onPrev: []
  onNext: []
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handlePrev = () => {
  emit('onPrev')
}

const handleNext = () => {
  emit('onNext')
}
</script>

<template>
  <div class="flex items-center justify-center gap-6 mt-10">
    <!-- Previous button -->
    <button
      :disabled="currentIndex === 0"
      class="group relative p-3 rounded-full border-2 border-sage-300 bg-white/80 backdrop-blur-sm hover:border-sage-500 hover:bg-sage-50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-sage-300 disabled:hover:bg-white/80"
      aria-label="Previous project"
      @click="handlePrev"
    >
      <svg
        class="w-5 h-5 text-charcoal-700 group-hover:text-sage-700 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Dots indicator -->
    <div class="flex items-center gap-2">
      <button
        v-for="i in total"
        :key="i"
        class="w-2.5 h-2.5 rounded-full transition-all duration-300"
        :class="
          i - 1 === currentIndex
            ? 'bg-sage-500 scale-125 shadow-md shadow-sage-300'
            : 'bg-sage-200 hover:bg-sage-300'
        "
        :aria-label="`Go to project ${i}`"
        @click="
          () => {
            /* could emit a 'goTo' event here */
          }
        "
      />
    </div>

    <!-- Next button -->
    <button
      :disabled="currentIndex === total - 1"
      class="group relative p-3 rounded-full border-2 border-sage-300 bg-white/80 backdrop-blur-sm hover:border-sage-500 hover:bg-sage-50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-sage-300 disabled:hover:bg-white/80"
      aria-label="Next project"
      @click="handleNext"
    >
      <svg
        class="w-5 h-5 text-charcoal-700 group-hover:text-sage-700 transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>
