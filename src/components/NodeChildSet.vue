<template>
  <div class="childs">
    <div
      class="child"
      :style="{ backgroundColor: getIdColor(next.to) }"
      v-for="next of props.next"
      @click.stop="props.click(next.id)"
    ></div>
    <div v-if="props.selected" class="addchild" @click.stop="props.add">+</div>
  </div>
</template>
<script setup lang="ts">
import { useStoryStore, type StoryArrow } from '../stores/useStoryStore';

const props = defineProps<{
  selected?: boolean;
  node: { id: string; color?: string };
  click: (arrowId: string) => void;
  add: () => void;
  next: StoryArrow[]; // arrow id 배열
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