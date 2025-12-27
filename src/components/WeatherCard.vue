<template>
  <div
    v-if="weatherStore.hasWeatherData"
    class="weather-card bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto transform transition-all duration-300"
  >
    <!-- Header -->
    <div class="text-center mb-6">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
        {{ weatherStore.cityName }}, {{ weatherStore.country }}
      </h2>
      <p class="text-gray-600 capitalize text-lg md:text-xl font-medium">
        {{ weatherStore.description }}
      </p>
      <p class="text-sm text-gray-500 mt-1">
        {{ formatTime(new Date()) }}
      </p>
    </div>

    <!-- Main Weather Display -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
      <div class="flex items-center gap-4 md:gap-6">
        <div class="weather-icon-container">
          <img
            :src="`https://openweathermap.org/img/wn/${weatherStore.weatherIcon}@4x.png`"
            :alt="weatherStore.description"
            class="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg"
          />
        </div>
        <div>
          <div class="text-7xl md:text-8xl font-bold text-gray-800 mb-2">
            {{ Math.round(weatherStore.temperature) }}°
          </div>
          <p class="text-gray-600 text-lg md:text-xl">
            Feels like {{ Math.round(weatherStore.feelsLike) }}°
          </p>
        </div>
      </div>
    </div>

    <!-- Weather Details Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="weather-detail-card">
        <div class="text-3xl mb-2">💧</div>
        <p class="text-xs md:text-sm text-gray-600 mb-1">Humidity</p>
        <p class="text-xl md:text-2xl font-bold text-gray-800">{{ weatherStore.humidity }}%</p>
      </div>

      <div class="weather-detail-card">
        <div class="text-3xl mb-2">💨</div>
        <p class="text-xs md:text-sm text-gray-600 mb-1">Wind Speed</p>
        <p class="text-xl md:text-2xl font-bold text-gray-800">{{ Math.round(weatherStore.windSpeed) }} m/s</p>
        <p v-if="weatherStore.windDirection" class="text-xs text-gray-500 mt-1">
          {{ getWindDirection(weatherStore.windDirection) }}
        </p>
      </div>

      <div class="weather-detail-card">
        <div class="text-3xl mb-2">📊</div>
        <p class="text-xs md:text-sm text-gray-600 mb-1">Pressure</p>
        <p class="text-xl md:text-2xl font-bold text-gray-800">{{ weatherStore.pressure }} hPa</p>
      </div>

      <div class="weather-detail-card">
        <div class="text-3xl mb-2">☁️</div>
        <p class="text-xs md:text-sm text-gray-600 mb-1">Cloudiness</p>
        <p class="text-xl md:text-2xl font-bold text-gray-800">{{ weatherStore.cloudiness }}%</p>
      </div>
    </div>

    <!-- Additional Details -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
      <div v-if="weatherStore.visibility" class="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
        <div class="text-2xl">👁️</div>
        <div>
          <p class="text-sm text-gray-600">Visibility</p>
          <p class="text-lg font-semibold text-gray-800">{{ (weatherStore.visibility / 1000).toFixed(1) }} km</p>
        </div>
      </div>

      <div v-if="weatherStore.sunrise" class="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl">
        <div class="text-2xl">🌅</div>
        <div>
          <p class="text-sm text-gray-600">Sunrise</p>
          <p class="text-lg font-semibold text-gray-800">{{ formatTime(new Date(weatherStore.sunrise * 1000)) }}</p>
        </div>
      </div>

      <div v-if="weatherStore.sunset" class="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
        <div class="text-2xl">🌇</div>
        <div>
          <p class="text-sm text-gray-600">Sunset</p>
          <p class="text-lg font-semibold text-gray-800">{{ formatTime(new Date(weatherStore.sunset * 1000)) }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
        <div class="text-2xl">🌡️</div>
        <div>
          <p class="text-sm text-gray-600">Temperature Range</p>
          <p class="text-lg font-semibold text-gray-800">
            {{ Math.round(weatherStore.weatherData?.main?.temp_min) }}° / {{ Math.round(weatherStore.weatherData?.main?.temp_max) }}°
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return directions[Math.round(degrees / 22.5) % 16]
}
</script>

<style scoped>
.weather-card {
  animation: fadeInUp 0.6s ease-out;
}

.weather-icon-container {
  animation: float 3s ease-in-out infinite;
}

.weather-detail-card {
  @apply p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>