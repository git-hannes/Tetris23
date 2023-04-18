<script setup>
import { useSettingsStore } from '@/stores'

const SETTINGS = useSettingsStore()
</script>

<template>
  <div class="w-full h-full bg-black">
    <div class="h-full grid place-content-center">
      <h2 class="text-2xl mb-4">Settings</h2>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          class="form-checkbox"
          v-model="SETTINGS.showGhostPiece"
        />
        <span class="ml-2">Show Ghost Piece</span>
      </label>
      <button
        @click="$emit('close')"
        class="absolute top-0 right-0 p-6 text-xl"
      >
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
</template>
