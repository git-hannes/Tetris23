import TETROMINOS from '@/constants/tetrominos.js'
import { BOARD_ROWS, BOARD_COLS, LOCK_DELAY } from '@/constants/board.js'

function getRandomTetrominoType() {
  const types = Object.keys(TETROMINOS)
  return types[Math.floor(Math.random() * types.length)]
}

function getRotatedMatrix(matrix) {
  const N = matrix.length - 1
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]))
  return result
}

export class Tetromino {
  constructor(board) {
    this.board = board
    this.type = getRandomTetrominoType()
    this.data = TETROMINOS[this.type]
    this.rotation = 0
    this.shape = this.data.shape // Change this line
    this.position = { x: Math.floor(BOARD_COLS / 2) - 1, y: 0 }
  }

  rotate() {
    const nextRotation = (this.rotation + 1) % 4
    const rotatedShape = getRotatedMatrix(this.shape[nextRotation])

    if (!this.checkCollision(0, 0, rotatedShape)) {
      this.rotation = nextRotation
      this.shape = this.data.shape[this.rotation]
    }
  }

  move(x, y) {
    if (!this.checkCollision(x, y)) {
      this.position.x += x
      this.position.y += y
      return true
    }
    return false
  }

  checkCollision(offsetX, offsetY, matrix = this.data[this.rotation]) {
    const { x: posX, y: posY } = this.position
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (
          matrix[row][col] &&
          (this.board[row + posY + offsetY] &&
            this.board[row + posY + offsetY][col + posX + offsetX]) !== 0
        ) {
          return true
        }
      }
    }
    return false
  }

  hardDrop() {
    let cellsDropped = 0
    while (this.move(0, 1)) {
      cellsDropped++
    }
    // Calculate the number of cells dropped for a hard drop
    this.hardDropScore(cellsDropped - 1) // Subtract 1 since the last move didn't count
  }

  lock() {
    const { x: posX, y: posY } = this.position
    for (let row = 0; row < this.data.length; row++) {
      for (let col = 0; col < this.data[row].length; col++) {
        if (this.data[row][col]) {
          this.board[row + posY][col + posX] = this.data[row][col]
        }
      }
    }
  }

  softDropScore() {
    // Add soft drop score implementation
  }

  hardDropScore(cellsDropped) {
    // Add hard drop score implementation
  }

  // You can add other methods related to the Tetromino operation if needed
}
