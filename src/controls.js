import { useGameStore } from '@/stores/game.js'

export function handleKeyDown({ code }) {
  const GAME = useGameStore()
  const TETROMINO = GAME.tetromino.current

  switch (code) {
    case 'ArrowLeft':
    case 'KeyA':
      TETROMINO.move('LEFT')
      break

    case 'ArrowRight':
    case 'KeyD':
      TETROMINO.move('RIGHT')
      break

    case 'ArrowDown':
    case 'KeyS':
      TETROMINO.move('DOWN')
      break

    case 'Space':
      TETROMINO.hardDrop()
      break

    case 'ArrowUp':
    case 'KeyW':
      TETROMINO.rotate()
      break

    default:
      break
  }
}
