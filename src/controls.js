import { useGameStore } from '@/stores'

export function handleKeyDown(event) {
  const GAME = useGameStore()

  if (event.code === 'Space' && GAME.state.stage === 'before') {
    event.preventDefault()
    GAME.startGame()
    return
  }

  if (GAME.state.stage === 'after' && event.code === 'Enter') {
    event.preventDefault()
    GAME.resetGame()
    GAME.startGame()
    return
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
    case 'Space':
      event.preventDefault()
      GAME.tetromino.current.hardDrop()
      break
  }
}
