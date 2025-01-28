import { mockApi } from "../mock/mockApi";

export async function getDataFromMock() {
  const data = await mockApi;
  return data.results;
}
