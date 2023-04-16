<script setup>
import { useGameStore } from '@/stores/game'
import GameCanvas from '@/components/GameCanvas.vue'

const game = useGameStore()
</script>

<template>
  <GameCanvas />
</template>
