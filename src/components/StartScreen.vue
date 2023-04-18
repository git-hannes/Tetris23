<script setup>
import ScreenOverlay from '@/components/ScreenOverlay.vue'
</script>

<template>
  <ScreenOverlay>
    <h1 class="tetris-font text-3xl text-green-400 mt-8">Tetris</h1>
    <p class="text-3xl">
      Press<br />
      <span class="bg-indigo-500 px-2">SPACE</span><br />
      to start
    </p>
    <button @click="$emit('openSettings')" class="mt-4 flex items-center gap-2">
      <i class="material-icons">settings</i> Settings
    </button>
  </ScreenOverlay>
</template>
