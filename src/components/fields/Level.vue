<script setup>
import { Field } from '@/components'
import { useGameStore } from '@/stores'

const GAME = useGameStore()
</script>

<template>
  <Field label="Level" :value="GAME.stats.level" />
</template>
