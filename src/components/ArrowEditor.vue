<template>
  <div class="arrow-editor">
    <h3>화살표(연결) 편집</h3>
    <label>
      ID
      <input v-model="arrow.id" disabled />
    </label>
    <label>
      출발 노드
  <NodeBlock v-if="fromNode" :node="fromNode" :click="() => store.selectNode(fromNode?.id!)" :selected="false" />
  <span v-else style="color:gray">(노드 없음)</span>
    </label>
    <label>
      도착 노드
  <NodeBlock v-if="toNode" :node="toNode" :click="() => store.selectNode(toNode?.id!)" :selected="false" />
  <span v-else style="color:gray">(노드 없음)</span>
    </label>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { StoryArrow } from '../stores/useStoryStore';
import { useStoryStore } from '../stores/useStoryStore';
import NodeBlock from './NodeBlock.vue';

const props = defineProps<{ arrow: StoryArrow }>();
const store = useStoryStore();
const fromNode = computed(() => store.getCurrentNodeById(props.arrow.from));
const toNode = computed(() => store.getCurrentNodeById(props.arrow.to));
</script>
<style scoped>
.arrow-editor {
  padding: 1em;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
label {
  display: block;
  margin-bottom: 1em;
}
input {
  width: 100%;
  padding: 0.5em;
  margin-top: 0.2em;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
