<template>
    <div style="margin-bottom:10px;">
      <div @click="click(node.id)" style="padding:5px; border:1px solid #aaa; cursor:pointer;">
        {{ node.title || '(제목 없음)' }}
      </div>
      <div v-if="node.next.length" style="margin-left:20px;">
        <div v-for="nextId in node.next" :key="nextId">
          {{ nextId }}
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import type { EventNode } from '../stores/useEventStore';

defineProps<{
    node: EventNode
    click: (id: string) => void
}>();
</script>