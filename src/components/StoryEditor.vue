<template>
  <div class="editor" style="flex: 1; padding: 10px; overflow: auto" v-if="currentStory">
    <input class="title" v-model="currentStory.title" placeholder="(제목 없음)">
    <div v-if="currentStory">
      <NodeGraph :story="currentStory" />
      <template v-if="selectedItem">
        <NodeEditor v-if="selectedItem.type === 'node'" :node="selectedNode" />
        <StoryAttributeEditor v-if="selectedItem.type === 'story'" :story="selectedStory" />
        <ArrowEditor v-if="selectedItem.type === 'arrow'" :arrow="selectedArrow" />
      </template>
    </div>
    <div v-else>스토리를 선택하세요</div>
  </div>
</template>

<script setup lang="ts">
import { useStoryStore, type Story, type StoryArrow, type StoryNode } from "../stores/useStoryStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import NodeGraph from "./NodeGraph.vue";
import NodeEditor from "./NodeEditor.vue";
import StoryAttributeEditor from "./StoryAttributeEditor.vue";
import ArrowEditor from "./ArrowEditor.vue";

const store = useStoryStore();
const { stories, selectedStoryId, selectedItem } = storeToRefs(store);

const currentStory = computed(() =>
  stories.value.find((e) => e.id === selectedStoryId.value)
);
const selectedNode = computed(() =>
  currentStory.value?.nodes.find((n) => n.id === selectedItem.value?.id) as StoryNode
);
const selectedStory = computed(() =>
  stories.value.find((e) => e.id === selectedStoryId.value) as Story
);
const selectedArrow = computed(() =>
  store.getCurrentArrowById(selectedItem.value?.id) as StoryArrow
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