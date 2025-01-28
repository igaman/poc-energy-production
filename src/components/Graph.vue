<template>
  <div class="app">
    <div class="flex justify-center relative">
      <loader-item v-if="loading" />
      <highcharts :options="dataPerYear" />
    </div>
    <div class="max-w-3xl mx-auto my-0">
      <h2 class="text-xl font-semibold">Année</h2>
      <select
        id="select-id"
        v-model="year"
        class="p-2 rounded-md border border-gray-300 text-gray-700 sm:text-sm cursor-pointer mt-2"
      >
        <option disabled>Selectionnez une année</option>
        <option v-for="year in yearList">{{ year }}</option>
      </select>
      <h2 class="text-xl font-semibold mt-2">Région</h2>
      <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-2">
        <SelectItem
          v-for="(code, index) in arrayInsee"
          :key="index"
          v-model="arrayInsee[index]"
          :array-insee="arrayInsee"
        />
      </div>
      <div class="flex gap-2 max-w-lg mt-4">
        <ButtonItem
          @add-region="handleAddRegion"
          :disabled="canAddMoreRegions"
          color="indigo"
          eventName="add-region"
        >
          Ajouter
        </ButtonItem>
        <ButtonItem
          @delete-last-region="handleDeleteLastRegion"
          :disabled="canDeleteRegions"
          color="orange"
          eventName="delete-last-region"
        >
          Supprimer
        </ButtonItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { processDataArray } from "../api/index";
import { pipe } from "../utils/index";
import { defaultRegion, startingRegion, defaultYear } from "../config";
import { useDataPerYear } from "../composables/useDataPerYear";
import { useDataForHightChart } from "../composables/useDataForHightChart";
import { useRegionManagement } from "../composables/useRegionManagement";
import { useYearList } from "../composables/useYearList";
import SelectItem from "./SelectItem.vue";
import LoaderItem from "./LoaderItem.vue";
import ButtonItem from "./ButtonItem.vue";

const dataEnergy = ref();
const year = ref(defaultYear);
const arrayInsee = ref(startingRegion);
const loading = ref(false);

const { canAddMoreRegions, canDeleteRegions, addRegion, deleteLastRegion } =
  useRegionManagement(arrayInsee, defaultRegion);

const dataPerYear = computed(() => {
  return pipe(
    (data) => useDataPerYear(data, year.value),
    (data) => useDataForHightChart(data, year.value)
  )(dataEnergy);
});

const yearList = useYearList(dataEnergy);

const handleAddRegion = () => {
  addRegion();
}

const handleDeleteLastRegion = () => {
  deleteLastRegion();
}

watch(arrayInsee.value, () => {
  reloadChart();
});

const reloadChart = async () => {
  loading.value = true;
  dataEnergy.value = await processDataArray(arrayInsee.value);
  loading.value = false;
};

onMounted(async () => {
  reloadChart();
});
</script>

<style scoped>
.app {
  width: 100%;
}
</style>
