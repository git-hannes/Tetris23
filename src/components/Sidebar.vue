<script setup>
import { ref } from 'vue'
import { Field } from '@/components'
import { Timer } from '@/components'
import { useGameStore } from '@/stores'

const GAME = useGameStore()

const showCollapsible = ref(false)

const toggleCollapsible = () => {
  showCollapsible.value = !showCollapsible.value
}
</script>

<template>
  <div class="sidebar">
    <Timer />
    <Field label="Level" :value="GAME.stats.level" />
    <Field label="Lines" :value="GAME.stats.lines" />
    <button @click="toggleCollapsible">
      <span v-show="!showCollapsible" class="material-icons text-xl"
        >more_horiz</span
      >
      <span v-show="showCollapsible" class="material-icons text-xl"
        >expand_less</span
      >
    </button>

    <div v-show="showCollapsible">
      <Field label="Drought" :value="GAME.stats.drought" />
      <Field label="TRT" :value="GAME.stats.tetrisRate" />
    </div>
  </div>
</template>
