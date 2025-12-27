<template>
  <div v-if="latitude && longitude" class="map-container rounded-2xl overflow-hidden shadow-xl border-2 border-white/20">
    <div ref="mapContainer" class="w-full h-64 md:h-80"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()
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

  map = L.map(mapContainer.value).setView([latitude.value, longitude.value], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  // Add marker
  marker = L.marker([latitude.value, longitude.value])
    .addTo(map)
    .bindPopup(`${weatherStore.cityName}, ${weatherStore.country}`)
    .openPopup()
}

watch([latitude, longitude], () => {
  if (latitude.value && longitude.value) {
    initializeMap()
  }
})

onMounted(() => {
  if (latitude.value && longitude.value) {
    initializeMap()
  }
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
.map-container {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
