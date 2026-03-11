<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Keyboard, FreeMode } from 'swiper/modules'
import type { TimelineEvent, ExperienceProject } from '~/types/experience'

interface Props {
  events: TimelineEvent[]
}

interface Emit {
  openProject: [project: ExperienceProject]
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const modules = [Navigation, Keyboard, FreeMode]

// centeredSlides evaluated client-side by Swiper itself — no SSR mismatch
const swiperBreakpoints = {
  0: { centeredSlides: true },
  768: { centeredSlides: false },
}
</script>

<template>
  <!-- outer div: no overflow constraint so nav buttons can't be clipped -->
  <div class="relative">
    <!-- inner div: clips the swiper content so slides don't bleed outside the section -->
    <div class="overflow-hidden">
      <Swiper
        :modules="modules"
        direction="horizontal"
        slides-per-view="auto"
        :centered-slides="false"
        :breakpoints="swiperBreakpoints"
        :space-between="0"
        :navigation="{
          prevEl: '.exp-btn-prev',
          nextEl: '.exp-btn-next',
        }"
        :keyboard="{ enabled: true }"
        :grab-cursor="true"
        :free-mode="{ enabled: true, sticky: false }"
        class="experience-swiper py-4"
      >
        <SwiperSlide
          v-for="event in props.events"
          :key="event.company + event.date"
          class="!w-[300px] flex justify-center"
        >
          <div class="flex flex-col items-center w-[300px] px-3">
            <!-- Year / Date block — fixed height so horizontal line aligns -->
            <div class="h-24 flex flex-col items-center justify-end pb-2 w-full">
              <ExperienceTimelineYear
                :year="event.startYear"
                :date="event.date"
                :industry="event.industry"
              />
            </div>

            <!-- Connector top -->
            <div class="w-0.5 h-8 bg-sage-300 relative z-10" />

            <!-- Marker -->
            <div class="relative z-10">
              <ExperienceTimelineMarker :event="event" />
            </div>

            <!-- Connector bottom -->
            <div class="w-0.5 h-8 bg-sage-300 relative z-10" />

            <!-- Card -->
            <ExperienceTimelineCard
              :event="event"
              @click="emit('openProject', event.projectData)"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Nav buttons sit outside the overflow:hidden div so they're never clipped -->
    <button
      class="exp-btn-prev absolute left-1 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-sage-200 hover:bg-white hover:shadow-xl transition-all duration-200"
      aria-label="Previous experience"
    >
      <Icon name="mdi:chevron-left" class="text-xl text-charcoal-700" />
    </button>

    <button
      class="exp-btn-next absolute right-1 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-sage-200 hover:bg-white hover:shadow-xl transition-all duration-200"
      aria-label="Next experience"
    >
      <Icon name="mdi:chevron-right" class="text-xl text-charcoal-700" />
    </button>
  </div>
</template>

<style scoped>
/* Disabled state for nav buttons */
.exp-btn-prev.swiper-button-disabled,
.exp-btn-next.swiper-button-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
