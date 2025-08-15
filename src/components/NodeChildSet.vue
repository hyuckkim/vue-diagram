<template>
  <div class="childs">
    <div
      class="child"
      :style="{ backgroundColor: getIdColor(next) }"
      v-for="next of props.children"
      @click.stop="props.click(next)"
    ></div>
    <div v-if="props.selected" class="addchild" @click.stop="props.add">+</div>
  </div>
</template>
<script setup lang="ts">
import { useStoryStore } from '../stores/useStoryStore';

const props = defineProps<{
  selected?: boolean;
  node: { id: string; color?: string };
  click: (id: string) => void;
  add: () => void;
  children?: string[];
}>();

const store = useStoryStore();
const getIdColor = (id: string) => store.getCurrentNodeById(id)?.color || "#ccc";
</script>
<style scoped>

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