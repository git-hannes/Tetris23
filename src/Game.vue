<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { handleKeyDown } from "@/controls.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "@/constants/misc.js";
import { drawBoard, drawTetromino, drawGhost } from "@/game/draw.js";

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
let lastAnimationFrameTime = 0;

const showSettings = ref(false);
const showCollapsible = ref(false);

const toggleCollapsible = () => {
  showCollapsible.value = !showCollapsible.value;
};

const toggleSettings = () => {
  showSettings.value = !showSettings.value;
};

function gameLoop(ctx, timestamp) {
  const deltaTime = timestamp - lastAnimationFrameTime;
  lastAnimationFrameTime = timestamp;

  const TETROMINO = GAME.tetromino;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBoard(ctx, GAME);

  if (GAME.state.stage === "playing" && !GAME.state.paused) {
    GAME.state.timer += deltaTime;

    drawTetromino(ctx, TETROMINO.current, TETROMINO.current.shape);
    drawGhost(ctx, GAME, TETROMINO.current, SETTINGS);

    const fallingSpeed = 1000 - GAME.stats.level * 50;
    if (timestamp - TETROMINO.lastDropTime > fallingSpeed) {
      TETROMINO.current.move("DOWN");
      TETROMINO.lastDropTime = timestamp;
    }
  }

  requestAnimationFrame(gameLoop.bind(null, ctx));
}

onMounted(() => {
  const ctx = canvas.value.getContext("2d");
  gameLoop(ctx, 0);
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
