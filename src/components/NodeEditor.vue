<template>
  <div style="margin-top:20px; border-top:1px solid #ccc; padding-top:10px;">
    <div style="display: flex;">
      <input class="title" v-model="node.title" placeholder="문단 제목" style="width:100%; margin-bottom:10px;" />
      <input class="color" type="color" v-model="node.color" style="width:50px; margin-left:10px;" />
    </div>
    <textarea v-model="text" rows="3" style="width:100%"></textarea>
    <button @click="updateText">저장</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEventStore } from '../stores/useEventStore'
import { type EventNode } from '../stores/useEventStore'

const { node } = defineProps<{ node: EventNode }>()
const store = useEventStore()

const text = ref(node.text)
watch(() => node.text, (val) => text.value = val)

const updateText = () => store.updateNodeText(store.selectedEventId, node.id, text.value)
</script>
<style scoped>
.title {
  font-size: 1em;
  font-weight: bold;
  border: 0;
  padding: 5px;
}
</style>