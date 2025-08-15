<template>
  <div class="graph" @mousedown="onMouseDown">
    <NodeBlock
      v-for="node in nodesWithPos"
      :key="node.id"
      :node="node"
      :x="node.x"
      :y="node.y"
      :children="node.children"
      :child="node.child"
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

// child, children 정보 계산
function getNodeRelations(nodes: EventNode[]) {
  const childrenMap: Record<string, string[]> = {};
  const childMap: Record<string, string[]> = {};
  nodes.forEach((node) => {
    childrenMap[node.id] = node.next ?? [];
    node.next?.forEach((nextId: string) => {
      if (!childMap[nextId]) childMap[nextId] = [];
      childMap[nextId].push(node.id);
    });
  });
  nodes.forEach((node) => {
    if (!childMap[node.id]) childMap[node.id] = [];
  });
  return { childrenMap, childMap };
}

const nodesWithPos = computed(() => {
  const layout = getDagreLayout(event.nodes, {
    nodeWidth: 220,
    nodeHeight: 60,
    rankdir: "LR",
    nodesep: 10,
    ranksep: 20,
  });
  const { childrenMap, childMap } = getNodeRelations(event.nodes);
  return layout.map((node) => ({
    ...node,
    x: node.x + panOffset.value.x,
    y: node.y + panOffset.value.y,
    children: childrenMap[node.id],
    child: childMap[node.id],
  }));
});
</script>
<style scoped>
.graph {
  position: relative;
  width: 100%;
  height: 100%;
  /* display: grid;  <-- 패닝을 위해 grid 제거 */
  /* grid-auto-flow: row; */
  /* grid-template-columns: repeat(auto-fill, 200px); */
  /* grid-auto-rows: 100px; */
  /* gap: 5px; */
  overflow: hidden;
  cursor: grab;
}
.graph:active {
  cursor: grabbing;
}
</style>
