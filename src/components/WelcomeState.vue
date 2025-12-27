<template>
  <div 
    class="flex flex-col items-center justify-center min-h-[50vh] w-full px-6 text-center relative"
    v-motion-fade
  >
    <div :class="['w-32 h-32 mb-10 rounded-[45px] flex items-center justify-center text-6xl shadow-2xl transform hover:rotate-12 transition-all duration-500 hover:scale-110', 
      themeStore.isDark ? 'bg-white/5 text-white shadow-blue-500/20' : 'bg-white text-slate-900 shadow-black/10']">
      🌍
    </div>
    
    <h2 :class="['text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight', 
      themeStore.isDark ? 'text-white' : 'text-slate-900']">
      Ready to chase <br class="hidden md:block" /> some clouds? ☁️
    </h2>
    
    <p :class="['text-xl font-medium max-w-lg opacity-60 leading-relaxed mb-12', 
      themeStore.isDark ? 'text-gray-400' : 'text-slate-600']">
      Type a city name in the search bar above and let's see what the sky is up to! Your personal weather dashboard is just one click away.
    </p>
    
    <div class="flex gap-6">
      <div v-for="(emoji, index) in ['☀️', '🌧️', '❄️', '🌩️']" :key="index" 
        :style="{ animationDelay: `${index * 150}ms` }"
        class="text-3xl filter grayscale hover:grayscale-0 transition-all duration-500 cursor-default transform hover:scale-150 hover:-translate-y-2 animate-pulse">
        {{ emoji }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'
const themeStore = useThemeStore()
</script>
