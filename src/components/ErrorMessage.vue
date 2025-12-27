<template>
  <div
    v-if="error"
    class="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 animate-fadeIn"
  >
    <div class="text-red-500 text-xl">⚠️</div>
    <div class="flex-1">
      <h3 class="font-semibold text-red-800 mb-1">Error</h3>
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>
    <button
      @click="$emit('dismiss')"
      class="text-red-500 hover:text-red-700 transition-colors"
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
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
