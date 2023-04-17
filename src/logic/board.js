export class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.boardMatrix = this.createEmptyBoard()
  }

  createEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
  }
}
