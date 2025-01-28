import { BASE_URL } from "../constants";
import {
  groupByInseeCode,
  filterProperties,
  transformObjAndKeys,
  pipe,
} from '../utils';

export async function getDataFromApi(codeInsee: string) {
  const res = await fetch(encodeURI(`${BASE_URL}${codeInsee}`));
  const data = await res.json();
  return data.results;
}

export async function processDataArray(inseeCodeArray: string[], fetchData = getDataFromApi) {
  try {
    const validator = inseeCodeArray.every(item => item.length == 2 && typeof item === 'string');
    const ERROR_MESSAGE ='inseeCodeArray values are not valid';

    if (!validator) {
      throw new Error(ERROR_MESSAGE);
    }

    const rawData = await Promise.all(inseeCodeArray.map(code => fetchData(code)));

    const transformData = pipe(
      (data) => data.flat(), // Flat array
      filterProperties, // Filter property
      groupByInseeCode, // Group by inseeCode
      transformObjAndKeys, // replace null to 0 and Rename keys
    );

    const result = transformData(rawData);
    return result;

  } catch (error) {
    console.error("Error:", error);
  }
}
