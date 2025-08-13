<template>
  <div class="sidebar" style="width:250px; border-right:1px solid #ccc; padding:10px;">
    <h3>이벤트 목록</h3>
    <button @click="addEvent">새 이벤트</button>
    <div>
      <EventListItem
        v-for="event in events"
        :key="event.id"
        :event="event"
        :selected="event.id === selectedEventId"
        @select="selectEvent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEventStore } from '../stores/useEventStore'
import { storeToRefs } from 'pinia'
import EventListItem from './EventListItem.vue'

const store = useEventStore()
const { events, selectedEventId } = storeToRefs(store)

const addEvent = () => store.addEvent()
const selectEvent = (id: string) => store.selectEvent(id)
</script>
