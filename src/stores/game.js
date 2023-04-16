import { reactive } from 'vue'
import { defineStore } from 'pinia'

function createInitialState() {
  return {
    stage: 'before', // 'before' | 'playing' | 'after'
    score: 0,
    level: 0,
    lines: 0,
    currentTetromino: null,
    nextTetromino: null
  }
}

export const useGameStore = defineStore('game', () => {
  const status = reactive(createInitialState())

  return {
    status
  }
})
