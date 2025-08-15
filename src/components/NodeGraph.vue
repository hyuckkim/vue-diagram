<template>
  <div class="graph" @mousedown="onMouseDown" @click="unselect">
    <ArrowLines :arrows="lines" :width="'100%'" :height="'100%'" />
    <NodeBlock
      v-for="node in nodesWithPos"
      :key="node.id"
      :node="node"
      :click="() => store.selectNode(node.id)"
      :selected="node.id === store.selectedItem?.id"
      :style="{ position: 'absolute', left: node.x + 'px', top: node.y + 'px' }"
    >
      <NodeChildSet
        :node="node"
        :next="node.next"
        :click="(id) => store.selectArrow(id)"
        :add="() => store.addChildNode(node.id, story.id)"
        :selected="node.id === store.selectedItem?.id"
      />
    </NodeBlock>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  useStoryStore,
  type Story,
} from "../stores/useStoryStore";
import NodeBlock from "./NodeBlock.vue";
import { getDagreLayout } from "../utils/dagreLayout";
import ArrowLines from "./ArrowLines.vue";
import NodeChildSet from "./NodeChildSet.vue";

const { story } = defineProps<{ story: Story }>();
const store = useStoryStore();

// 패닝 offset
const panOffset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });

const NODE_W = 220;
const NODE_H = 60;

const onMouseDown = (e: MouseEvent) => {
  if (e.button !== 0) return; // 왼쪽 클릭만 동작
  dragging.value = true;
  dragStart.value.x = e.clientX - panOffset.value.x;
  dragStart.value.y = e.clientY - panOffset.value.y;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", eventEnd);
  window.addEventListener("mouseleave", eventEnd);
};
const onMouseMove = (e: MouseEvent) => {
  if (!dragging.value) return;
  panOffset.value.x = e.clientX - dragStart.value.x;
  panOffset.value.y = e.clientY - dragStart.value.y;
};
const eventEnd = () => {
  dragging.value = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", eventEnd);
  window.removeEventListener("mouseleave", eventEnd);
};
const unselect = () => {
  store.unselectItem();
}

const nodesWithPos = computed(() => {
  const layout = getDagreLayout(story.nodes, {
    nodeWidth: NODE_W,
    nodeHeight: NODE_H,
    rankdir: "LR",
    nodesep: 10,
    ranksep: 20,
  });
  return layout.map((node) => ({
    ...node,
    x: node.x + panOffset.value.x,
    y: node.y + panOffset.value.y,
  }));
});

// 연결선 정보 계산
const lines = computed(() => {
  const nodes = nodesWithPos.value;
  const nodeMap: Record<string, (typeof nodes)[0]> = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });
  const result: {
    from: string;
    to: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    id: string;
  }[] = [];
  nodes.forEach((node) => {
    node.next.forEach(({to: t}) => {
      const toNode = nodeMap[t];
      if (!toNode) return;
      result.push({
        from: node.id,
        to: t,
        x1: node.x + NODE_W / 4,
        y1: node.y + NODE_H / 2,
        x2: toNode.x + NODE_W / 4,
        y2: toNode.y + NODE_H / 2,
        id: `${node.id}__${t}`,
      });
    });
  });
  return result;
});
</script>
<style scoped>
.graph {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}
.graph:active {
  cursor: grabbing;
}
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
