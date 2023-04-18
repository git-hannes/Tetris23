<script setup>
import { Field } from '@/components'
import { useGameStore } from '@/stores'

const GAME = useGameStore()
</script>

<template>
  <Field label="Lines" :value="GAME.state.lines" />
</template>
