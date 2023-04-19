import TETROMINOS from '@/constants/shapes.js'
import { BLOCK_SIZE as BS } from '@/constants/misc.js'

/*
 * tetromino helpers
 */

export function getRandomTetrominoType() {
  const types = Object.keys(TETROMINOS)
  return types[Math.floor(Math.random() * types.length)]
}

export function getRotatedMatrix(matrix, rotations) {
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

/*
 * drawing helpers
 */
export function drawCell(ctx, x, y, color, cellWidth = BS, cellHeight = BS) {
  ctx.fillStyle = color
  ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)

  // draw grid lines
  ctx.strokeStyle = '#111111'
  ctx.strokeRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight)
}
