<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { handleKeyDown } from '@/controls.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT, BLOCK_SIZE } from '@/constants/board.js'
import { useGameStore } from '@/stores/game.js'

let canvas = ref(null)
const game = useGameStore()

function drawBoard(ctx) {
  const board = game.state.board
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.cols; col++) {
      ctx.fillStyle = board.boardMatrix[row][col] ? 'blue' : 'white'
      ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
      ctx.strokeStyle = 'black'
      ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
    }
  }
}

function drawTetromino(ctx) {
  const tetromino = game.tetromino.current
  const shape = tetromino.shape

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        ctx.fillStyle = tetromino.data.color
        ctx.fillRect(
          (tetromino.position.x + col) * BLOCK_SIZE,
          (tetromino.position.y + row) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        )
        ctx.strokeStyle = 'black'
        ctx.strokeRect(
          (tetromino.position.x + col) * BLOCK_SIZE,
          (tetromino.position.y + row) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        )
      }
    }
  }
}

let lastDropTime = 0

function gameLoop(ctx, timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  drawBoard(ctx)

  if (game.state.stage === 'playing') {
    drawTetromino(ctx)

    const fallingSpeed = 1000 - game.state.level * 50 // Change this formula if needed
    if (timestamp - lastDropTime > fallingSpeed) {
      game.tetromino.current.move('DOWN')
      lastDropTime = timestamp
    }
  }

  requestAnimationFrame(gameLoop.bind(null, ctx))
}

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  gameLoop(ctx, 0) // Pass 0 as the initial timestamp
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <button @click="game.startGame">Start Game</button>
  <canvas id="boardCanvas" ref="canvas" width="300" height="600"></canvas>
</template>
