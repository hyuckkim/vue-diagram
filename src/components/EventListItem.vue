<template>
  <div @click="$emit('select', event.id)" :style="{padding:'5px', cursor:'pointer', background:selected?'#eee':'#fff'}">
    {{ event.text }}
  </div>
</template>

<script setup lang="ts">
import { type EventNode } from '../stores/useEventStore'

defineProps<{
  event: EventNode;
  selected: boolean;
}>()
</script>
