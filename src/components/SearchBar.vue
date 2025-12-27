<template>
  <form @submit.prevent="handleSearch" class="relative group w-full">
    <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" :class="['h-3.5 w-3.5 transition-colors', themeStore.isDark ? 'text-gray-500 group-focus-within:text-blue-400' : 'text-slate-400 group-focus-within:text-blue-600']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search city..."
      :class="['w-full border text-[14px] font-medium rounded-2xl py-3 pl-12 pr-14 transition-all duration-500 backdrop-blur-md outline-none', 
        themeStore.isDark 
          ? 'bg-white/[0.03] border-white/10 text-white placeholder-gray-500 focus:bg-white/[0.08] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10' 
          : 'bg-white border-black/[0.02] text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]']"
      :disabled="loading"
    />
    <button
      type="submit"
      :disabled="loading || !searchQuery.trim()"
      :class="['absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-xl transition-all duration-500 flex items-center justify-center active:scale-95',
        themeStore.isDark 
          ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30' 
          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20']"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useWeatherStore } from '../stores/weather'
import { useThemeStore } from '../stores/theme'

const weatherStore = useWeatherStore()
const themeStore = useThemeStore()
const searchQuery = ref('')
const loading = computed(() => weatherStore.loading)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    weatherStore.fetchWeather(searchQuery.value)
    searchQuery.value = ''
  }
}
</script>

