<template>
  <div @click="$emit('select', event.id)" :style="{padding:'5px', cursor:'pointer', background:selected?'#eee':'#fff'}">
    <span v-if="event.title.length > 0">{{ event.title }}</span>
    <span v-else style="color: gray;">(제목 없음)</span>
  </div>
</template> 

<script setup lang="ts">
import { type Story } from '../stores/useStoryStore';

defineProps<{
  event: Story;
  selected: boolean;
}>()
</script>
