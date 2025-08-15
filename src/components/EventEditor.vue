<template>
  <div class="editor" style="flex: 1; padding: 10px; overflow: auto" v-if="currentEvent">
    <input class="title" v-model="currentEvent.title" placeholder="(제목 없음)">
    <div v-if="currentEvent">
      <NodeGraph :event="currentEvent" />
      <template v-if="selectedItem">
        <NodeEditor v-if="selectedItem.type === 'node'" :node="selectedNode" />
        <EventAttributeEditor v-if="selectedItem.type === 'event'" :event="selectedEvent" />
      </template>
    </div>
    <div v-else>이벤트를 선택하세요</div>
  </div>
</template>

<script setup lang="ts">
import { useEventStore, type Story, type StoryNode } from "../stores/useEventStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import NodeGraph from "./NodeGraph.vue";
import NodeEditor from "./NodeEditor.vue";
import EventAttributeEditor from "./EventAttributeEditor.vue";

const store = useEventStore();
const { events, selectedEventId, selectedItem } = storeToRefs(store);

const currentEvent = computed(() =>
  events.value.find((e) => e.id === selectedEventId.value)
);
const selectedNode = computed(() =>
  currentEvent.value?.nodes.find((n) => n.id === selectedItem.value?.id) as StoryNode
);
const selectedEvent = computed(() =>
  events.value.find((e) => e.id === selectedEventId.value) as Story
);
</script>
<style scoped>
.editor,.editor>div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.title {
  font-size: 1.2em;
  font-weight: bold;
  border: 0;
  padding: 5px;
}
</style>