<template>
  <div
    class="node"
    @click="click(node.id)"
    :style="{ backgroundColor: selected ? '#e0f7fa' : '#fff' }"
  >
    {{ node.title || "(제목 없음)" }}
    <div class="childs">
      <div
        class="child"
        v-for="next of node.next"
        @click.stop="click(next)"
      ></div>
      <div v-if="node.next.length < 8" class="addchild" @click.stop="add">+</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { EventNode } from "../stores/useEventStore";

defineProps<{
  selected?: boolean;
  node: EventNode;
  click: (id: string) => void;
  add: () => void;
}>();
</script>
<style scoped>
.node {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  background-color: #f9f9f9;
}
.childs {
  display: flex;
}
.child:nth-child(1) {
  background-color: #ffadad; /* Pastel Red */
}
.child:nth-child(2) {
  background-color: #ffd6a5; /* Pastel Orange */
}
.child:nth-child(3) {
  background-color: #fdffb6; /* Pastel Yellow */
}
.child:nth-child(4) {
  background-color: #caffbf; /* Pastel Green */
}
.child:nth-child(5) {
  background-color: #9bf6ff; /* Pastel Blue */
}
.child:nth-child(6) {
  background-color: #a0c4ff; /* Pastel Light Blue */
}
.child:nth-child(7) {
  background-color: #bdb2ff; /* Pastel Purple */
}
.child:nth-child(8) {
  background-color: #ffc6ff; /* Pastel Pink */
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
