<template>
  <div class="app-container" style="display:flex; height:100vh">
    <StoryList />
    <StoryEditor />
  </div>
</template>

<script setup>
import StoryList from './components/StoryList.vue'
import StoryEditor from './components/StoryEditor.vue'
</script>
