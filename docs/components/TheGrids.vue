<script setup lang="ts">
import { onMounted } from 'vue'
import { useGridSpacer } from '../../lib/grid'

const { execute } = useGridSpacer({
  containerClass: 'TheGrids',
  spacerClass: 'box',
  spacerTag: 'div',
  type: 'fill'
})

onMounted(() => execute())
</script>

<template>
  <div class="TheGrids">
    <div class="box" v-for="i in 13" :key="i">
      <div class="content" />
    </div>
  </div>
</template>

<style scoped>
.TheGrids {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 4px;
  width: 90%;
  margin: 48px auto;
}

@media (min-width: 768px) {
  .TheGrids {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

:deep(.box) {
  background-color: gray;
  width: 100%;
  height: 100px;
}
</style>