export function useDataForHightChart(dataPerYear, year) {
    if (!dataPerYear.value || dataPerYear.value.length === 0) {
      return {
        chart: { type: 'column' },
        title: { text: 'No Data' },
        xAxis: { categories: [] },
        yAxis: { title: { text: 'No Data' } },
        series: []
      };
    }

    let productionKeys: string[] = [];
    for (const region of dataPerYear.value) {
      const matchingResult = region.results[0];
      if (matchingResult) {
        productionKeys = Object.keys(matchingResult).filter(key => key !== 'annee');
        break;
      }
    }

    const series = dataPerYear.value
      .map(region => {
        const matchingResult = region.results[0];
        if (!matchingResult) return null;
        const data = productionKeys.map(key => Number(matchingResult[key]));
        return {
          name: region.regionName,
          data
        };
      })
      .filter(item => item !== null);

    let screenSize = typeof window !== 'undefined' ? window.innerWidth : 800;
    screenSize = screenSize > 1024 ? 1024 : screenSize;

    return {
      chart: {
        type: 'column',
        width: screenSize,
      },
      title: { text: `Production d'énergie: ${year}` },
      xAxis: { categories: productionKeys },
      yAxis: { title: { text: 'Production annuelle (GWh)' } },
      series
    };
}
