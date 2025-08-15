<template>
  <div
    class="node"
    @click.stop="props.click(props.node.id)"
    :style="{
      borderWidth: props.selected ? '5px' : '3px',
      paddingLeft: props.selected ? '8px' : '10px',
      borderColor: props.node.color || '#ccc',
      position: 'absolute',
      left: (props.x ?? 0) + 'px',
      top: (props.y ?? 0) + 'px',
    }"
  >
    {{ props.node.title || "(제목 없음)" }}
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { type StoryNode } from "../stores/useStoryStore";

const props = defineProps<{
  selected?: boolean;
  node: StoryNode;
  click: (id: string) => void;
  x?: number;
  y?: number;
}>();
</script>
<style scoped>
.node {
  padding: 10px;
  border-left: 3px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
  max-width: 200px;
  max-height: 100px;
  display: flex;
}
</style>
