<template>
  <NodeBlock
    v-for="node in event.nodes"
    :key="node.id"
    :node="node"
    :click="selectNode"
    @select="selectNode(node.id)" />
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
