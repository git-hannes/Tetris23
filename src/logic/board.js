export class Board {
  constructor(rows, cols) {
    this.rows = rows
    this.cols = cols
    this.boardMatrix = this.createEmptyBoard()
  }

  createEmptyBoard() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(0))
  }

  isValidMove(tetromino, posX, posY) {
    const shape = tetromino.data[tetromino.rotation]

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (
          shape[y][x] &&
          (posY + y < 0 ||
            posX + x < 0 ||
            posX + x >= this.cols ||
            posY + y >= this.rows ||
            this.boardMatrix[posY + y][posX + x] !== 0)
        ) {
          return false
        }
      }
    }
    return true
  }

  lockPiece(tetromino, posX, posY) {
    const shape = tetromino.data[tetromino.rotation]

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          this.boardMatrix[posY + y][posX + x] = tetromino.type
        }
      }
    }
  }

  get grid() {
    return this.boardMatrix
  }

  clearLines() {
    let linesCleared = 0

    outer: for (let y = this.rows - 1; y >= 0; ) {
      for (let x = 0; x < this.cols; x++) {
        if (this.boardMatrix[y][x] === 0) {
          continue outer
        }
      }

      linesCleared++
      this.boardMatrix.splice(y, 1)
      this.boardMatrix.unshift(Array(this.cols).fill(0))
    }

    return linesCleared
  }
}
