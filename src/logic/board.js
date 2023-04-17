export class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.boardMatrix = this.createEmptyBoard()
  }

  createEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
  }

  clearLines() {
    let linesCleared = 0

    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.boardMatrix[row].every((cell) => cell.value)) {
        linesCleared++
        this.boardMatrix.splice(row, 1)
        this.boardMatrix.unshift(Array(this.cols).fill(0))
        row++ // Check the same row index again, as it now contains the next row after splice
      }
    }

    return linesCleared
  }
}
