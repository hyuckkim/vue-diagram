<template>
  <div class="app-container" style="display:flex; height:100vh">
    <EventList />
    <EventEditor />
  </div>
</template>

<script setup>
import EventList from './components/EventList.vue'
import EventEditor from './components/EventEditor.vue'
</script>
