<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { handleKeyDown } from "@/controls.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, BLOCK_SIZE as BS } from "@/constants/misc.js";
import { Ghost } from "@/logic/tetromino.js";

import ScreenOverlay from "@/components/ScreenOverlay.vue";
import { useGameStore, useSettingsStore } from "@/stores";
import { drawCell } from "@/logic/utils.js";

const GAME = useGameStore();
const SETTINGS = useSettingsStore();
let canvas = ref(null);

function drawBoard(ctx) {
  const board = GAME.state.board;
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.cols; col++) {
      const cell = board.boardMatrix[row][col];
      drawCell(ctx, col, row, cell ? cell.color : "black");
    }
  }
}

function drawTetromino(ctx) {
  const TETROMINO = GAME.tetromino.current;
  const SHAPE = TETROMINO.shape;

  for (let row = 0; row < SHAPE.length; row++) {
    for (let col = 0; col < SHAPE[row].length; col++) {
      if (SHAPE[row][col]) {
        drawCell(
          ctx,
          TETROMINO.position.x + col,
          TETROMINO.position.y + row,
          TETROMINO.data.color
        );
      }
    }
  }
}

function drawGhostOutline(ctx, x, y, row, col, shape) {
  ctx.beginPath();

  if (row === 0 || !shape[row - 1][col]) {
    ctx.moveTo(x, y);
    ctx.lineTo(x + BS, y);
  }
  if (row === shape.length - 1 || !shape[row + 1][col]) {
    ctx.moveTo(x, y + BS);
    ctx.lineTo(x + BS, y + BS);
  }
  if (col === 0 || !shape[row][col - 1]) {
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + BS);
  }
  if (col === shape[row].length - 1 || !shape[row][col + 1]) {
    ctx.moveTo(x + BS, y);
    ctx.lineTo(x + BS, y + BS);
  }

  ctx.stroke();
}

function drawGhost(ctx, TETROMINO) {
  if (!SETTINGS.showGhostPiece || GAME.state.stage !== "playing") return;

  const ghost = new Ghost(TETROMINO, GAME.state.board);
  const SHAPE = ghost.shape;

  // Move the ghost down until it collides
  while (!ghost.checkCollision(0, 1)) {
    ghost.position.y += 1;
  }

  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;

  for (let row = 0; row < SHAPE.length; row++) {
    for (let col = 0; col < SHAPE[row].length; col++) {
      if (SHAPE[row][col]) {
        const x = (ghost.position.x + col) * BS;
        const y = (ghost.position.y + row) * BS;

        drawGhostOutline(ctx, x, y, row, col, SHAPE);
      }
    }
  }

  ctx.globalAlpha = 1;
}

function gameLoop(ctx, timestamp) {
  const TETROMINO = GAME.tetromino.current;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBoard(ctx);

  if (GAME.state.stage === "playing") {
    drawTetromino(ctx, TETROMINO);
    drawGhost(ctx, TETROMINO);

    const fallingSpeed = 1000 - GAME.state.level * 50;
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
