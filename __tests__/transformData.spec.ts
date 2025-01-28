import { describe, expect, test } from "vitest";
import { ref } from "vue";
import { processDataArray } from "../src/api";
import { getDataFromMock } from "./utils/getDataFromMock";
import { useDataPerYear } from "../src/composables/useDataPerYear";
import { useDataForHightChart } from "../src/composables/useDataForHightChart";

const resultExpected = [
  {
    inseeCode: "11",
    regionName: "Île-de-France",
    results: [
      {
        annee: "2008",
        hydraulique: 59,
        bioenergies: 629.9,
        eolienne: 0,
        solaire: 0.7,
        electrique: 689.6,
        gaz: 0,
        totale: 689.6,
      },
      {
        annee: "2020",
        bioenergies: 747.31,
        electrique: 1182.268,
        eolienne: 265.68,
        gaz: 290.2,
        hydraulique: 42.838,
        solaire: 126.44,
        totale: 1472.468,
      },
    ],
  },
];

describe("transform the data from the api", () => {
  let resultApi;
  let dataPerYear;
  const dataEnergy = ref();
  const year = "2020";

  test("processDataArray: filter property and group by inseeCode", async () => {
    resultApi = await processDataArray(["11"], getDataFromMock);
    expect(resultApi).toEqual(resultExpected);
  });

  test("useDataPerYear: get data per year 2020", async () => {
    dataEnergy.value = resultApi;
    dataPerYear = useDataPerYear(dataEnergy, year);
    expect(dataPerYear.value).toEqual([
      {
        inseeCode: "11",
        regionName: "Île-de-France",
        results: [
          {
            annee: "2020",
            bioenergies: 747.31,
            electrique: 1182.268,
            eolienne: 265.68,
            gaz: 290.2,
            hydraulique: 42.838,
            solaire: 126.44,
            totale: 1472.468,
          },
        ],
      },
    ]);
  });

  test("useDataForHightChart: get data for hightchart", async () => {
    const dataForHightChart = ref(useDataForHightChart(dataPerYear, year));
    expect(dataForHightChart.value).toEqual({
      chart: {
        type: 'column',
        width: 800,
      },
      title: { text: `Production d'énergie: ${year}` },
      xAxis: { "categories": [ "hydraulique", "bioenergies", "eolienne", "solaire", "electrique", "gaz", "totale" ] },
      yAxis: { title: { text: 'Production annuelle (GWh)' } },
      series: [ { "name": "Île-de-France", "data": [ 42.838, 747.31, 265.68, 126.44, 1182.268, 290.2, 1472.468 ] },]
    })
  });
});
