import TETROMINOS from '@/constants/tetrominos.js'
import { BOARD_ROWS, BOARD_COLS, LOCK_DELAY } from '@/constants/board.js'
import WALL_KICK_DATA from '@/constants/wallKickData.js'

function getRandomTetrominoType() {
  const types = Object.keys(TETROMINOS)
  return types[Math.floor(Math.random() * types.length)]
}

function getRotatedMatrix(matrix) {
  const N = matrix.length - 1
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]))
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
    this.shape = this.data.shape
    this.position = { x: Math.floor(BOARD_COLS / 2) - 1, y: 0 }
  }

  rotate() {
    const nextRotation = (this.rotation + 1) % 4
    const rotatedShape = getRotatedMatrix(this.data.shape[nextRotation])

    if (
      !this.checkCollision(0, 0, rotatedShape) ||
      this.tryWallKicks(nextRotation, rotatedShape)
    ) {
      this.rotation = nextRotation
      this.shape = rotatedShape
    }
  }

  tryWallKicks(nextRotation, rotatedShape) {
    const wallKickData =
      this.type === 'I' ? WALL_KICK_DATA.I : WALL_KICK_DATA.default
    const currentOffsets = wallKickData[this.rotation]
    const nextOffsets = wallKickData[nextRotation]

    for (let i = 0; i < currentOffsets.length; i++) {
      const offsetX = nextOffsets[i].x - currentOffsets[i].x
      const offsetY = nextOffsets[i].y - currentOffsets[i].y

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
    console.log(x, y)

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
    while (this.move(0, 1)) {
      cellsDropped++
    }
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
