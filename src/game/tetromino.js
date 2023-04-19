import TETROMINOS from '@/constants/shapes.js'
import { DIRECTIONS, INITIAL_POSITION } from '@/constants/misc.js'
import WALL_KICK_DATA from '@/constants/wallKickData.js'
import { getRandomTetrominoType, getRotatedMatrix } from '@/game/utils.js'

import { useGameStore } from '@/stores'

export class Tetromino {
  constructor(board) {
    this.board = board
    this.type = getRandomTetrominoType()
    this.data = TETROMINOS[this.type]
    this.rotation = 0
    this.shape = getRotatedMatrix(this.data.shape, this.rotation)
    this.position = { ...INITIAL_POSITION }
    this.GAME = useGameStore()
  }

  move(direction, isHardDrop = false) {
    const { x, y } = DIRECTIONS[direction]

    if (!this.checkCollision(x, y)) {
      this.position.x += x
      this.position.y += y
      return true
    } else {
      if (direction === 'DOWN' && !isHardDrop) {
        this.lock()
        this.GAME.spawnNewTetromino()
      }
      return false
    }
  }

  hardDrop() {
    let cellsDropped = 0
    while (this.move('DOWN', true)) {
      cellsDropped++
    }
    this.lock()
    this.GAME.spawnNewTetromino()
    return cellsDropped
  }

  rotate(direction) {
    if (this.type === 'O') return // nothing to do here

    const nextRotation = (this.rotation + direction + 4) % 4
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

  isColliding() {
    return this.checkCollision(0, 0, this.shape)
  }

  lock() {
    const { x: posX, y: posY } = this.position

    for (let row = 0; row < this.shape.length; row++) {
      for (let col = 0; col < this.shape[row].length; col++) {
        if (this.shape[row][col]) {
          this.board.boardMatrix[row + posY][col + posX] = {
            value: this.shape[row][col],
            color: this.data.color
          }
        }
      }
    }
    const linesCleared = this.board.clearLines()

    // Update game state based on the number of cleared lines (if needed)
    if (linesCleared) {
      // Update score
    }
  }
}

export class Ghost extends Tetromino {
  constructor(currentTetromino, board) {
    super(board)
    this.type = currentTetromino.type
    this.data = currentTetromino.data
    this.rotation = currentTetromino.rotation
    this.shape = currentTetromino.shape
    this.position = { ...currentTetromino.position }
  }
}
