<template>
  <div class="graph">
    <NodeBlock
      v-for="node in nodesWithPos"
      :key="node.id"
      :node="node"
      :x="node.x"
      :y="node.y"
      :click="selectNode"
      :add="() => store.addChildNode(node.id, event.id)"
      :selected="node.id === store.selectedNodeId"
      @select="selectNode(node.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useEventStore, type Event } from "../stores/useEventStore";
import NodeBlock from "./NodeBlock.vue";
import dagre from "@dagrejs/dagre";

const { event } = defineProps<{
  event: Event;
}>();
const store = useEventStore();
const selectNode = (id: string) => store.toggleNode(id);

// dagre를 이용해 노드 위치 계산
const g = new dagre.graphlib.Graph();
g.setGraph({});
g.setDefaultEdgeLabel(() => ({}));

// 노드 추가 (크기 임의 지정)
event.nodes.forEach((node) => {
  g.setNode(node.id, { width: 200, height: 100 });
});

// 엣지 추가 (next 배열 이용)
event.nodes.forEach((node) => {
  if (node.next && Array.isArray(node.next)) {
    node.next.forEach((nextId: string) => {
      g.setEdge(node.id, nextId);
    });
  }
});

dagre.layout(g);

// 노드에 x, y 좌표 추가
import { computed } from "vue";

const nodesWithPos = computed(() => {
  // dagre 인스턴스 새로 생성
  const g = new dagre.graphlib.Graph();
  g.setGraph({});
  g.setDefaultEdgeLabel(() => ({}));

  // 노드 추가
  event.nodes.forEach((node) => {
    g.setNode(node.id, { width: 200, height: 100 });
  });

  // 엣지 추가
  event.nodes.forEach((node) => {
    if (node.next && Array.isArray(node.next)) {
      node.next.forEach((nextId: string) => {
        g.setEdge(node.id, nextId);
      });
    }
  });

  dagre.layout(g);

  // 좌표 포함해서 반환
  return event.nodes.map((node) => {
    const pos = g.node(node.id);
    return { ...node, x: pos?.x ?? 0, y: pos?.y ?? 0 };
  });
});
</script>
<style scoped>
.graph {
  width: 100%;
  height: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-rows: 100px;
  gap: 5px;
  position: relative;
}
</style>
