<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { handleKeyDown } from '@/controls.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/constants/misc.js'
import { drawBoard, drawTetromino, drawGhost } from '@/game/draw.js'

import ScreenOverlay from '@/components/ScreenOverlay.vue'
import StartScreen from '@/components/StartScreen.vue'
import PauseScreen from '@/components/PauseScreen.vue'
import { useGameStore, useSettingsStore } from '@/stores'

import SettingsScreen from '@/components/SettingsScreen.vue'
import GameOverScreen from '@/components/GameOverScreen.vue'

const GAME = useGameStore()
const SETTINGS = useSettingsStore()
let canvas = ref(null)

const showSettings = ref(false)

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

function gameLoop(ctx, timestamp) {
  const TETROMINO = GAME.tetromino

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  drawBoard(ctx, GAME)

  if (GAME.state.stage === 'playing' && !GAME.state.paused) {
    drawTetromino(ctx, TETROMINO.current, TETROMINO.current.shape)
    drawGhost(ctx, GAME, TETROMINO.current, SETTINGS)

    const fallingSpeed = 1000 - GAME.state.level * 50
    if (timestamp - TETROMINO.lastDropTime > fallingSpeed) {
      TETROMINO.current.move('DOWN')
      TETROMINO.lastDropTime = timestamp
    }
  }

  requestAnimationFrame(gameLoop.bind(null, ctx))
}

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  gameLoop(ctx, 0)
  window.addEventListener('keydown', (event) =>
    handleKeyDown(event, showSettings)
  )
})

onUnmounted(() => {
  window.removeEventListener('keydown', (event) =>
    handleKeyDown(event, showSettings)
  )
})
</script>

<template>
  <div
    class="game-container relative mx-auto"
    :style="{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }"
  >
    <StartScreen
      v-if="GAME.state.stage === 'before'"
      @openSettings="toggleSettings"
    />
    <PauseScreen v-if="GAME.state.paused" @openSettings="toggleSettings" />

    <GameOverScreen v-if="GAME.state.stage === 'gameOver'" />

    <ScreenOverlay v-if="showSettings">
      <SettingsScreen @close="toggleSettings" />
    </ScreenOverlay>

    <canvas
      id="boardCanvas"
      ref="canvas"
      :width="CANVAS_WIDTH"
      :height="CANVAS_HEIGHT"
    ></canvas>
  </div>
</template>
