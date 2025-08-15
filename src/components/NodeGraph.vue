<template>
  <div class="graph" @mousedown="onMouseDown">
    <svg class="lines" width="100%" height="100%" style="position:absolute;top:0;left:0;z-index:0;pointer-events:auto">
      <line
        v-for="line in lines"
        :key="line.id"
        :x1="line.x1"
        :y1="line.y1"
        :x2="line.x2"
        :y2="line.y2"
        :stroke="line.id === selectedLine ? '#ff5252' : '#888'"
        stroke-width="4"
        @click.stop="selectLine(line.id)"
        style="cursor:pointer;opacity:0.7;"
      />
    </svg>
    <NodeBlock
      v-for="node in nodesWithPos"
      :key="node.id"
      :node="node"
      :x="node.x"
      :y="node.y"
      :children="node.children"
      :click="selectNode"
      :add="() => store.addChildNode(node.id, event.id)"
      :selected="node.id === store.selectedNodeId"
      @select="selectNode(node.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useEventStore, type Event, type EventNode } from "../stores/useEventStore";
import NodeBlock from "./NodeBlock.vue";
import { getDagreLayout } from "../utils/dagreLayout";

const { event } = defineProps<{ event: Event }>();
const store = useEventStore();
const selectNode = (id: string) => store.toggleNode(id);

// 패닝 offset
const panOffset = ref({ x: 0, y: 0 });
const dragging = ref(false);
const dragStart = ref({ x: 0, y: 0 });

const selectedLine = ref<string | null>(null);

const NODE_W = 220;
const NODE_H = 60;

const onMouseDown = (e: MouseEvent) => {
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

function getNodeRelations(nodes: EventNode[]) {
  const childrenMap: Record<string, string[]> = {};
  nodes.forEach((node) => {
    childrenMap[node.id] = node.next.map(link => link.to) ?? [];
  });
  return { childrenMap };
}

const nodesWithPos = computed(() => {
  const layout = getDagreLayout(event.nodes, {
    nodeWidth: NODE_W,
    nodeHeight: NODE_H,
    rankdir: "LR",
    nodesep: 10,
    ranksep: 20,
  });
  const { childrenMap } = getNodeRelations(event.nodes);
  return layout.map((node) => ({
    ...node,
    x: node.x + panOffset.value.x,
    y: node.y + panOffset.value.y,
    children: childrenMap[node.id],
  }));
});

// 연결선 정보 계산
const lines = computed(() => {
  const nodes = nodesWithPos.value;
  const nodeMap: Record<string, typeof nodes[0]> = {};
  nodes.forEach((n) => { nodeMap[n.id] = n; });
  const result: { from: string; to: string; x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
  nodes.forEach((node) => {
    node.children?.forEach((toId: string) => {
      const toNode = nodeMap[toId];
      if (!toNode) return;
      result.push({
        from: node.id,
        to: toId,
        x1: node.x + NODE_W / 4,
        y1: node.y + NODE_H / 2,
        x2: toNode.x + NODE_W / 4,
        y2: toNode.y + NODE_H / 2,
        id: `${node.id}__${toId}`,
      });
    });
  });
  return result;
});

function selectLine(id: string) {
  selectedLine.value = id;
}
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
