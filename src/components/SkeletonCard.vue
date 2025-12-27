<template>
  <div class="space-y-10 animate-pulse flex-1">
    <!-- Main Card Skeleton -->
    <div :class="['rounded-[32px] p-8 h-[400px] flex flex-col justify-between border', 
      themeStore.isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/[0.03]']">
      <div class="flex justify-between items-start">
        <div class="space-y-4">
          <div :class="['h-12 rounded-2xl w-64', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
          <div :class="['h-6 rounded-xl w-40', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
        </div>
        <div :class="['w-32 h-32 rounded-full', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
      </div>
      <div class="flex items-end justify-between gap-10">
        <div :class="['h-32 rounded-3xl w-64', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
        <div class="space-y-4 w-72">
          <div :class="['h-10 rounded-2xl w-full', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
          <div class="flex gap-4">
            <div :class="['h-14 rounded-2xl flex-1', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
            <div :class="['h-14 rounded-2xl flex-1', themeStore.isDark ? 'bg-white/10' : 'bg-slate-100']"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'
const themeStore = useThemeStore()
</script>

