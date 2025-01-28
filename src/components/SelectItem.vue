<template>
    <select
        v-model="model"
        @change="onChange"
        class="p-2 rounded-md border border-gray-300 text-gray-700 sm:text-sm cursor-pointer"
    >
        <option v-for="place in uniqCodeByRegion"
            :key="place.code_insee_region"
            :value="place.code_insee_region"
        >
            {{ place.region }}
        </option>
    </select>
</template>

<script setup lang="ts">
import { defineEmits, defineModel, defineProps, computed } from 'vue';
import { codeByRegion } from '../config.js';

const model = defineModel({ type: String });
const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    arrayInsee: string[],
}>();

const uniqCodeByRegion = computed(() => {
    const filteredRegions = codeByRegion.filter((region) => {
        return model.value === region.code_insee_region || !props.arrayInsee.includes(region.code_insee_region);
    });
    return filteredRegions;
});

const onChange = () => {
    emit('update:modelValue', model.value);
}
</script>

<style scoped>

</style>
