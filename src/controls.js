import { useGameStore } from '@/stores'

export function handleKeyDown(event, showSettings) {
  const GAME = useGameStore()

  // ignore keypresses if settings are shown
  if (showSettings.value) return

  // start game
  if (event.code === 'Space' && GAME.state.stage === 'before') {
    event.preventDefault()
    GAME.startGame()
    return
  }

  // pause game
  if (event.code === 'Escape' || event.code === 'KeyP') {
    GAME.togglePause()
    return
  }

  // restart game
  if (GAME.state.stage === 'gameOver' && event.code === 'Enter') {
    event.preventDefault()
    GAME.resetGame()
    GAME.startGame()
    return
  }

  // from here on only if game.stage == playing and game is not paused
  if (GAME.state.stage !== 'playing' || GAME.state.paused) return

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
      GAME.tetromino.current.rotate(1) // Rotate clockwise
      break
    case 'KeyC':
      event.preventDefault()
      GAME.tetromino.current.rotate(-1) // Rotate counterclockwise
      break
    case 'Space':
      event.preventDefault()
      GAME.tetromino.current.hardDrop()
      break
  }
}
