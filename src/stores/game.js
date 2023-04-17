// game.js
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Board } from '@/logic/board.js'
import { Tetromino } from '@/logic/tetromino.js'
import { COLS, ROWS } from '@/constants/misc.js'

function createInitialState() {
  return {
    stage: 'before', // 'before' | 'playing' | 'after'
    score: 0,
    level: 0,
    lines: 0,
    board: new Board(ROWS, COLS)
  }
}

export const useGameStore = defineStore('game', () => {
  const state = reactive(createInitialState())

  const tetromino = reactive({
    current: null,
    next: null,
    lastDropTime: 0
  })

  function startGame() {
    state.stage = 'playing'
    tetromino.current = new Tetromino(state.board)
    tetromino.next = new Tetromino(state.board)
    tetromino.lastDropTime = performance.now() // Update this line
  }

  function resetGame() {
    Object.assign(state, createInitialState())
  }

  function spawnNewTetromino() {
    tetromino.current = tetromino.next
    tetromino.next = new Tetromino(state.board)

    // Check if the newly spawned Tetromino is colliding with the existing board matrix
    if (tetromino.current.isColliding()) {
      state.stage = 'after'
    }
  }

  // Implement other game-related methods and actions here

  return {
    state,
    startGame,
    resetGame,
    tetromino,
    spawnNewTetromino
  }
})
