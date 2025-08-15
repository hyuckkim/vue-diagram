import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

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
  const events: Ref<Event[]> = ref([
    {
      id: "event-1",
      title: "첫 번째 이벤트",
      nodes: [
        {
          id: "node-1",
          title: "주인공이 숲에 들어간다",
          text: "앞에도 숲, 뒤에도 숲. 그야말로 사방이 숲입니다. \n들어가야겠죠...",
          next: [
            { id: "node-1__node-2", from: "node-1", to: "node-2" },
            { id: "node-1__node-3", from: "node-1", to: "node-3" },
          ],
          color: "#FF5733",
        },
        {
          id: "node-2",
          title: "왼쪽 길로 간다",
          text: "책을 읽을 때 왼쪽부터 읽듯, 당신은 왼쪽을 선택했습니다. 맞는 선택일까요?",
          next: [
            { id: "node-2__node-4", from: "node-2", to: "node-4" },
          ],
          color: "#33FF57",
        },
        {
          id: "node-3",
          title: "오른쪽 길로 간다",
          text: "누군가가, 오른 쪽이 옳은 쪽이라고 말했던 것 같습니다. 당신은 그가 옳은 말을 햇길 바라며 전진합니다.",
          next: [
            { id: "node-3__node-4", from: "node-3", to: "node-4" },
          ],
          color: "#3357FF",
        },
        {
          id: "node-4",
          title: "오두막 발견",
          text: "세월의 흐름을 정통으로 맞은 듯한 오두막길입니다. 음... 저기서 자면 시원하겠네요!",
          next: [],
          color: "#F3FF33",
        },
      ],
    },
  ]);

  const selectedEventId = ref(events.value[0].id);
  const selectedNodeId: Ref<string | null> = ref(null);

  const addEvent = () => {
    const id = generateGUID();
    events.value.push({ id, title: `새 이벤트`, nodes: [
      {
        id: generateGUID(),
        title: "새 장",
        text: "",
        next: [],
        color: generateLightColor(), // Default color for new nodes
      },
    ] });
    selectedEventId.value = id;
  };

  const selectEvent = (id: string) => {
    selectedEventId.value = id;
    selectedNodeId.value = null;
  };

  const addNode = (eventId: string) => {
    const event = events.value.find((e) => e.id === eventId);
    if (!event) return;
    const nodeId = generateGUID();
    event.nodes.push({
      id: nodeId,
      title: "새 장",
      text: "",
      next: [],
      color: generateLightColor(),
    });
    selectedNodeId.value = nodeId;
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
    const childNodeId = generateGUID();
    const newNode: EventNode = {
      id: childNodeId,
      title: "새 장",
      text: "",
      next: [],
      color: generateLightColor(),
    };
    event.nodes.push(newNode);
    parentNode.next.push(createEventArrow(parentNodeId, childNodeId));
    selectedNodeId.value = childNodeId;
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


  const selectNode = (nodeId: string) => (selectedNodeId.value = nodeId);
  const unselectNode = () => (selectedNodeId.value = null);
  const toggleNode = (nodeId: string) => (selectedNodeId.value = selectedNodeId.value === nodeId ? null : nodeId);

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
    if (selectedNodeId.value === nodeId) {
      selectedNodeId.value = null;
    }
  };

  return {
    events,
    selectedEventId,
    selectedNodeId,
    addEvent,
    selectEvent,
    getCurrentEvent,
    addNode,
    addChildNode,
    updateNodeText,
    selectNode,
    unselectNode,
    toggleNode,
    getEventById,
    getNodeById,
    getCurrentNodeById,
    removeNode,
  };
});
