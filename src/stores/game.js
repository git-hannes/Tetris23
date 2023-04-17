// game.js
import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Board } from '@/logic/board.js'
import { Tetromino } from '@/logic/tetromino.js'
import { COLS, ROWS } from '@/constants/board.js'

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
    next: null
  })

  function startGame() {
    state.stage = 'playing'
    tetromino.current = new Tetromino(state.board)
    tetromino.next = new Tetromino(state.board)
  }

  function resetGame() {
    Object.assign(state, createInitialState())
  }

  function spawnNewTetromino() {
    tetromino.current = tetromino.next
    tetromino.next = new Tetromino(state.board)
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
