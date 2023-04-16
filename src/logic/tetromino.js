import TETROMINOS from '@/constants/tetrominos.js'
import { BOARD_ROWS, BOARD_COLS } from '@/constants/board.js'

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
    this.position = { x: Math.floor(BOARD_COLS / 2) - 1, y: 0 }
  }

  rotate() {
    const rotatedData = getRotatedMatrix(this.data[this.rotation])
    const nextRotation = (this.rotation + 1) % 4

    if (!this.checkCollision(0, 0, rotatedData)) {
      this.rotation = nextRotation
      this.data = rotatedData
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

  // You can add other methods related to the Tetromino operation if needed
}
