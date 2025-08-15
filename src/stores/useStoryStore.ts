import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { SampleStory } from "../utils/sampleStory";

export type Story = {
  id: string;
  title: string;
  nodes: StoryNode[];
};
export type StoryNode = {
  id: string;
  title: string;
  text: string;
  next: StoryArrow[];
  color: string;
};
export interface StoryArrow {
  id: string; // from__to
  from: string; // 출발 노드 id
  to: string;   // 도착 노드 id
}
export type SelectedItem =
  | { type: "story"; id: string }
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

export const useStoryStore = defineStore("story", () => {
  const stories: Ref<Story[]> = ref([SampleStory]);

  const selectedStoryId = ref(stories.value[0].id);
  const selectedItem = ref<SelectedItem>({ type: "story", id: stories.value[0].id });

  const addStory = () => {
    const id = generateGUID();
    stories.value.push({ id, title: `새 스토리`, nodes: [emptyStoryNode()] });
    selectedStoryId.value = id;
    selectedItem.value = { type: "story", id };
  };

  const selectStory = (id: string) => {
    selectedStoryId.value = id;
    selectedItem.value = { type: "story", id };
  };

  const addNode = (storyId: string) => {
    const story = stories.value.find((e) => e.id === storyId);
    if (!story) return;
    const node = emptyStoryNode();
    story.nodes.push(node);
    selectedItem.value = { type: "node", id: node.id };
  };
  function createStoryArrow(from: string, to: string): StoryArrow {
    return {
      id: `${from}__${to}`,
      from,
      to,
    };
  }
  const addChildNode = (parentNodeId: string, storyId: string) => {
    const story = stories.value.find((e) => e.id === storyId);
    if (!story) return;
    const parentNode = story.nodes.find((n) => n.id === parentNodeId);
    if (!parentNode) return;
    const newNode: StoryNode = emptyStoryNode();
    story.nodes.push(newNode);
    parentNode.next.push(createStoryArrow(parentNodeId, newNode.id));
    selectedItem.value = { type: "node", id: newNode.id };
  };

  const getCurrentStory = (): Story | undefined => {
    return stories.value.find((e) => e.id === selectedStoryId.value);
  }
  const getStoryById = (id: string): Story | undefined => {
    return stories.value.find((story) => story.id === id);
  };
  const getNodeById = (
    storyId: string,
    nodeId: string
  ): StoryNode | undefined => {
    const story = stories.value.find((e) => e.id === storyId);
    return story?.nodes.find((n) => n.id === nodeId);
  };
  const getCurrentNodeById = (nodeId: string): StoryNode | undefined => {
    const story = stories.value.find((e) => e.id === selectedStoryId.value);
    return story?.nodes.find((n) => n.id === nodeId);
  };


  const selectNode = (nodeId: string) => (selectedItem.value = { type: "node", id: nodeId });
  const selectArrow = (arrowId: string) => (selectedItem.value = { type: "arrow", id: arrowId });
  const unselectItem = () => {
    selectedItem.value = { type: "story", id: selectedStoryId.value };
  };
  const toggleNode = (nodeId: string) => {
    if (selectedItem.value?.type === "node" && selectedItem.value.id === nodeId) {
      selectedItem.value = { type: "story", id: selectedStoryId.value };
    } else {
      selectedItem.value = { type: "node", id: nodeId };
    }
  };

  const removeNode = (storyId: string, nodeId: string) => {
    const story = stories.value.find((e) => e.id === storyId);
    if (!story) return;

    // Remove the node from the story's nodes array
    story.nodes = story.nodes.filter((node) => node.id !== nodeId);

    // Remove references to the node in other nodes' next arrays
    story.nodes.forEach((node) => {
      node.next = node.next.filter((link) => link.to !== nodeId);
    });

    // Unselect the node if it was selected
    if (selectedItem.value?.type === "node" && selectedItem.value.id === nodeId) {
      selectedItem.value = { type: "story", id: selectedStoryId.value };
    }
  };

  return {
    stories,
    selectedStoryId,
    selectedItem,
    addStory,
    selectStory,
    getCurrentStory,
    addNode,
    addChildNode,
    selectNode,
    selectArrow,
    unselectItem,
    toggleNode,
    getStoryById,
    getNodeById,
    getCurrentNodeById,
    removeNode,
  };
});
function emptyStoryNode(): StoryNode {
  return {
    id: generateGUID(),
    title: "새 장",
    text: "",
    next: [],
    color: generateLightColor(),
  };
}

