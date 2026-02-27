<script setup lang="ts">
const { data: rawData } = await useAsyncData('experience', () =>
  queryCollection('content_en').path('/experience').first()
)

const experienceData = computed(() => rawData.value?.meta || null)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedProject = ref<any | null>(null)
const dialogVisible = ref(false)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openProjectDetails = (project: any) => {
  selectedProject.value = project
  dialogVisible.value = true
}

const parseStartDate = (period: string): Date => {
  const match = period.match(/(\d{2})\/(\d{4})/)
  const month = match?.[1]
  const year = match?.[2]
  if (month && year) {
    return new Date(parseInt(year), parseInt(month) - 1)
  }
  return new Date()
}

const timelineEvents = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = experienceData.value as any
  if (!data?.projects) return []

  return (
    [...data.projects]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .sort(
        (a: any, b: any) => parseStartDate(a.period).getTime() - parseStartDate(b.period).getTime()
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((project: any) => ({
        status: project.period.includes('Present') ? 'active' : 'completed',
        date: project.period,
        company: project.company,
        role: project.role,
        industry: project.industry,
        description: project.shortDescription,
        technologies: project.technologies,
        projectData: project,
        startYear: project.period.match(/\d{4}/)?.[0] || '',
      }))
  )
})

const getIndustryColor = (industry: string) => {
  const colors: Record<string, string> = {
    Chemical: '#5d7a52', // moss-500
    Finance: '#3bb06a', // mint-500
    Insurance: '#7aa87a', // sage-400
    'IT Consulting': '#2C2D32', // charcoal-900
  }
  return colors[industry] || '#5a8a5a'
}

// Horizontal scroll controls
const timelineContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)

const scrollTimeline = (direction: 'left' | 'right') => {
  if (timelineContainer.value) {
    timelineContainer.value.scrollBy({
      left: direction === 'right' ? 350 : -350,
      behavior: 'smooth',
    })
  }
}

const updateScrollButtons = () => {
  if (timelineContainer.value) {
    const { scrollLeft, scrollWidth, clientWidth } = timelineContainer.value
    canScrollLeft.value = scrollLeft > 10
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 10
  }
}

onMounted(() => {
  nextTick(() => {
    if (timelineContainer.value) {
      timelineContainer.value.addEventListener('scroll', updateScrollButtons, { passive: true })
      updateScrollButtons()
    }
  })
})

onUnmounted(() => {
  if (timelineContainer.value) {
    timelineContainer.value.removeEventListener('scroll', updateScrollButtons)
  }
})
</script>

