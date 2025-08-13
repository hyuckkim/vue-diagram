<template>
  <div @click="$emit('select', event.id)" :style="{padding:'5px', cursor:'pointer', background:selected?'#eee':'#fff'}">
    {{ event.title }}
  </div>
</template>

<script setup lang="ts">
import { type Event } from '../stores/useEventStore'

defineProps<{
  event: Event;
  selected: boolean;
}>()
</script>
