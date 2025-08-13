<template>
  <div>
    <div v-for="node in event.nodes" :key="node.id" style="margin-bottom:10px;">
      <div @click="selectNode(node.id)" style="padding:5px; border:1px solid #aaa; cursor:pointer;">
        {{ node.text }}
      </div>
      <div v-if="node.next.length" style="margin-left:20px;">
        <div v-for="nextId in node.next" :key="nextId">
          {{ nextId }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventStore, type Event } from '../stores/useEventStore'

defineProps<{
  event: Event
}>()
const store = useEventStore()
const selectNode = (id: string) => store.selectNode(id)
</script>
