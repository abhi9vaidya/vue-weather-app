<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-8 px-4">
    <div class="container mx-auto">
      <!-- Header -->
      <header class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">
          🌤️ Weather App
        </h1>
        <p class="text-blue-100 text-lg">Get real-time weather information for any city</p>
      </header>

      <!-- Search Component -->
      <div class="mb-8">
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

      <!-- Weather Card -->
      <WeatherCard v-if="weatherStore.hasWeatherData && !weatherStore.loading" />
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from './stores/weather'
import WeatherSearch from './components/WeatherSearch.vue'
import WeatherCard from './components/WeatherCard.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'
import ErrorMessage from './components/ErrorMessage.vue'

const weatherStore = useWeatherStore()
</script>
