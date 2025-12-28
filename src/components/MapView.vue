<template>
  <div
    v-if="latitude && longitude"
    :class="['rounded-[32px] border transition-all duration-700 flex flex-col h-full overflow-hidden min-h-[350px] group', 
      themeStore.isDark 
        ? 'bg-[#0b1324]/40 border-white/5 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]' 
        : 'bg-white border-black/[0.02] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]']"
  >
    <div :class="['p-4 flex items-center justify-between border-b backdrop-blur-xl relative z-10', themeStore.isDark ? 'border-white/5 bg-white/[0.02]' : 'border-black/[0.02] bg-white/50']">
      <div class="flex items-center gap-3">
        <div :class="['p-2 rounded-xl border transition-all duration-500 shadow-inner group-hover:scale-110 group-hover:rotate-6', 
          themeStore.isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-500/[0.06] border-blue-500/10']">
          <svg xmlns="http://www.w3.org/2000/svg" :class="['w-4 h-4', themeStore.isDark ? 'text-blue-400' : 'text-blue-600']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div class="flex flex-col">
          <h3 :class="['text-[10px] font-black tracking-[0.3em] uppercase opacity-40', themeStore.isDark ? 'text-white' : 'text-slate-900']">Live Map</h3>
          <p :class="['text-[9px] font-bold opacity-60', themeStore.isDark ? 'text-blue-400' : 'text-blue-600']">Interactive View</p>
        </div>
      </div>
      <div :class="['flex items-center gap-2 text-[9px] font-mono font-bold px-3 py-1.5 rounded-lg border backdrop-blur-md transition-all group-hover:border-blue-500/30', 
        themeStore.isDark ? 'text-gray-400 bg-white/5 border-white/10' : 'text-slate-500 bg-black/[0.02] border-black/[0.05]']">
        <span class="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></span>
        {{ latitude.toFixed(4) }}°, {{ longitude.toFixed(4) }}°
      </div>
    </div>
    <div class="relative flex-1 overflow-hidden">
      <div ref="mapContainer" class="absolute inset-0 w-full h-full transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0"></div>
      <!-- Inner Glow Overlay -->
      <div :class="['absolute inset-0 pointer-events-none border-[24px] transition-all duration-700 opacity-0 group-hover:opacity-100', 
        themeStore.isDark ? 'border-white/[0.02]' : 'border-slate-900/[0.01]']"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useWeatherStore } from '../stores/weather'
import { useThemeStore } from '../stores/theme'

const weatherStore = useWeatherStore()
const themeStore = useThemeStore()
const mapContainer = ref(null)
let map = null
let marker = null

const latitude = computed(() => weatherStore.latitude)
const longitude = computed(() => weatherStore.longitude)

// Fix for default marker icon issue in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const initializeMap = () => {
  if (!mapContainer.value || !latitude.value || !longitude.value) return

  if (map) {
    map.remove()
  }

  map = L.map(mapContainer.value, {
    zoomControl: false,
    attributionControl: false
  }).setView([latitude.value, longitude.value], 11)

  const tileLayer = themeStore.isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

  L.tileLayer(tileLayer, {
    maxZoom: 19,
  }).addTo(map)

  marker = L.marker([latitude.value, longitude.value])
    .addTo(map)
}

watch([latitude, longitude, () => themeStore.isDark], () => {
  if (latitude.value && longitude.value) {
    setTimeout(() => initializeMap(), 100)
  }
})

onMounted(() => {
  if (latitude.value && longitude.value) {
    setTimeout(() => initializeMap(), 100)
  }
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style>
.leaflet-container {
  background: transparent !important;
}
</style>
