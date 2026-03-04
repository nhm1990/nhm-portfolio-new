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
    class="relative overflow-hidden rounded-2xl bg-gradient-primary p-[3px] shadow-2xl drop-shadow-[0_0_40px_rgba(59,176,106,0.5)]"
  >
    <!-- Spinning locomotive beam (motion-v) -->
    <Motion
      tag="div"
      :style="{
        position: 'absolute',
        inset: '-50%',
        transformOrigin: 'center',
        background:
          'conic-gradient(transparent 0deg, transparent 245deg, rgba(110,231,183,0.7) 260deg, rgba(210,255,235,0.95) 272deg, rgba(255,255,255,1) 278deg, rgba(255,255,255,1) 282deg, rgba(210,255,235,0.95) 288deg, rgba(110,231,183,0.7) 300deg, transparent 315deg, transparent 360deg)',
        pointerEvents: 'none',
        zIndex: 1,
      }"
      :animate="{
        rotate: [0, 360],
      }"
      :transition="{
        rotate: { duration: 5, ease: 'linear', repeat: Infinity },
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
