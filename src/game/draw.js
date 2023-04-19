import {
  BLOCK_SIZE as BS,
  PREVIEW_CANVAS_WIDTH,
  PREVIEW_CANVAS_HEIGHT
} from '@/constants/misc.js'
import { Ghost } from '@/game/tetromino.js'
import { drawCell } from '@/game/utils.js'

export function drawBoard(ctx, GAME) {
  const board = GAME.state.board
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.cols; col++) {
      const cell = board.boardMatrix[row][col]
      drawCell(ctx, col, row, cell ? cell.color : 'black')
    }
  }
}

export function drawTetromino(ctx, TETROMINO, SHAPE) {
  for (let row = 0; row < SHAPE.length; row++) {
    for (let col = 0; col < SHAPE[row].length; col++) {
      if (SHAPE[row][col]) {
        drawCell(
          ctx,
          TETROMINO.position.x + col,
          TETROMINO.position.y + row,
          TETROMINO.data.color
        )
      }
    }
  }
}

export function drawNextTetromino(ctx, nextTetromino) {
  if (!nextTetromino) return

  const {
    shape,
    type,
    data: { color }
  } = nextTetromino
  const isIPiece = type === 'I'
  const maxSize = isIPiece ? PREVIEW_CANVAS_WIDTH / shape[0].length : 20
  const cellSize = Math.min(maxSize, PREVIEW_CANVAS_HEIGHT / shape.length)

  ctx.clearRect(0, 0, PREVIEW_CANVAS_WIDTH, PREVIEW_CANVAS_HEIGHT)

  shape.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell) drawCell(ctx, cIdx, rIdx, color, cellSize, cellSize)
    })
  })
}

export function drawGhost(ctx, GAME, TETROMINO, SETTINGS) {
  if (!SETTINGS.showGhostPiece || GAME.state.stage !== 'playing') return

  const ghost = new Ghost(TETROMINO, GAME.state.board)
  const SHAPE = ghost.shape

  // Move the ghost down until it collides
  while (!ghost.checkCollision(0, 1)) {
    ghost.position.y += 1
  }

  ctx.globalAlpha = 0.5
  ctx.strokeStyle = '#ddd'
  ctx.lineWidth = 1

  for (let row = 0; row < SHAPE.length; row++) {
    for (let col = 0; col < SHAPE[row].length; col++) {
      if (SHAPE[row][col]) {
        const x = (ghost.position.x + col) * BS
        const y = (ghost.position.y + row) * BS

        drawGhostOutline(ctx, x, y, row, col, SHAPE)
      }
    }
  }

  ctx.globalAlpha = 1
}

export function drawGhostOutline(ctx, x, y, row, col, shape) {
  ctx.beginPath()

  if (row === 0 || !shape[row - 1][col]) {
    ctx.moveTo(x, y)
    ctx.lineTo(x + BS, y)
  }
  if (row === shape.length - 1 || !shape[row + 1][col]) {
    ctx.moveTo(x, y + BS)
    ctx.lineTo(x + BS, y + BS)
  }
  if (col === 0 || !shape[row][col - 1]) {
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + BS)
  }
  if (col === shape[row].length - 1 || !shape[row][col + 1]) {
    ctx.moveTo(x + BS, y)
    ctx.lineTo(x + BS, y + BS)
  }

  ctx.stroke()
}
