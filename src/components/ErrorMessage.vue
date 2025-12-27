<template>
  <div
    v-if="error"
    class="max-w-2xl mx-auto bg-red-50/95 backdrop-blur-sm border-2 border-red-200 rounded-xl p-5 flex items-start gap-4 animate-slideIn shadow-xl"
  >
    <div class="text-red-500 text-2xl flex-shrink-0">⚠️</div>
    <div class="flex-1">
      <h3 class="font-bold text-red-800 mb-1 text-lg">Error</h3>
      <p class="text-red-700 text-sm md:text-base">{{ error }}</p>
    </div>
    <button
      @click="$emit('dismiss')"
      class="text-red-500 hover:text-red-700 transition-colors text-xl font-bold flex-shrink-0 hover:scale-110 active:scale-95"
      aria-label="Dismiss error"
    >
      ✕
    </button>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: null
  }
})

defineEmits(['dismiss'])
</script>

<style scoped>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
}
</style>