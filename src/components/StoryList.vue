<template>
  <div class="sidebar" style="width:250px; border-right:1px solid #ccc; padding:10px;">
    <h3>이벤트 목록</h3>
    <button @click="addStory">새 이벤트</button>
    <div>
      <StoryListItem
        v-for="event in stories"
        :key="event.id"
        :event="event"
        :selected="event.id === selectedStoryId"
        @select="selectStory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStoryStore } from '../stores/useStoryStore'
import { storeToRefs } from 'pinia'
import StoryListItem from './StoryListItem.vue'

const store = useStoryStore()
const { stories, selectedStoryId } = storeToRefs(store)

const addStory = () => store.addStory()
const selectStory = (id: string) => store.selectStory(id)
</script>
