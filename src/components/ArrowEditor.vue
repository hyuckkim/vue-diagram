<template>
  <div class="arrow-editor">
    <h3>화살표(연결) 편집</h3>
    <label>
      ID
      <input v-model="arrow.id" disabled />
    </label>
    <label>
      출발 노드
      <input v-model="arrow.from" disabled />
    </label>
    <label>
      도착 노드
      <input v-model="arrow.to" disabled />
    </label>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import type { EventArrow } from '../stores/useEventStore';

defineProps<{ arrow: EventArrow }>();
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
