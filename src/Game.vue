<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { handleKeyDown } from '@/controls.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/constants/misc.js'
import { drawBoard, drawTetromino, drawGhost } from '@/game/draw.js'

import ScreenOverlay from '@/components/ScreenOverlay.vue'
import { useGameStore, useSettingsStore } from '@/stores'

import SettingsScreen from '@/components/SettingsScreen.vue'

const GAME = useGameStore()
const SETTINGS = useSettingsStore()
let canvas = ref(null)

const showSettings = ref(false)

const toggleSettings = () => {
  showSettings.value = !showSettings.value
}

function gameLoop(ctx, timestamp) {
  // I probably shouldn't be doing this inside the game loop,
  // but declaring it outside the loop causes a bug
  const TETROMINO = GAME.tetromino

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  drawBoard(ctx, GAME)

  if (GAME.state.stage === 'playing') {
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
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div
    class="game-container relative mx-auto"
    :style="{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }"
  >
    <ScreenOverlay v-if="GAME.state.stage === 'before'">
      <p class="text-3xl">
        Press<br />
        <span class="bg-indigo-500 px-2">SPACE</span><br />
        to start
      </p>
      <button @click="toggleSettings" class="mt-4 flex items-center gap-2">
        <i class="material-icons">settings</i> Settings
      </button>
    </ScreenOverlay>
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
