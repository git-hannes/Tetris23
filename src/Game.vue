<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { handleKeyDown } from "@/controls.js";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PREVIEW_CANVAS_WIDTH,
  PREVIEW_CANVAS_HEIGHT,
} from "@/constants/misc.js";
import {
  drawBoard,
  drawTetromino,
  drawGhost,
  drawPreviewTetromino,
} from "@/game/draw.js";

import { useGameStore, useSettingsStore } from "@/stores";

import {
  GameOverScreen,
  PauseScreen,
  ScreenOverlay,
  SettingsScreen,
  Sidebar,
  StartScreen,
} from "@/components";

const GAME = useGameStore();
const SETTINGS = useSettingsStore();
let canvas = ref(null);
let previewCanvas = ref(null);
let lastAnimationFrameTime = 0;

const showSettings = ref(false);
const showCollapsible = ref(false);

const toggleCollapsible = () => {
  showCollapsible.value = !showCollapsible.value;
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

function gameLoop(ctx, previewCtx, timestamp) {
  const deltaTime = timestamp - lastAnimationFrameTime;
  lastAnimationFrameTime = timestamp;

  const TETROMINO = GAME.tetromino;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBoard(ctx, GAME);

  if (GAME.state.stage === "playing" && !GAME.state.paused) {
    GAME.state.timer += deltaTime;

    drawTetromino(ctx, TETROMINO.current, TETROMINO.current.shape);
    drawGhost(ctx, GAME, TETROMINO.current, SETTINGS);
    drawPreviewTetromino(previewCtx, GAME.tetromino.next);

    const fallingSpeed = 1000 - GAME.stats.level * 50;
    if (timestamp - TETROMINO.lastDropTime > fallingSpeed) {
      TETROMINO.current.move("DOWN");
      TETROMINO.lastDropTime = timestamp;
    }
  }

  requestAnimationFrame(gameLoop.bind(null, ctx, previewCtx));
}

onMounted(() => {
  const ctx = canvas.value.getContext("2d");
  const previewCtx = previewCanvas.value.getContext("2d");
  gameLoop(ctx, previewCtx, 0);

  window.addEventListener("keydown", (event) => handleKeyDown(event, showSettings));
});

onUnmounted(() => {
  window.removeEventListener("keydown", (event) => handleKeyDown(event, showSettings));
});
</script>

<template>
  <div class="grid grid-cols-[3fr,1fr] gap-2">
    <div class="game-container relative" :style="{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }">
      <StartScreen v-if="GAME.state.stage === 'before'" @openSettings="toggleSettings" />
      <PauseScreen v-if="GAME.state.paused" @openSettings="toggleSettings" />

      <GameOverScreen v-if="GAME.state.stage === 'gameOver'" />

      <ScreenOverlay v-if="showSettings">
        <SettingsScreen @close="toggleSettings" />
      </ScreenOverlay>
      <canvas id="previewCanvas" ref="previewCanvas" :width="PREVIEW_CANVAS_WIDTH"
        :height="PREVIEW_CANVAS_HEIGHT"></canvas>
      <canvas id="boardCanvas" ref="canvas" :width="CANVAS_WIDTH" :height="CANVAS_HEIGHT"></canvas>
    </div>
    <Sidebar v-show="GAME.state.stage !== 'before'">
      <button @click="toggleCollapsible">
        <span v-show="!showCollapsible" class="material-icons text-xl">more_horiz</span>
        <span v-show="showCollapsible" class="material-icons text-xl">expand_less</span>
      </button>

      <div v-show="showCollapsible"></div>
    </Sidebar>
  </div>
</template>
