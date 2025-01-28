import { computed } from 'vue';

export function useYearList(dataEnergy) {
  return computed(() => {
    if (dataEnergy.value) {
      const list = dataEnergy.value
        .filter((curr) => curr.results)
        .map((curr) => curr.results.map((item) => item.annee));

      if (list.length <= 1) return new Set(list[0]);

      const setList1 = new Set(list[0]);

      return list[1].filter((item) => setList1.has(item)).sort((a, b) => a - b);
    } else {
      return [];
    }
  });
}
