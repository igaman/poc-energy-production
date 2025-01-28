import { computed } from 'vue';

export function useDataPerYear(dataEnergy, year) {
    return computed(() => {
        if (!dataEnergy.value) return [];
        return dataEnergy.value.map(({
            inseeCode,
            regionName,
            results,
        }) => {
            const newResult = results.filter(elem => elem.annee === year);
            return {
                inseeCode,
                regionName,
                results: newResult,
            }
        });
    });
}
