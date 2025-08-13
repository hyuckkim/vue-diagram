import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export type Event = {
  id: string
  title: string
  nodes: EventNode[]
}
export type EventNode = {
  id: string
  text: string
  next: string[]
}
export const useEventStore = defineStore('event', () => {
  const events: Ref<Event[]> = ref([
    {
      id: 'event-1',
      title: '첫 번째 이벤트',
      nodes: [
        { id: 'node-1', text: '주인공이 숲에 들어간다', next: ['node-2', 'node-3'] },
        { id: 'node-2', text: '왼쪽 길로 간다', next: ['node-4'] },
        { id: 'node-3', text: '오른쪽 길로 간다', next: ['node-4'] },
        { id: 'node-4', text: '오두막 발견', next: [] }
      ]
    }
  ])

  const selectedEventId = ref(events.value[0].id)
  const selectedNodeId: Ref<string | null> = ref(null)

  const addEvent = () => {
    const id = `event-${events.value.length + 1}`
    events.value.push({ id, title: `새 이벤트`, nodes: [] })
    selectedEventId.value = id
  }

  const selectEvent = (id: string) => {
    selectedEventId.value = id
    selectedNodeId.value = null
  }

  const addNode = (eventId: string) => {
    const event = events.value.find(e => e.id === eventId)
    if (!event) return
    const nodeId = `node-${event.nodes.length + 1}`
    event.nodes.push({ id: nodeId, text: '새 문단', next: [] })
    selectedNodeId.value = nodeId
  }

  const updateNodeText = (eventId: string, nodeId: string, text: string) => {
    const event = events.value.find(e => e.id === eventId)
    if (!event) return
    const node = event.nodes.find(n => n.id === nodeId)
    if (node) node.text = text
  }

  const selectNode = (nodeId: string) => selectedNodeId.value = nodeId

  return { events, selectedEventId, selectedNodeId, addEvent, selectEvent, addNode, updateNodeText, selectNode }
})
