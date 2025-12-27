<template>
  <Transition name="fade">
    <div
      v-if="error"
      :class="['rounded-2xl backdrop-blur-xl p-4 flex items-center gap-4 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] border transition-all duration-500',
        themeStore.isDark ? 'bg-white/10 border-white/15' : 'bg-white border-slate-200']"
    >
      <div :class="['p-2 rounded-xl', themeStore.isDark ? 'bg-red-500/20' : 'bg-red-50']">
        <svg :class="['w-5 h-5', themeStore.isDark ? 'text-red-400' : 'text-red-600']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex-1">
        <p :class="['text-sm font-medium tracking-tight', themeStore.isDark ? 'text-white' : 'text-slate-900']">{{ error }}</p>
      </div>
      <button
        @click="$emit('dismiss')"
        :class="['p-2 rounded-xl transition-all', 
          themeStore.isDark ? 'hover:bg-white/10 text-white/40 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900']"
        aria-label="Dismiss error"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { useThemeStore } from '../stores/theme'
const themeStore = useThemeStore()

defineProps({
  error: {
    type: String,
    default: null
  }
})

defineEmits(['dismiss'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>