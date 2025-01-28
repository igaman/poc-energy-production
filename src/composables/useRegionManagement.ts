import { computed } from 'vue';

export const useRegionManagement = (arrayInsee, defaultRegion) => {
    const canAddMoreRegions = computed(() => {
        return arrayInsee.value.length === defaultRegion.length;
    });

    const canDeleteRegions = computed(() => {
        return arrayInsee.value.length <= 1;
    });

    const addRegion = () => {
        if (!canAddMoreRegions) return;
        arrayInsee.value.push(defaultRegion[arrayInsee.value.length]);
    }

    const deleteLastRegion = () => {
        if (!canDeleteRegions) return;
        arrayInsee.value.pop();
    }

    return {
        canAddMoreRegions,
        canDeleteRegions,
        addRegion,
        deleteLastRegion,
    }
};
