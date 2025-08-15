<template>
  <div
    class="node"
    @click="click(node.id)"
    :style="{
      borderWidth: selected ? '3px' : '1px',
      borderColor: node.color || '#ccc',
      position: 'absolute',
      left: x + 'px',
      top: y + 'px'
    }"
  >
    {{ node.title || "(제목 없음)" }}
    <div class="childs">
      <div
        class="child"
        :style="{ backgroundColor: idColor(next) }"
        v-for="next of node.next"
        @click.stop="click(next)"
      ></div>
      <div v-if="node.next.length < 8" class="addchild" @click.stop="add">+</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useEventStore, type EventNode } from "../stores/useEventStore";

defineProps<{
  selected?: boolean;
  node: EventNode;
  click: (id: string) => void;
  add: () => void;
  x?: number;
  y?: number;
}>();
const store = useEventStore();
const idColor = (id: string) => store.getCurrentNodeById(id)?.color || "#ccc";
</script>
<style scoped>
.node {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
.childs {
  display: flex;
}
.addchild {
  border: #333 1px solid;
  text-align: center;
  background-color: white;
}
.child,.addchild {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(0px, 40px);
}
</style>
