<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { handleKeyDown } from "@/controls.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT, BLOCK_SIZE as BS } from "@/constants/misc.js";
import StartScreen from "@/components/StartScreen.vue";
import { useGameStore } from "@/stores/game.js";

const GAME = useGameStore();
let canvas = ref(null);

function drawBoard(ctx) {
  const board = GAME.state.board;
  for (let row = 0; row < board.rows; row++) {
    for (let col = 0; col < board.cols; col++) {
      const cell = board.boardMatrix[row][col];
      ctx.fillStyle = cell ? cell.color : "black";
      ctx.fillRect(col * BS, row * BS, BS, BS);
      ctx.strokeStyle = "#101010";
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

function gameLoop(ctx, timestamp) {
  const TETROMINO = GAME.tetromino.current;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBoard(ctx);

  if (GAME.state.stage === "playing") {
    drawTetromino(ctx);

    const fallingSpeed = 1000 - GAME.state.level * 50; // Change this formula if needed
    if (timestamp - GAME.tetromino.lastDropTime > fallingSpeed) {
      TETROMINO.move("DOWN");
      GAME.tetromino.lastDropTime = timestamp; // Update this line
    }
  }

  requestAnimationFrame(gameLoop.bind(null, ctx));
}

onMounted(() => {
  const ctx = canvas.value.getContext("2d");
  gameLoop(ctx, 0); // Pass 0 as the initial timestamp
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <StartScreen v-if="GAME.state.stage === 'before'" />
  <canvas id="boardCanvas" ref="canvas" width="300" height="600"></canvas>
</template>
