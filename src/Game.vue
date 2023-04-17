<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { handleKeyDown } from "@/controls.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants/misc.js";
import { drawBoard, drawTetromino, drawGhost } from "@/game/draw.js";

import ScreenOverlay from "@/components/ScreenOverlay.vue";
import { useGameStore, useSettingsStore } from "@/stores";

const GAME = useGameStore();
const SETTINGS = useSettingsStore();
let canvas = ref(null);

function gameLoop(ctx, timestamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBoard(ctx, GAME);

  if (GAME.state.stage === "playing") {
    drawTetromino(ctx, GAME.tetromino.current, GAME.tetromino.current.shape);
    drawGhost(ctx, GAME, GAME.tetromino.current, SETTINGS);

    const fallingSpeed = 1000 - GAME.state.level * 50;
    if (timestamp - GAME.tetromino.lastDropTime > fallingSpeed) {
      GAME.tetromino.current.move("DOWN");
      GAME.tetromino.lastDropTime = timestamp;
    }
  }

  requestAnimationFrame(gameLoop.bind(null, ctx));
}

onMounted(() => {
  const ctx = canvas.value.getContext("2d");
  gameLoop(ctx, 0);
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="game-container relative mx-auto" :style="{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }">
    <ScreenOverlay v-if="GAME.state.stage === 'before'">
      <p>Press <span class="bg-indigo-500 px-2">SPACE</span> to start</p>
    </ScreenOverlay>
    <ScreenOverlay v-if="GAME.state.stage === 'after'">
      <p>
        <span class="text-3xl">Game Over</span> <br />Press
        <span class="bg-orange-500 px-2">ENTER</span> to start
      </p>
    </ScreenOverlay>
    <canvas id="boardCanvas" ref="canvas" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"></canvas>
  </div>
</template>
