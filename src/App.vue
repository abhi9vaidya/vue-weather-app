<template>
  <div :class="['min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30 flex flex-col', 
    themeStore.isDark ? 'bg-[#0b1324] text-white' : 'bg-[#f2f2f7] text-slate-900']">
    
    <!-- Background Decorative Elements -->
    <div v-if="themeStore.isDark" class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse"></div>
      <div class="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" style="animation-delay: 2s"></div>
      <div class="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
    </div>

    <!-- Header / Navbar (Full Width) -->
    <header 
      :class="['sticky top-0 z-50 w-full border-b transition-all duration-500 backdrop-blur-2xl',
        themeStore.isDark 
          ? 'bg-[#030712]/80 border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
          : 'bg-white/70 border-black/[0.02] shadow-[0_2px_15px_rgba(0,0,0,0.02)]']"
      v-motion-fade
    >
      <div class="w-full px-8 py-4 flex items-center justify-between md:grid md:grid-cols-3 gap-4">
        <!-- Logo Section -->
        <div class="flex items-center gap-4 group cursor-pointer justify-self-start">
          <div class="w-12 h-12 md:w-14 md:h-14 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 flex items-center justify-center">
            <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
          </div>
          <div class="hidden lg:block">
            <h1 :class="['text-sm font-black tracking-tight leading-none mb-1', themeStore.isDark ? 'text-white' : 'text-slate-900']">WeatherWise</h1>
            <p :class="['text-[8px] uppercase tracking-[0.4em] font-bold opacity-40', themeStore.isDark ? 'text-gray-400' : 'text-slate-500']">Your Personal Weather Hub</p>
          </div>
        </div>

        <!-- Search Bar Section -->
        <div class="flex-1 md:flex-none w-full max-w-2xl justify-self-center">
          <SearchBar />
        </div>

        <!-- Actions Section -->
        <div class="flex items-center gap-4 justify-self-end">
          <div :class="['flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md', 
            themeStore.isDark ? 'bg-white/5 border-white/10' : 'bg-black/[0.03] border-black/[0.05]']">
            <a 
              href="https://github.com/abhi9vaidya" 
              target="_blank"
              :class="['p-2.5 rounded-xl transition-all duration-300', 
                themeStore.isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-black/5']"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a 
              href="https://x.com/Abhi9_1535" 
              target="_blank"
              :class="['p-2.5 rounded-xl transition-all duration-300', 
                themeStore.isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-black/5']"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
          <div :class="['w-[1px] h-6 mx-1 hidden sm:block', themeStore.isDark ? 'bg-white/10' : 'bg-black/10']"></div>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="relative z-10 w-full px-8 pt-8 pb-6 flex-1 flex flex-col">
      <!-- Welcome State (Full Width when no data) -->
      <div v-if="!weatherStore.hasWeatherData && !weatherStore.loading && !weatherStore.error" class="flex-1 flex items-center justify-center">
        <WelcomeState />
      </div>

      <!-- Main Content Grid -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-full">
        <!-- Left Panel: Dashboard (65%) -->
        <div class="lg:col-span-8 flex flex-col gap-6">
          <!-- Loading State -->
          <SkeletonCard v-if="weatherStore.loading" />

          <!-- Error Message -->
          <ErrorMessage
            v-if="weatherStore.error && !weatherStore.loading"
            :error="weatherStore.error"
            @dismiss="weatherStore.clearError"
          />

          <!-- Weather Content -->
          <template v-if="weatherStore.hasWeatherData && !weatherStore.loading">
            <WeatherCard class="flex-1" />
            
            <div v-motion-slide-visible-bottom>
              <div class="flex items-center gap-4 mb-3">
                <h2 :class="['text-[9px] font-black tracking-[0.4em] uppercase opacity-40', themeStore.isDark ? 'text-gray-400' : 'text-slate-500']">Weather Details</h2>
                <div :class="['h-[1px] flex-1', themeStore.isDark ? 'bg-white/10' : 'bg-slate-200']"></div>
              </div>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <WeatherDetailCard 
                  label="Humidity" 
                  :value="weatherStore.humidity + '%'" 
                  icon="droplets"
                  color="blue"
                />
                <WeatherDetailCard 
                  label="Wind Speed" 
                  :value="weatherStore.windSpeed + ' m/s'" 
                  icon="wind"
                  color="teal"
                />
                <WeatherDetailCard 
                  label="Wind Dir" 
                  :value="getWindDirection(weatherStore.windDirection)" 
                  icon="compass"
                  color="indigo"
                />
                <WeatherDetailCard 
                  label="Pressure" 
                  :value="weatherStore.pressure + ' hPa'" 
                  icon="gauge"
                  color="purple"
                />
                <WeatherDetailCard 
                  label="Clouds" 
                  :value="weatherStore.cloudiness + '%'" 
                  icon="cloud"
                  color="slate"
                />
                <WeatherDetailCard 
                  label="Visibility" 
                  :value="(weatherStore.visibility / 1000).toFixed(1) + ' km'" 
                  icon="eye"
                  color="cyan"
                />
                <WeatherDetailCard 
                  label="Sunrise" 
                  :value="formatTime(weatherStore.sunrise)" 
                  icon="sunrise"
                  color="orange"
                />
                <WeatherDetailCard 
                  label="Sunset" 
                  :value="formatTime(weatherStore.sunset)" 
                  icon="sunset"
                  color="rose"
                />
              </div>
            </div>
          </template>
        </div>

        <!-- Right Panel: Map (35%) -->
        <div class="lg:col-span-4 lg:sticky lg:top-28 self-start h-full">
          <MapView v-if="weatherStore.hasWeatherData && !weatherStore.loading" class="h-full" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWeatherStore } from './stores/weather'
import { useThemeStore } from './stores/theme'
import SearchBar from './components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue'
import MapView from './components/MapView.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import SkeletonCard from './components/SkeletonCard.vue'
import ErrorMessage from './components/ErrorMessage.vue'
import WelcomeState from './components/WelcomeState.vue'
import WeatherDetailCard from './components/WeatherDetailCard.vue'

const weatherStore = useWeatherStore()
const themeStore = useThemeStore()

const formatTime = (timestamp) => {
  if (!timestamp) return '--:--'
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getWindDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(deg / 45) % 8]
}

onMounted(() => {
  themeStore.initTheme()
})
</script>