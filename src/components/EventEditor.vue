<template>
  <div class="editor" style="flex: 1; padding: 10px; overflow: auto" v-if="currentEvent">
    <input class="title" v-model="currentEvent.title" placeholder="(제목 없음)">
    <div v-if="currentEvent">
      <button @click="addNode">새 문단 추가</button>
      <NodeGraph :event="currentEvent" />
      <NodeEditor v-if="selectedNode" :node="selectedNode" />
    </div>
    <div v-else>이벤트를 선택하세요</div>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from "../stores/useEventStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import NodeGraph from "./NodeGraph.vue";
import NodeEditor from "./NodeEditor.vue";

const store = useEventStore();
const { events, selectedEventId, selectedNodeId } = storeToRefs(store);

const currentEvent = computed(() =>
  events.value.find((e) => e.id === selectedEventId.value)
);
const selectedNode = computed(() =>
  currentEvent.value?.nodes.find((n) => n.id === selectedNodeId.value)
);

const addNode = () => {
  if (currentEvent?.value) store.addNode(currentEvent.value.id);
};
</script>
<style scoped>
.title {
  font-size: 1.2em;
  font-weight: bold;
  border: 0;
  padding: 5px;
}
</style>