<template>
  <div class="w-full max-w-md mx-auto">
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Enter city name..."
        class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        :disabled="loading"
      />
      <button
        type="submit"
        :disabled="loading || !searchQuery.trim()"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
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
