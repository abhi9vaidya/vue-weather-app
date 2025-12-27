<template>
  <div class="w-full max-w-2xl mx-auto">
    <form @submit.prevent="handleSearch" class="flex gap-3">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Enter city name..."
          class="w-full px-6 py-4 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all text-lg font-medium shadow-lg"
          :disabled="loading"
        />
        <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70">
          🔍
        </div>
      </div>
      <button
        type="submit"
        :disabled="loading || !searchQuery.trim()"
        class="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 disabled:bg-white/50 disabled:cursor-not-allowed transition-all font-bold text-lg shadow-lg hover:scale-105 active:scale-95"
      >
        {{ loading ? 'Searching...' : 'Search' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '../stores/weather'

const weatherStore = useWeatherStore()
const searchQuery = ref('')
const loading = computed(() => weatherStore.loading)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    weatherStore.fetchWeather(searchQuery.value)
  }
}
</script>