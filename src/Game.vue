<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { handleKeyDown } from "@/controls.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, BLOCK_SIZE as BS } from "@/constants/misc.js";

import { Ghost } from "@/logic/tetromino.js";

import ScreenOverlay from "@/components/ScreenOverlay.vue";

import { useGameStore } from "@/stores/game.js";
import { useSettingsStore } from "@/stores/settings.js";

const GAME = useGameStore();
const SETTINGS = useSettingsStore();
let canvas = ref(null);

function drawBoard(ctx) {
  const board = GAME.state.board;
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.cols; col++) {
      const cell = board.boardMatrix[row][col];
      ctx.fillStyle = cell ? cell.color : "black";
      ctx.fillRect(col * BS, row * BS, BS, BS);

      // draw grid lines
      ctx.strokeStyle = "#444444";
      ctx.strokeRect(col * BS, row * BS, BS, BS);
    }
  }
}

function drawTetromino(ctx) {
  const TETROMINO = GAME.tetromino.current;
  const SHAPE = TETROMINO.shape;

  for (let row = 0; row < SHAPE.length; row++) {
    for (let col = 0; col < SHAPE[row].length; col++) {
      if (SHAPE[row][col]) {
        ctx.fillStyle = TETROMINO.data.color;
        ctx.fillRect(
          (TETROMINO.position.x + col) * BS,
          (TETROMINO.position.y + row) * BS,
          BS,
          BS
        );
        ctx.strokeStyle = "black";
        ctx.strokeRect(
          (TETROMINO.position.x + col) * BS,
          (TETROMINO.position.y + row) * BS,
          BS,
          BS
        );
      }
    }
  }
}

function drawGhost(ctx) {
  if (!SETTINGS.showGhostPiece || GAME.state.stage !== "playing") return;

  const ghost = new Ghost(GAME.tetromino.current, GAME.state.board);
  const SHAPE = ghost.shape;

  // Move the ghost down until it collides
  while (!ghost.checkCollision(0, 1)) {
    ghost.position.y += 1;
  }

  // Draw the ghost tetromino
  for (let row = 0; row < SHAPE.length; row++) {
    for (let col = 0; col < SHAPE[row].length; col++) {
      if (SHAPE[row][col]) {
        ctx.fillStyle = ghost.data.color;
        ctx.globalAlpha = 0.4;
        ctx.fillRect(
          (ghost.position.x + col) * BS,
          (ghost.position.y + row) * BS,
          BS,
          BS
        );
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "black";
        ctx.strokeRect(
          (ghost.position.x + col) * BS,
          (ghost.position.y + row) * BS,
          BS,
          BS
        );
      }
    }
  }
}

function gameLoop(ctx, timestamp) {
  const TETROMINO = GAME.tetromino.current;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBoard(ctx);

  if (GAME.state.stage === "playing") {
    drawTetromino(ctx);
    drawGhost(ctx); // Add this line to draw the ghost tetromino

    const fallingSpeed = 1000 - GAME.state.level * 50; // Change this formula if needed
    if (timestamp - GAME.tetromino.lastDropTime > fallingSpeed) {
      TETROMINO.move("DOWN");
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
