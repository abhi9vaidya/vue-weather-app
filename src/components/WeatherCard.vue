<template>
  <div
    v-if="weatherStore.hasWeatherData"
    class="weather-card bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:scale-105"
  >
    <!-- Header -->
    <div class="text-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800 mb-2">
        {{ weatherStore.cityName }}, {{ weatherStore.country }}
      </h2>
      <p class="text-gray-600 capitalize text-lg">{{ weatherStore.description }}</p>
    </div>

    <!-- Main Weather Display -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-8">
      <div class="flex items-center gap-4 mb-4 md:mb-0">
        <img
          :src="`https://openweathermap.org/img/wn/${weatherStore.weatherIcon}@2x.png`"
          :alt="weatherStore.description"
          class="w-24 h-24"
        />
        <div>
          <div class="text-6xl font-bold text-gray-800">
            {{ Math.round(weatherStore.temperature) }}°
          </div>
          <p class="text-gray-600 text-lg">Feels like {{ Math.round(weatherStore.feelsLike) }}°</p>
        </div>
      </div>
    </div>

    <!-- Weather Details Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
      <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <div class="text-2xl">💧</div>
        <div>
          <p class="text-sm text-gray-600">Humidity</p>
          <p class="text-xl font-semibold text-gray-800">{{ weatherStore.humidity }}%</p>
        </div>
      </div>

      <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <div class="text-2xl">💨</div>
        <div>
          <p class="text-sm text-gray-600">Wind Speed</p>
          <p class="text-xl font-semibold text-gray-800">{{ Math.round(weatherStore.windSpeed) }} m/s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()
</script>

<style scoped>
.weather-card {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
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
