// game.js
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Board } from '@/game/board.js'
import { Tetromino } from '@/game/tetromino.js'
import { COLS, ROWS } from '@/constants/misc.js'

function createInitialState() {
  return {
    stage: 'before', // 'before' | 'playing' | 'gameOver'
    paused: false,
    timer: 0,
    board: new Board(ROWS, COLS)
  }
}

export const useGameStore = defineStore('game', () => {
  const state = reactive(createInitialState())

  const stats = reactive({
    lines: 0,
    level: 1,
    score: 0,
    drought: 0,
    tetrisRate: 0,
    lineClearCount: 0,
    tetrisCount: 0
  })

  const tetromino = reactive({
    current: null,
    next: null,
    lastDropTime: 0
  })

  function startGame() {
    state.timer = 0
    state.stage = 'playing'
    tetromino.current = new Tetromino(state.board)
    tetromino.next = new Tetromino(state.board)
    tetromino.lastDropTime = performance.now()
  }

  function togglePause() {
    if (state.stage === 'playing') {
      state.paused = !state.paused
    }
  }

  function resetGame() {
    Object.assign(state, createInitialState())
  }

  function spawnNewTetromino() {
    tetromino.current = tetromino.next
    tetromino.next = new Tetromino(state.board)

    // Update drought
    if (tetromino.current.type === 'I') {
      stats.drought = 0
    } else {
      stats.drought++
    }

    // Check if the newly spawned Tetromino is colliding with the existing board matrix
    if (tetromino.current.isColliding()) {
      state.stage = 'gameOver'
    }
  }

  function updateTetrisRate() {
    if (stats.lineClearCount === 0) {
      stats.tetrisRate = 0
    } else {
      stats.tetrisRate = Math.round(
        (stats.tetrisCount / stats.lineClearCount) * 100
      )
    }
  }

  return {
    state,
    stats,
    startGame,
    togglePause,
    resetGame,
    tetromino,
    spawnNewTetromino,
    updateTetrisRate
  }
})
