import { useGameStore } from '@/stores/game.js'

export function handleKeyDown({ code }) {
  const game = useGameStore()
  const tetromino = game.tetromino.current

  switch (code) {
    case 'ArrowLeft':
    case 'KeyA':
      tetromino.move('LEFT')
      break

    case 'ArrowRight':
    case 'KeyD':
      tetromino.move('RIGHT')
      break

    case 'ArrowDown':
    case 'KeyS':
      tetromino.move('DOWN')
      break

    case 'Space':
      tetromino.hardDrop()
      break

    case 'ArrowUp':
    case 'KeyW':
      tetromino.rotate()
      break

    default:
      break
  }
}
