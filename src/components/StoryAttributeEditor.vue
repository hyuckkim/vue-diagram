<template>
  <div class="story-attribute-editor">
    <h3>스토리 속성 편집</h3>
    <label>
      제목
      <input v-model="story.title" />
    </label>
    <label>
      ID
      <input v-model="story.id" disabled />
    </label>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import type { Story } from '../stores/useStoryStore';

defineProps<{ story: Story }>();
</script>
<style scoped>
.story-attribute-editor {
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
