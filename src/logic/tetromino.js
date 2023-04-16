import TETROMINOS from '@/constants/tetrominos.js'
import { BOARD_ROWS, BOARD_COLS, LOCK_DELAY } from '@/constants/board.js'
import WALL_KICK_DATA from '@/constants/wallKickData.js'

function getRandomTetrominoType() {
  const types = Object.keys(TETROMINOS)
  return types[Math.floor(Math.random() * types.length)]
}

function getRotatedMatrix(matrix, rotations) {
  let result = matrix

  for (let r = 0; r < rotations; r++) {
    const N = result.length - 1
    const temp = Array.from({ length: result.length }, () =>
      Array(result.length).fill(0)
    )
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        temp[i][j] = result[N - j][i]
      }
    }
    result = temp
  }

  return result
}

const DIRECTION = {
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 }
}

export class Tetromino {
  constructor(board) {
    this.board = board
    this.type = getRandomTetrominoType()
    this.data = TETROMINOS[this.type]
    this.rotation = 0
    this.shape = getRotatedMatrix(this.data.shape, this.rotation) // Initialize the shape with the rotated matrix
    this.position = { x: Math.floor(BOARD_COLS / 2) - 1, y: 0 }
  }

  rotate() {
    const nextRotation = (this.rotation + 1) % 4
    const rotatedShape = getRotatedMatrix(this.data.shape, nextRotation)

    if (this.tryWallKick(this.rotation, nextRotation, rotatedShape)) {
      this.rotation = nextRotation
      this.shape = rotatedShape
    }
  }

  tryWallKick(prevRotation, nextRotation, rotatedShape) {
    const kicks = WALL_KICK_DATA[this.type][prevRotation * 2 + nextRotation]
    for (const kick of kicks) {
      const offsetX = kick[0]
      const offsetY = kick[1]

      if (!this.checkCollision(offsetX, offsetY, rotatedShape)) {
        this.position.x += offsetX
        this.position.y += offsetY
        return true
      }
    }
    return false
  }

  move(direction) {
    const { x, y } = DIRECTION[direction]

    if (!this.checkCollision(x, y)) {
      this.position.x += x
      this.position.y += y
      return true
    } else console.log('collision')
    return false
  }

  checkCollision(offsetX, offsetY, matrix = this.shape) {
    const { x: posX, y: posY } = this.position
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (
          matrix[row][col] &&
          (this.board.boardMatrix[row + posY + offsetY] &&
            this.board.boardMatrix[row + posY + offsetY][
              col + posX + offsetX
            ]) !== 0
        ) {
          return true
        }
      }
    }
    return false
  }

  hardDrop() {
    let cellsDropped = 0
    while (this.move('DOWN')) {
      cellsDropped++
    }
    return cellsDropped
  }

  lock() {
    const { x: posX, y: posY } = this.position
    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col]) {
          this.board.boardMatrix[row + posY][col + posX] = this.shape[row][col]
        }
      }
    }
  }
}
