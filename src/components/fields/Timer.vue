<script setup>
import { Field } from '@/components'
import { computed } from 'vue'
import { useGameStore } from '@/stores'

const GAME = useGameStore()

const formattedTimer = computed(() => {
  const totalSeconds = Math.floor(GAME.state.timer / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
})
</script>

<template>
  <Field label="Time" :value="formattedTimer" />
</template>
