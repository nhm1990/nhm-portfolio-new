<script setup lang="ts">
import { OrbitControls, ContactShadows } from '@tresjs/cientos'

interface Props {
  imageSrc: string
  direction: 'none' | 'left' | 'right'
}

defineProps<Props>()

/*
Parameter	        Was es macht
position [x, y, z]	Wo die Kamera steht. x: links(-)/rechts(+), y: unten(-)/oben(+), z: nah(0)/fern(+)
fov	                Sichtwinkel — kleiner = mehr "Zoom"/enger, größer = weitwinkeliger
target [x, y, z]	Wohin die Kamera schaut (OrbitControls Mittelpunkt)
Monitor position	Position des 3D-Objekts im Weltkoordinatensystem
Monitor rotation-y	Drehung um Y-Achse (vertikal) — gibt den angewinkelten Look
*/
</script>

<template>
  <div class="w-full h-full">
    <TresCanvas
      clear-color="#00000000"
      :alpha="true"
      :antialias="true"
      :tone-mapping="4"
      :shadows="true"
    >
      <!-- Camera — sits to the RIGHT of the monitor, looks left → monitor appears on left side of screen -->
      <TresPerspectiveCamera :position="[3, 0.9, 11]" :fov="40" :near="0.1" :far="100" />

      <!-- Orbit controls — limited so user can gently rotate -->
      <OrbitControls
        :enable-zoom="false"
        :enable-pan="false"
        :auto-rotate="true"
        :auto-rotate-speed="0.3"
        :max-polar-angle="Math.PI / 2.1"
        :min-polar-angle="Math.PI / 3"
        :max-azimuth-angle="Math.PI / 4"
        :min-azimuth-angle="-Math.PI / 6"
        :enable-damping="true"
        :damping-factor="0.05"
        :target="[0, 1.0, 0]"
      />

      <!-- Lighting -->
      <TresAmbientLight :intensity="0.6" />
      <TresDirectionalLight
        :position="[5, 8, 5]"
        :intensity="1.2"
        :cast-shadow="true"
        :shadow-mapSize-width="1024"
        :shadow-mapSize-height="1024"
      />
      <TresDirectionalLight :position="[-3, 4, -2]" :intensity="0.3" color="#5a8a5a" />

      <!-- Monitor -->
      <PortfolioMonitor :image-src="imageSrc" :direction="direction" />

      <!-- Contact shadow on floor -->
      <ContactShadows
        :opacity="0.4"
        :blur="2.5"
        :position="[0, -0.01, 0]"
        :scale="10"
        color="#1a1a1a"
      />
    </TresCanvas>
  </div>
</template>
