<template>
  <div
    class="loading absolute z-[999] bg-black opacity-30 w-full h-full rounded"
  ></div>
  <div class="spinner-wrap absolute z-[999]">
    <div
      class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
    ></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.spinner-wrap {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
