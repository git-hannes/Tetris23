// controls.js
import { useGameStore } from '@/stores/game.js'

export function handleKeyDown(event) {
  const GAME = useGameStore()

  if (event.code === 'Space' && GAME.state.stage !== 'playing') {
    event.preventDefault()
    GAME.startGame()
  }

  if (GAME.state.stage !== 'playing') return

  switch (event.code) {
    case 'ArrowLeft':
      event.preventDefault()
      GAME.tetromino.current.move('LEFT')
      break
    case 'ArrowRight':
      event.preventDefault()
      GAME.tetromino.current.move('RIGHT')
      break
    case 'ArrowDown':
      event.preventDefault()
      GAME.tetromino.current.move('DOWN')
      break
    case 'ArrowUp':
      event.preventDefault()
      GAME.tetromino.current.rotate()
      break
  }
}
