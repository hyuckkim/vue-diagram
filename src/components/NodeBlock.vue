<template>
  <div
    class="node"
    @click="props.click(props.node.id)"
    :style="{
      borderWidth: props.selected ? '5px' : '3px',
      borderColor: props.node.color || '#ccc',
      position: 'absolute',
      left: (props.x ?? 0) + 'px',
      top: (props.y ?? 0) + 'px',
    }"
  >
    {{ props.node.title || "(제목 없음)" }}
    <div class="childs">
      <div
        class="child"
        :style="{ backgroundColor: idColor(next)}"
        v-for="next of props.children"
        @click.stop="props.click(next)"
      ></div>
      <div
        v-if="props.selected"
        class="addchild"
        @click.stop="props.add"
      >
        +
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useEventStore, type EventNode } from "../stores/useEventStore";

const props = defineProps<{
  selected?: boolean;
  node: EventNode;
  click: (id: string) => void;
  add: () => void;
  x?: number;
  y?: number;
  children?: string[];
  child?: string[];
}>();

const store = useEventStore();
const idColor = (id: string) => store.getCurrentNodeById(id)?.color || "#ccc";
</script>
<style scoped>
.node {
  padding: 10px;
  border-left: 3px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
  box-sizing: border-box;
  max-width: 200px;
  max-height: 100px;
  display: flex;
}
.childs {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.addchild {
  border: #333 1px solid;
  text-align: center;
  background-color: white;
}
.child,
.addchild {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transform: translateX(20px);
}
</style>
