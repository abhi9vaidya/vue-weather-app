<template>
  <div 
    :class="['rounded-[28px] p-6 flex items-center gap-5 hover:scale-[1.03] transition-all duration-500 group border backdrop-blur-md relative overflow-hidden', 
      themeStore.isDark 
        ? 'bg-white/[0.03] border-white/10 shadow-xl shadow-black/20 hover:bg-white/[0.06] hover:border-white/20' 
        : 'bg-white border-black/[0.02] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.08)] hover:border-black/[0.06]']"
  >
    <!-- Subtle Background Glow on Hover -->
    <div :class="['absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none', colorGlowClasses[color]]"></div>

    <div :class="[colorClasses[color], 'p-3.5 rounded-2xl border group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-inner relative z-10']" v-html="iconSvg">
    </div>
    <div class="min-w-0 relative z-10">
      <p :class="['text-[10px] uppercase tracking-[0.3em] font-black mb-1.5 truncate opacity-40 group-hover:opacity-60 transition-opacity', themeStore.isDark ? 'text-gray-400' : 'text-slate-500']">{{ label }}</p>
      <p :class="['text-xl font-black truncate tracking-tight', themeStore.isDark ? 'text-white' : 'text-slate-900']">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const props = defineProps({
  label: String,
  value: [String, Number],
  icon: String,
  color: {
    type: String,
    default: 'blue'
  }
})

const colorGlowClasses = {
  blue: 'bg-blue-500',
  teal: 'bg-teal-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  slate: 'bg-slate-500',
  cyan: 'bg-cyan-500',
  orange: 'bg-orange-500',
  rose: 'bg-rose-500'
}

const colorClasses = computed(() => {
  if (themeStore.isDark) {
    return {
      blue: 'bg-blue-500/20 border-blue-500/30',
      teal: 'bg-teal-500/20 border-teal-500/30',
      indigo: 'bg-indigo-500/20 border-indigo-500/30',
      purple: 'bg-purple-500/20 border-purple-500/30',
      slate: 'bg-slate-500/20 border-slate-500/30',
      cyan: 'bg-cyan-500/20 border-cyan-500/30',
      orange: 'bg-orange-500/20 border-orange-500/30',
      rose: 'bg-rose-500/20 border-rose-500/30'
    }
  }
  return {
    blue: 'bg-blue-500/[0.06] border-blue-500/10',
    teal: 'bg-teal-500/[0.06] border-teal-500/10',
    indigo: 'bg-indigo-500/[0.06] border-indigo-500/10',
    purple: 'bg-purple-500/[0.06] border-purple-500/10',
    slate: 'bg-slate-500/[0.06] border-slate-500/10',
    cyan: 'bg-cyan-500/[0.06] border-cyan-500/10',
    orange: 'bg-orange-500/[0.06] border-orange-500/10',
    rose: 'bg-rose-500/[0.06] border-rose-500/10'
  }
})

const iconSvg = computed(() => {
  const color = themeStore.isDark ? '400' : '600'
  const icons = {
    droplets: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-${color}"><path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4Z"/><path d="M17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4Z"/></svg>`,
    wind: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-teal-${color}"><path d="M17.7 7.7A2.5 2.5 0 1 1 15.8 12H3"/><path d="M9.9 4.7A2.5 2.5 0 1 0 8 9h12"/><path d="M17.3 19.3A2.5 2.5 0 1 1 15.4 15H3"/></svg>`,
    compass: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-${color}"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    gauge: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-${color}"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
    cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-${color}"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.5-2-4.5-4.5-4.5-.3 0-.6 0-.9.1a7 7 0 1 0-13.2 3.3c-.5-.1-1-.1-1.4-.1-2.8 0-5 2.2-5 5s2.2 5 5 5h15.5Z"/></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-${color}"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
    sunrise: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-${color}"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>`,
    sunset: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-${color}"><path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 18-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>`
  }
  return icons[props.icon] || ''
})
</script>
