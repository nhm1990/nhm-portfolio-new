<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import type { TimelineEvent, ExperienceProject } from '~/types/experience'

interface Props {
  events: TimelineEvent[]
}

interface Emit {
  openProject: [project: ExperienceProject]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const timelineContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const scrollTimeline = (direction: 'left' | 'right') => {
  timelineContainer.value?.scrollBy({
    left: direction === 'right' ? 350 : -350,
    behavior: 'smooth',
  })
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') scrollTimeline('right')
  if (e.key === 'ArrowLeft') scrollTimeline('left')
}

const updateScrollButtons = () => {
  if (!timelineContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = timelineContainer.value
  canScrollLeft.value = scrollLeft > 10
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 10
}

useEventListener(window, 'keydown', handleKeydown)
useEventListener(timelineContainer, 'scroll', updateScrollButtons, { passive: true })

onMounted(() => nextTick(updateScrollButtons))
</script>

<template>
  <div class="relative">
    <!-- Left scroll button -->
    <Transition name="fade">
      <div v-show="canScrollLeft" class="absolute left-0 top-0 bottom-0 z-10 flex items-center">
        <div
          class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-sage-50 to-transparent pointer-events-none"
        />
        <button
          class="relative z-20 ml-1 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-sage-200 hover:bg-white hover:shadow-xl transition-all duration-200"
          @click="scrollTimeline('left')"
        >
          <Icon name="mdi:chevron-left" class="text-xl text-charcoal-700" />
        </button>
      </div>
    </Transition>

    <!-- Scrollable Timeline Container -->
    <div ref="timelineContainer" class="overflow-x-auto timeline-scroll-container px-6">
      <Timeline
        :value="props.events"
        layout="horizontal"
        align="bottom"
        class="horizontal-experience-timeline"
      >
        <template #opposite="slotProps">
          <ExperienceTimelineYear
            :year="slotProps.item.startYear"
            :date="slotProps.item.date"
            :industry="slotProps.item.industry"
          />
        </template>

        <template #marker="slotProps">
          <ExperienceTimelineMarker :event="slotProps.item" />
        </template>

        <template #content="slotProps">
          <ExperienceTimelineCard
            :event="slotProps.item"
            @click="emit('openProject', slotProps.item.projectData)"
          />
        </template>
      </Timeline>
    </div>

    <!-- Right scroll button -->
    <Transition name="fade">
      <div v-show="canScrollRight" class="absolute right-0 top-0 bottom-0 z-10 flex items-center">
        <div
          class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-sage-50 to-transparent pointer-events-none"
        />
        <button
          class="relative z-20 mr-1 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-sage-200 hover:bg-white hover:shadow-xl transition-all duration-200"
          @click="scrollTimeline('right')"
        >
          <Icon name="mdi:chevron-right" class="text-xl text-charcoal-700" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.horizontal-experience-timeline :deep(.p-timeline-event) {
  min-width: 300px;
}

/* Let the card control its own height; just align the wrapper */
.horizontal-experience-timeline :deep(.p-timeline-event-content) {
  display: flex;
  align-items: flex-start;
}

.horizontal-experience-timeline :deep(.p-timeline-event-opposite) {
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* Custom scrollbar */
.timeline-scroll-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(93, 122, 82, 0.3) transparent;
}

.timeline-scroll-container::-webkit-scrollbar {
  height: 6px;
}

.timeline-scroll-container::-webkit-scrollbar-track {
  background: transparent;
}

.timeline-scroll-container::-webkit-scrollbar-thumb {
  background: rgba(93, 122, 82, 0.3);
  border-radius: 3px;
}

.timeline-scroll-container::-webkit-scrollbar-thumb:hover {
  background: rgba(93, 122, 82, 0.5);
}

/* Scroll button fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
