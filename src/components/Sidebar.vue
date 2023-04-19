<script setup>
import { ref, onMounted, watch } from "vue";
import { Field, Timer } from "@/components";
import { useGameStore } from "@/stores";
import { PREVIEW_CANVAS_WIDTH, PREVIEW_CANVAS_HEIGHT } from "@/constants/misc.js";
import { drawNextTetromino } from "@/game/draw.js";

const GAME = useGameStore();

const showCollapsible = ref(false);
const previewCanvas = ref(null);

const toggleCollapsible = () => {
  showCollapsible.value = !showCollapsible.value;
};

const drawNext = () => {
  const previewCtx = previewCanvas.value.getContext("2d");
  drawNextTetromino(previewCtx, GAME.tetromino.next);
};

onMounted(() => {
  watch(() => GAME.tetromino.next, drawNext, { immediate: true });
});
</script>

<template>
  <div class="sidebar flex flex-col items-start gap-2">
    <canvas id="previewCanvas" ref="previewCanvas" :width="PREVIEW_CANVAS_WIDTH" :height="PREVIEW_CANVAS_HEIGHT"></canvas>
    <Timer />
    <Field label="Level" :value="GAME.stats.level" />
    <Field label="Lines" :value="GAME.stats.lines" />
    <button @click="toggleCollapsible">
      <span v-show="!showCollapsible" class="material-icons text-xl text-green-400">more_horiz</span>
      <span v-show="showCollapsible" class="material-icons text-xl text-green-400">expand_less</span>
    </button>

    <div v-show="showCollapsible">
      <Field label="Drought" :value="GAME.stats.drought" />
      <Field label="TRT" :value="GAME.stats.tetrisRate" />
    </div>
  </div>
</template>
