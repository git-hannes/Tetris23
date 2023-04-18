import { useGameStore } from '@/stores/game'

export class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.boardMatrix = this.createEmptyBoard()
    this.GAME = useGameStore()
  }

  createEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
  }

  clearLines() {
    const initialRowCount = this.boardMatrix.length
    this.boardMatrix = this.boardMatrix.filter(
      (row) => !row.every((cell) => cell.value)
    )
    const linesCleared = initialRowCount - this.boardMatrix.length

    while (this.boardMatrix.length < initialRowCount) {
      this.boardMatrix.unshift(Array(this.cols).fill(0))
    }

    if (linesCleared) {
      this.GAME.state.lines += linesCleared
    }

    return linesCleared
  }
}
