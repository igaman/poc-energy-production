<template>
  <div class="p-4">
    <Suspense>
      <template #default>
        <Graph />
      </template>
      <template #fallback>
        <h2>Loading ...</h2>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Graph = defineAsyncComponent(() => import('./components/Graph.vue'));
</script>
