<template>
  <ScreenOverlay>
    <p class="text-3xl">
      Paused<br />
      <span class="bg-indigo-500 px-2">P</span><br />
      to resume
    </p>
    <button @click="$emit('openSettings')" class="mt-4 flex items-center gap-2">
      <i class="material-icons">settings</i> Settings
    </button>
  </ScreenOverlay>
</template>

<script>
import ScreenOverlay from '@/components/ScreenOverlay.vue'

export default {
  components: {
    ScreenOverlay
  }
}
</script>
