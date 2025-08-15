<template>
  <svg :width="width" :height="height" class="lines" style="position:absolute;top:0;left:0;z-index:0;pointer-events:auto">
    <line
      v-for="arrow in arrows"
      :key="arrow.id"
      :x1="arrow.x1"
      :y1="arrow.y1"
      :x2="arrow.x2"
      :y2="arrow.y2"
      :stroke="arrow.id === selectedId ? '#ff5252' : '#888'"
      stroke-width="4"
      @click.stop="$emit('select', arrow.id)"
      style="cursor:pointer;opacity:0.7;"
    />
  </svg>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { StoryArrow } from '../stores/useStoryStore';

defineProps<{
  arrows: Array<StoryArrow & { x1: number; y1: number; x2: number; y2: number }>,
  selectedId?: string,
  width?: number | string,
  height?: number | string,
}>();

defineEmits<{ (e: 'select', id: string): void }>();
</script>

<style scoped>
.lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: auto;
}
</style>
