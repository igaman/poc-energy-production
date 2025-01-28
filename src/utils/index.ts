const groupByInseeCode = (array) =>
  array.reduce((acc, { code_insee_region, nom_insee_region, ...otherData }) => {
    let region = acc.find((r) => r.inseeCode === code_insee_region);

    if (!region) {
      region = {
        inseeCode: code_insee_region,
        regionName: nom_insee_region,
        results: [],
      };
      acc.push(region);
    }

    region.results.push(otherData);
    return acc;
  }, []);

const filterProperties = (data) =>
  data.map(({ geo_shape_region, geo_point_region, ...filteredObj }) => filteredObj);

const transformObjAndKeys = (data) => data.map(({
    inseeCode,
    regionName,
    results,
  }) => {

  const newResults = results.map(data => {
    for (let key in data) {
      if (data[key] === null) {
        data[key] = 0;
      }

      if (key.startsWith('production_') && key.endsWith('_renouvelable')) {
        const newKey = key.replace('production_', '').replace('_renouvelable', '');
        data[newKey] = data[key];
        delete data[key];
      }
    }
    return data;
  });

  return {
    inseeCode,
    regionName,
    results: newResults,
  }
});

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export {
  groupByInseeCode,
  filterProperties,
  transformObjAndKeys,
  pipe,
}