<template>
  <section id="experience" class="relative py-20 bg-sage-50 bg-pattern-binary overflow-hidden">
    <!-- Binary Background Elements -->
    <div
      class="absolute top-10 left-10 w-64 h-64 bg-moss-200 rounded-full blur-3xl opacity-20 animate-float"
    />
    <div
      class="absolute bottom-20 right-20 w-72 h-72 bg-sage-300 rounded-full blur-3xl opacity-25 animate-float"
      style="animation-delay: 2s"
    />

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2
          class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-text bg-clip-text text-transparent"
        >
          Professional Experience
        </h2>
        <p class="text-xl text-charcoal-700">Recent Projects & Achievements</p>
      </div>

      <!-- Horizontal Timeline -->
      <div
        v-if="experienceData"
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
        class="relative"
      >
        <!-- Left scroll fade + button -->
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
            :value="timelineEvents"
            layout="horizontal"
            align="bottom"
            class="horizontal-experience-timeline"
          >
            <template #opposite="slotProps">
              <div class="text-center whitespace-nowrap pb-2">
                <span
                  class="inline-block px-3 py-1 text-xs font-bold rounded-full text-white"
                  :style="{ backgroundColor: getIndustryColor(slotProps.item.industry) }"
                >
                  {{ slotProps.item.startYear }}
                </span>
                <div class="text-[11px] text-charcoal-500 mt-1 font-medium">
                  {{ slotProps.item.date }}
                </div>
              </div>
            </template>

            <template #marker="slotProps">
              <span
                class="flex w-10 h-10 items-center justify-center text-white rounded-full z-10 shadow-lg transition-transform duration-200 hover:scale-110"
                :style="{ backgroundColor: getIndustryColor(slotProps.item.industry) }"
                :class="{
                  'ring-3 ring-moss-300 ring-offset-2': slotProps.item.status === 'active',
                }"
              >
                <Icon
                  :name="slotProps.item.status === 'active' ? 'mdi:briefcase' : 'mdi:check-circle'"
                  class="text-lg"
                />
              </span>
            </template>

            <template #content="slotProps">
              <div
                class="w-72 mt-4 p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-sage-100 hover:border-sage-300 hover:-translate-y-1 group"
                @click="openProjectDetails(slotProps.item.projectData)"
              >
                <!-- Company + Industry -->
                <div class="flex items-start justify-between gap-2 mb-2">
                  <h3 class="text-base font-bold text-charcoal-900 leading-tight">
                    {{ slotProps.item.company }}
                  </h3>
                  <span
                    class="shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-full text-white whitespace-nowrap"
                    :style="{ backgroundColor: getIndustryColor(slotProps.item.industry) }"
                  >
                    {{ slotProps.item.industry }}
                  </span>
                </div>

                <!-- Role -->
                <p class="text-xs font-semibold text-sage-600 mb-2">
                  {{ slotProps.item.role }}
                </p>

                <!-- Description -->
                <p class="text-xs text-charcoal-700 mb-3 line-clamp-2">
                  {{ slotProps.item.description }}
                </p>

                <!-- Technologies -->
                <div class="flex flex-wrap gap-1 mb-3">
                  <span
                    v-for="tech in slotProps.item.technologies?.slice(0, 4)"
                    :key="tech"
                    class="px-2 py-0.5 text-[10px] bg-sage-100 text-sage-700 rounded-full border border-sage-200"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="slotProps.item.technologies?.length > 4"
                    class="px-2 py-0.5 text-[10px] text-sage-500 font-medium"
                  >
                    +{{ slotProps.item.technologies.length - 4 }}
                  </span>
                </div>

                <!-- View Details -->
                <div
                  class="flex items-center gap-1 text-xs text-sage-600 font-medium group-hover:text-moss-600 transition-colors"
                >
                  <Icon
                    name="mdi:arrow-right"
                    class="text-sm transition-transform group-hover:translate-x-1"
                  />
                  View Details
                </div>
              </div>
            </template>
          </Timeline>
        </div>

        <!-- Right scroll fade + button -->
        <Transition name="fade">
          <div
            v-show="canScrollRight"
            class="absolute right-0 top-0 bottom-0 z-10 flex items-center"
          >
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

      <!-- Project Details Dialog -->
      <Dialog
        v-model:visible="dialogVisible"
        :header="selectedProject?.company"
        :modal="true"
        :dismissable-mask="true"
        :style="{ width: '90vw', maxWidth: '800px' }"
        class="project-dialog"
      >
        <div v-if="selectedProject">
          <!-- Role & Industry -->
          <div class="mb-6">
            <div class="flex items-center gap-2 mb-2">
              <Icon name="mdi:account-tie" class="text-[#7A453F]" />
              <h3 class="text-lg font-semibold text-[#2C2D32]">{{ selectedProject.role }}</h3>
            </div>
            <div class="flex items-center gap-4 text-sm text-[#2C2D32]/70">
              <span class="flex items-center gap-1">
                <Icon name="mdi:domain" />
                {{ selectedProject.industry }}
              </span>
              <span class="flex items-center gap-1">
                <Icon name="mdi:calendar" />
                {{ selectedProject.period }}
              </span>
            </div>
          </div>

          <Divider />

          <!-- Description -->
          <div class="mb-6">
            <p class="text-[#2C2D32]/90">{{ selectedProject.shortDescription }}</p>
          </div>

          <!-- Technologies -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-[#2C2D32] mb-3 flex items-center gap-2">
              <Icon name="mdi:code-tags" class="text-[#7A453F]" />
              Technologies
            </h4>
            <div class="flex flex-wrap gap-2">
              <Chip
                v-for="tech in selectedProject.technologies"
                :key="tech"
                :label="tech"
                class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !text-white"
              />
            </div>
          </div>

          <Divider />

          <!-- Responsibilities -->
          <div class="mb-6">
            <h4 class="text-sm font-semibold text-[#2C2D32] mb-3 flex items-center gap-2">
              <Icon name="mdi:checkbox-marked-circle" class="text-[#7A453F]" />
              Key Responsibilities
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(responsibility, index) in selectedProject.responsibilities"
                :key="index"
                class="flex items-start gap-2 text-sm text-[#2C2D32]/80"
              >
                <Icon name="mdi:chevron-right" class="text-[#7A453F] mt-0.5 flex-shrink-0" />
                <span>{{ responsibility }}</span>
              </li>
            </ul>
          </div>

          <!-- Achievements -->
          <div>
            <h4 class="text-sm font-semibold text-[#2C2D32] mb-3 flex items-center gap-2">
              <Icon name="mdi:trophy" class="text-[#7A453F]" />
              Key Achievements
            </h4>
            <ul class="space-y-2">
              <li
                v-for="(achievement, index) in selectedProject.achievements"
                :key="index"
                class="flex items-start gap-2 text-sm text-[#2C2D32]/80"
              >
                <Icon name="mdi:star" class="text-[#B9D1E9] mt-0.5 flex-shrink-0" />
                <span>{{ achievement }}</span>
              </li>
            </ul>
          </div>
        </div>

        <template #footer>
          <Button
            label="Close"
            icon="mdi:close"
            class="!bg-gradient-to-r from-[#7A453F] to-[#B9D1E9] !border-0 !text-white"
            @click="dialogVisible = false"
          />
        </template>
      </Dialog>
    </div>
  </section>
</template>

<style scoped>
/* Horizontal timeline: ensure each event has enough width */
.horizontal-experience-timeline :deep(.p-timeline-event) {
  min-width: 300px;
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

/* Fade transition for scroll buttons */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
