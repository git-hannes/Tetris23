import TETROMINOS from '@/constants/shapes.js'

/*
 * tetromino.js helpers
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
 * tetromino.js helpers end
 */
