import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { SampleEvent } from "../utils/sampleEvent";

export type Event = {
  id: string;
  title: string;
  nodes: EventNode[];
};
export type EventNode = {
  id: string;
  title: string;
  text: string;
  next: EventArrow[];
  color: string;
};
export interface EventArrow {
  id: string; // from__to
  from: string; // 출발 노드 id
  to: string;   // 도착 노드 id
}
export type SelectedItem =
  | { type: "event"; id: string }
  | { type: "node"; id: string }
  | { type: "arrow"; id: string };

function generateLightColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateGUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useEventStore = defineStore("event", () => {
  const events: Ref<Event[]> = ref([SampleEvent]);

  const selectedEventId = ref(events.value[0].id);
  const selectedItem = ref<SelectedItem>({ type: "event", id: events.value[0].id });

  const addEvent = () => {
    const id = generateGUID();
    events.value.push({ id, title: `새 이벤트`, nodes: [emptyEventNode()] });
    selectedEventId.value = id;
    selectedItem.value = { type: "event", id };
  };

  const selectEvent = (id: string) => {
    selectedEventId.value = id;
    selectedItem.value = { type: "event", id };
  };

  const addNode = (eventId: string) => {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return;
    const node = emptyEventNode();
    event.nodes.push(node);
    selectedItem.value = { type: "node", id: node.id };
  };
  function createEventArrow(from: string, to: string): EventArrow {
    return {
      id: `${from}__${to}`,
      from,
      to,
    };
  }
  const addChildNode = (parentNodeId: string, eventId: string) => {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return;
    const parentNode = event.nodes.find((n) => n.id === parentNodeId);
    if (!parentNode) return;
    const newNode: EventNode = emptyEventNode();
    event.nodes.push(newNode);
    parentNode.next.push(createEventArrow(parentNodeId, newNode.id));
    selectedItem.value = { type: "node", id: newNode.id };
  };

  const updateNodeText = (eventId: string, nodeId: string, text: string) => {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return;
    const node = event.nodes.find((n) => n.id === nodeId);
    if (node) node.text = text;
  };

  const getCurrentEvent = (): Event | undefined => {
    return events.value.find((e) => e.id === selectedEventId.value);
  }
  const getEventById = (id: string): Event | undefined => {
    return events.value.find((event) => event.id === id);
  };
  const getNodeById = (
    eventId: string,
    nodeId: string
  ): EventNode | undefined => {
    const event = events.value.find((e) => e.id === eventId);
    return event?.nodes.find((n) => n.id === nodeId);
  };
  const getCurrentNodeById = (nodeId: string): EventNode | undefined => {
    const event = events.value.find((e) => e.id === selectedEventId.value);
    return event?.nodes.find((n) => n.id === nodeId);
  };


  const selectNode = (nodeId: string) => (selectedItem.value = { type: "node", id: nodeId });
  const selectArrow = (arrowId: string) => (selectedItem.value = { type: "arrow", id: arrowId });
  const unselectItem = () => {
    selectedItem.value = { type: "event", id: selectedEventId.value };
  };
  const toggleNode = (nodeId: string) => {
    if (selectedItem.value?.type === "node" && selectedItem.value.id === nodeId) {
      selectedItem.value = { type: "event", id: selectedEventId.value };
    } else {
      selectedItem.value = { type: "node", id: nodeId };
    }
  };

  const removeNode = (eventId: string, nodeId: string) => {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return;

    // Remove the node from the event's nodes array
    event.nodes = event.nodes.filter((node) => node.id !== nodeId);

    // Remove references to the node in other nodes' next arrays
    event.nodes.forEach((node) => {
      node.next = node.next.filter((link) => link.to !== nodeId);
    });

    // Unselect the node if it was selected
    if (selectedItem.value?.type === "node" && selectedItem.value.id === nodeId) {
      selectedItem.value = { type: "event", id: selectedEventId.value };
    }
  };

  return {
    events,
    selectedEventId,
    selectedItem,
    addEvent,
    selectEvent,
    getCurrentEvent,
    addNode,
    addChildNode,
    updateNodeText,
    selectNode,
    selectArrow,
    unselectItem,
    toggleNode,
    getEventById,
    getNodeById,
    getCurrentNodeById,
    removeNode,
  };
});
function emptyEventNode(): EventNode {
  return {
    id: generateGUID(),
    title: "새 장",
    text: "",
    next: [],
    color: generateLightColor(),
  };
}

