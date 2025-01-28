<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  disabled: boolean,
  color: string,
  eventName?: string,
}>();

const emit = defineEmits<{
  (e: string, payload?: any): void;
}>();

const handleClick = () => {
  const event = props.eventName || 'click';
  emit(event);
};

const buttonClasses = computed(() => {
  return [
    'flex-1 inline-block rounded border',
    `border-${props.color}-600 bg-${props.color}-600`,
    'px-12 py-3 text-sm font-medium text-white',
    'disabled:opacity-50 cursor-pointer',
  ].join(' ');
});
</script>
