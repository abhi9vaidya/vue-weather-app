<template>
  <div 
    v-if="weatherStore.hasWeatherData"
    :class="['relative overflow-hidden rounded-[32px] p-6 md:p-8 transition-colors duration-300 border', 
      themeStore.isDark 
        ? 'bg-[#1a2235] border-white/10 shadow-xl' 
        : 'bg-white border-black/[0.02] shadow-md']"
  >
    <!-- Inner Glow Effect -->
    <div v-if="themeStore.isDark" class="absolute inset-0 pointer-events-none border border-white/[0.02] rounded-[32px]"></div>

    <div class="relative z-10 h-full flex flex-col justify-between">
      <!-- Header: City & Condition -->
      <div class="flex flex-col md:flex-row justify-between items-start gap-6">
        <div class="space-y-3">
          <div class="flex items-center gap-4">
            <div class="flex flex-col">
              <span :class="['text-[9px] font-black tracking-[0.3em] uppercase mb-1 opacity-40', themeStore.isDark ? 'text-gray-400' : 'text-slate-500']">Current Location</span>
              <h2 :class="['text-4xl md:text-5xl font-black tracking-tighter leading-tight', themeStore.isDark ? 'text-white' : 'text-slate-900']">
                {{ weatherStore.cityName }}
              </h2>
            </div>
            <span :class="['mt-4 px-2 py-0.5 rounded-lg text-[9px] font-black tracking-widest uppercase border backdrop-blur-md self-start', 
              themeStore.isDark ? 'bg-white/5 text-gray-400 border-white/10' : 'bg-slate-100 text-slate-500 border-slate-200']">
              {{ weatherStore.country }}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <div :class="['w-1.5 h-1.5 rounded-full', themeStore.isDark ? 'bg-green-400' : 'bg-green-500']"></div>
            <p :class="['text-lg font-semibold capitalize tracking-wide opacity-70', themeStore.isDark ? 'text-gray-300' : 'text-slate-600']">
              {{ weatherStore.description }}
            </p>
          </div>
        </div>
        
        <!-- Minimal Weather Icon -->
        <div class="relative self-center md:self-start mt-2 md:mt-0">
          <img 
            :src="`https://openweathermap.org/img/wn/${weatherStore.weatherIcon}@4x.png`" 
            :alt="weatherStore.description"
            class="w-24 h-24 md:w-32 md:h-32 relative z-10 drop-shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <!-- Temperature Section -->
      <div class="flex flex-col md:flex-row items-end justify-between gap-6 mt-8">
        <div class="flex items-start cursor-default">
          <span :class="['text-[100px] md:text-[120px] font-black leading-none tracking-tighter', 
            themeStore.isDark ? 'text-white' : 'text-slate-900']">
            {{ Math.round(weatherStore.temperature) }}
          </span>
          <span :class="['text-4xl font-bold mt-6 ml-2 opacity-20', themeStore.isDark ? 'text-gray-500' : 'text-slate-400']">°</span>
        </div>

        <div class="flex flex-col gap-4 w-full md:w-auto min-w-[240px]">
          <div :class="['flex items-center justify-between px-4 py-3 rounded-[20px] border backdrop-blur-md transition-all duration-300 hover:bg-opacity-80', 
            themeStore.isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/50 shadow-sm']">
            <div class="flex items-center gap-3">
              <div :class="['p-1.5 rounded-lg', themeStore.isDark ? 'bg-orange-500/20' : 'bg-orange-500/10']">
                <svg xmlns="http://www.w3.org/2000/svg" :class="['w-3.5 h-3.5', themeStore.isDark ? 'text-orange-400' : 'text-orange-600']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
              </div>
              <span :class="['text-xs font-bold', themeStore.isDark ? 'text-gray-400' : 'text-slate-500']">Feels like</span>
            </div>
            <b :class="['text-base font-black', themeStore.isDark ? 'text-white' : 'text-slate-900']">{{ Math.round(weatherStore.feelsLike) }}°</b>
          </div>
          
          <div class="flex gap-3">
            <div :class="['px-4 py-3 rounded-[20px] border transition-all duration-300 flex-1 backdrop-blur-sm', 
              themeStore.isDark ? 'bg-blue-500/5 border-blue-500/10' : 'bg-blue-50 border-blue-100/50 shadow-sm']">
              <p :class="['text-[9px] uppercase tracking-[0.2em] font-black mb-1 opacity-50', themeStore.isDark ? 'text-blue-400' : 'text-blue-600']">Low</p>
              <p :class="['text-xl font-black', themeStore.isDark ? 'text-blue-300' : 'text-blue-700']">{{ Math.round(weatherStore.weatherData?.main?.temp_min) }}°</p>
            </div>
            <div :class="['px-4 py-3 rounded-[20px] border transition-all duration-300 flex-1 backdrop-blur-sm', 
              themeStore.isDark ? 'bg-orange-500/5 border-orange-500/10' : 'bg-orange-50 border-orange-100/50 shadow-sm']">
              <p :class="['text-[9px] uppercase tracking-[0.2em] font-black mb-1 opacity-50', themeStore.isDark ? 'text-orange-400' : 'text-orange-600']">High</p>
              <p :class="['text-xl font-black', themeStore.isDark ? 'text-orange-300' : 'text-orange-700']">{{ Math.round(weatherStore.weatherData?.main?.temp_max) }}°</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from '../stores/weather'
import { useThemeStore } from '../stores/theme'

const weatherStore = useWeatherStore()
const themeStore = useThemeStore()
</script>