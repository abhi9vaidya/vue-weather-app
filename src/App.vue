<template>
  <div 
    :class="backgroundClass"
    class="min-h-screen py-8 px-4 transition-all duration-1000 ease-in-out"
  >
    <div class="container mx-auto">
      <!-- Header -->
      <header class="text-center mb-8 animate-fadeIn">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg">
          🌤️ Weather App
        </h1>
        <p class="text-white/90 text-lg md:text-xl font-medium drop-shadow-md">
          Get real-time weather information for any city
        </p>
      </header>

      <!-- Search Component -->
      <div class="mb-8 animate-slideDown">
        <WeatherSearch />
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="weatherStore.loading" />

      <!-- Error Message -->
      <ErrorMessage
        v-if="weatherStore.error && !weatherStore.loading"
        :error="weatherStore.error"
        @dismiss="weatherStore.clearError"
      />

      <!-- Weather Card and Map -->
      <div v-if="weatherStore.hasWeatherData && !weatherStore.loading" class="space-y-6 animate-fadeIn">
        <WeatherCard />
        <WeatherMap />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeatherStore } from './stores/weather'
import WeatherSearch from './components/WeatherSearch.vue'
import WeatherCard from './components/WeatherCard.vue'
import WeatherMap from './components/WeatherMap.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ErrorMessage from './components/ErrorMessage.vue'

const weatherStore = useWeatherStore()

const backgroundClass = computed(() => {
  if (!weatherStore.hasWeatherData) {
    return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
  }

  const main = weatherStore.weatherMain.toLowerCase()
  const hour = new Date().getHours()
  const isDay = hour >= 6 && hour < 20

  // Weather-based backgrounds
  if (main.includes('clear')) {
    return isDay 
      ? 'bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500'
      : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900'
  } else if (main.includes('cloud')) {
    return 'bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600'
  } else if (main.includes('rain') || main.includes('drizzle')) {
    return 'bg-gradient-to-br from-gray-500 via-gray-600 to-blue-700'
  } else if (main.includes('thunderstorm')) {
    return 'bg-gradient-to-br from-gray-700 via-gray-800 to-purple-900'
  } else if (main.includes('snow')) {
    return 'bg-gradient-to-br from-blue-200 via-cyan-200 to-blue-300'
  } else if (main.includes('mist') || main.includes('fog') || main.includes('haze')) {
    return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
  } else {
    return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600'
  }
})
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}

.animate-slideDown {
  animation: slideDown 0.6s ease-out;
}
</style>