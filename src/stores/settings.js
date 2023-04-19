import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const showGhostPiece = reactive(true)
  const showNextPiece = reactive(true)

  //   function toggleGhostPiece() {
  //     showGhostPiece.value = !showGhostPiece.value
  //   }

  return {
    showGhostPiece,
    showNextPiece
    // toggleGhostPiece
  }
})
