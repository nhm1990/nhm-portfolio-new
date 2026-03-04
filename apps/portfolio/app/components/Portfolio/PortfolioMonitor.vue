<script setup lang="ts">
import { shallowRef, watch, onMounted } from 'vue'
import { TextureLoader, CanvasTexture, MeshStandardMaterial, Color, SRGBColorSpace } from 'three'
import type { Texture } from 'three'

interface Props {
  imageSrc: string
  direction: 'none' | 'left' | 'right'
}

const props = defineProps<Props>()

const screenMaterial = shallowRef<MeshStandardMaterial | null>(null)
const fallbackTexture = shallowRef<Texture | null>(null)

// Monitor dimensions
const MONITOR_WIDTH = 4.2
const MONITOR_HEIGHT = 2.6
const MONITOR_DEPTH = 0.18
const BEZEL = 0.15
const SCREEN_WIDTH = MONITOR_WIDTH - BEZEL * 2
const SCREEN_HEIGHT = MONITOR_HEIGHT - BEZEL * 2
const STAND_WIDTH = 0.6
const STAND_HEIGHT = 0.9
const STAND_DEPTH = 0.08
const BASE_WIDTH = 1.6
const BASE_HEIGHT = 0.06
const BASE_DEPTH = 0.8

// Create a gradient fallback texture
const createFallbackTexture = (): Texture => {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 288
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, 512, 288)
  gradient.addColorStop(0, '#1a1a2e')
  gradient.addColorStop(1, '#16213e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 512, 288)

  ctx.fillStyle = '#5a8a5a'
  ctx.font = '24px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('Loading...', 256, 156)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

// Load texture from image path using TextureLoader
const loadScreenTexture = (src: string): Promise<Texture | null> => {
  if (!src) return Promise.resolve(null)
  return new Promise((resolve) => {
    const loader = new TextureLoader()
    loader.load(
      src,
      (tex: Texture) => {
        tex.colorSpace = SRGBColorSpace
        resolve(tex)
      },
      undefined,
      () => resolve(null)
    )
  })
}

// Update screen texture when image changes
watch(
  () => props.imageSrc,
  async (newSrc) => {
    const tex = await loadScreenTexture(newSrc)
    if (screenMaterial.value) {
      screenMaterial.value.map = tex ?? fallbackTexture.value
      screenMaterial.value.needsUpdate = true
    }
  },
  { immediate: false }
)

onMounted(async () => {
  fallbackTexture.value = createFallbackTexture()

  const mat = new MeshStandardMaterial({
    map: fallbackTexture.value,
    emissive: new Color('#111111'),
    emissiveIntensity: 0.3,
    roughness: 0.2,
    metalness: 0.0,
  })
  screenMaterial.value = mat

  // Load actual texture
  const tex = await loadScreenTexture(props.imageSrc)
  if (tex && screenMaterial.value) {
    screenMaterial.value.map = tex
    screenMaterial.value.emissive = new Color('#222222')
    screenMaterial.value.emissiveIntensity = 0.15
    screenMaterial.value.needsUpdate = true
  }
})
</script>

<template>
  <TresGroup :rotation-y="Math.PI * 0.12" :position="[-2.5, -2, 0]" :scale="0.95">
    <!-- Monitor body (bezel/frame) -->
    <TresMesh :position="[0, STAND_HEIGHT + MONITOR_HEIGHT / 2, 0]" :cast-shadow="true">
      <TresBoxGeometry :args="[MONITOR_WIDTH, MONITOR_HEIGHT, MONITOR_DEPTH]" />
      <TresMeshStandardMaterial color="#1a1a1a" :roughness="0.3" :metalness="0.8" />
    </TresMesh>

    <!-- Screen (slightly in front of body) -->
    <TresMesh :position="[0, STAND_HEIGHT + MONITOR_HEIGHT / 2, MONITOR_DEPTH / 2 + 0.001]">
      <TresPlaneGeometry :args="[SCREEN_WIDTH, SCREEN_HEIGHT]" />
      <primitive v-if="screenMaterial" :object="screenMaterial" attach="material" />
    </TresMesh>

    <!-- Thin bezel highlight (top edge) -->
    <TresMesh :position="[0, STAND_HEIGHT + MONITOR_HEIGHT - BEZEL / 2, MONITOR_DEPTH / 2 + 0.002]">
      <TresPlaneGeometry :args="[MONITOR_WIDTH - 0.02, 0.02]" />
      <TresMeshStandardMaterial color="#333333" :roughness="0.5" />
    </TresMesh>

    <!-- Stand neck -->
    <TresMesh :position="[0, STAND_HEIGHT / 2, -0.05]" :cast-shadow="true">
      <TresBoxGeometry :args="[STAND_WIDTH, STAND_HEIGHT, STAND_DEPTH]" />
      <TresMeshStandardMaterial color="#2a2a2a" :roughness="0.4" :metalness="0.7" />
    </TresMesh>

    <!-- Stand base -->
    <TresMesh :position="[0, BASE_HEIGHT / 2, 0.1]" :cast-shadow="true" :receive-shadow="true">
      <TresBoxGeometry :args="[BASE_WIDTH, BASE_HEIGHT, BASE_DEPTH]" />
      <TresMeshStandardMaterial color="#2a2a2a" :roughness="0.4" :metalness="0.7" />
    </TresMesh>

    <!-- Screen glow (subtle light behind monitor) -->
    <TresPointLight
      :position="[0, STAND_HEIGHT + MONITOR_HEIGHT / 2, MONITOR_DEPTH + 0.5]"
      color="#5a8a5a"
      :intensity="0.4"
      :distance="3"
    />
  </TresGroup>
</template>
