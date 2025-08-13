<template>
  <div style="margin-top:20px; border-top:1px solid #ccc; padding-top:10px;">
    <h4>문단 편집</h4>
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
