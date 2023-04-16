import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Board } from '@/logic/board.js'
import { Tetromino } from '@/logic/tetromino.js'

function createInitialState() {
  return {
    stage: 'before', // 'before' | 'playing' | 'after'
    score: 0,
    level: 0,
    lines: 0,
    board: new Board(20, 10),
    currentTetromino: null,
    nextTetromino: null
  }
}

export const useGameStore = defineStore('game', () => {
  const state = reactive(createInitialState())

  function startGame() {
    state.currentTetromino = new Tetromino(state.board.grid)
    state.nextTetromino = new Tetromino(state.board.grid)
    state.stage = 'playing'
  }

  function resetGame() {
    Object.assign(state, createInitialState())
  }

  // Implement other game-related methods and actions here

  return {
    state,
    startGame,
    resetGame
  }
})
