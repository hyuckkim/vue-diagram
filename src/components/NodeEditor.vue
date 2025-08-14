<template>
  <div class="node-editor">
    <div class="node-header">
      <input class="title" v-model="node.title" placeholder="문단 제목" />
      <input class="color" type="color" v-model="node.color" />
      <button 
        class="remove-button" 
        @click="removeNode" 
        :disabled="!removeEnabled"
      >
        삭제
      </button>
    </div>
    <div class="node-body">
      <textarea v-model="text" rows="6" class="text-area"></textarea>
      <button class="save-button" @click="updateText">저장</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEventStore } from '../stores/useEventStore'
import { type EventNode } from '../stores/useEventStore'

const { node } = defineProps<{ node: EventNode }>()
const store = useEventStore()

const text = ref(node.text)
watch(() => node.text, (val) => text.value = val)

const removeEnabled = computed(() => store.getCurrentEvent()?.nodes.length !== 1)
const updateText = () => store.updateNodeText(store.selectedEventId, node.id, text.value)
const removeNode = () => store.removeNode(store.selectedEventId, node.id)
</script>

<style scoped>
.node-editor {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.node-header {
  display: flex;
  align-items: center;
}

.node-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}

.text-area {
  width: 100%;
  resize: none;
}

.title {
  font-size: 1em;
  font-weight: bold;
  border: 0;
  padding: 5px;
  width: 100%;
  margin-bottom: 10px;
}

.color {
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
}

.remove-button {
  margin-left: auto;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8em;
  white-space: nowrap;
}

.remove-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.remove-button:active:not(:disabled) {
  background-color: #e60000;
}

.save-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.8em;
  align-self: flex-end;
}

.save-button:active {
  background-color: #45a049;
}
</style>