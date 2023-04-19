// board
export const ROWS = 20
export const COLS = 10
export const CANVAS_WIDTH = 300
export const CANVAS_HEIGHT = 600
export const PREVIEW_CANVAS_WIDTH = 100
export const PREVIEW_CANVAS_HEIGHT = 60
export const CANVAS_COLOR = '#11111'
export const BLOCK_SIZE = CANVAS_WIDTH / COLS

export const LOCK_DELAY = 500

export const DIRECTIONS = {
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 }
}

// tetrominos
export const INITIAL_POSITION = { x: Math.floor(COLS / 2) - 1, y: 0 }
