<script setup lang="ts">
import { Motion } from 'motion-v'

interface Props {
  cta: string
  contactLabel: string
}

defineProps<Props>()

interface Emit {
  onScrollToContact: []
}

const emit = defineEmits<Emit>()

const handleContactClick = () => {
  emit('onScrollToContact')
}
</script>

<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-mint-300/50 p-[2px] shadow-xl drop-shadow-[0_0_20px_rgba(59,176,106,0.25)]"
  >
    <!-- Spinning locomotive beam (motion-v) — dezent -->
    <Motion
      tag="div"
      :style="{
        position: 'absolute',
        inset: '-50%',
        transformOrigin: 'center',
        background:
          'conic-gradient(transparent 0deg, transparent 250deg, rgba(59,176,106,0.04) 262deg, rgba(110,231,183,0.18) 272deg, rgba(167,243,208,0.55) 279deg, rgba(255,255,255,0.85) 282deg, rgba(167,243,208,0.55) 285deg, rgba(110,231,183,0.18) 292deg, rgba(59,176,106,0.04) 302deg, transparent 314deg, transparent 360deg)',
        pointerEvents: 'none',
        zIndex: 1,
      }"
      :animate="{
        rotate: [0, 360],
        opacity: [1, 0.95, 0.5, 0.95, 1, 0.7, 1, 1],
      }"
      :transition="{
        rotate: { duration: 5, ease: 'linear', repeat: Infinity },
        opacity: {
          duration: 1.1,
          ease: 'easeInOut',
          repeat: Infinity,
          times: [0, 0.48, 0.5, 0.52, 0.6, 0.71, 0.73, 1],
        },
      }"
    />

    <!-- Inner content box -->
    <div class="relative z-[2] bg-gradient-primary rounded-[14px] py-16 px-12 text-center">
      <h3 class="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
        {{ cta }}
      </h3>
      <Button
        :label="contactLabel"
        class="!bg-white !text-charcoal-900 !border-0 !px-10 !py-4 !text-lg !font-bold hover:!bg-mint-50 hover:!scale-105 hover:!shadow-xl hover:!shadow-mint-500/20 transition-all"
        raised
        @click="handleContactClick"
      />
    </div>
  </div>
</template>
