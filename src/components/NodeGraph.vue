<template>
  <div class="graph">
    <NodeBlock
      v-for="node in event.nodes"
      :key="node.id"
      :node="node"
      :click="selectNode"
      :add="() => store.addChildNode(node.id, event.id)"
      :selected="node.id === store.selectedNodeId"
      @select="selectNode(node.id)" />
  </div>
</template>

<script setup lang="ts">
import { useEventStore, type Event } from '../stores/useEventStore'
import NodeBlock from './NodeBlock.vue';

defineProps<{
  event: Event
}>()
const store = useEventStore()
const selectNode = (id: string) => store.selectNode(id)
</script>
<style scoped>
.graph {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-auto-rows: 100px;
  gap: 5px;
}
</style>