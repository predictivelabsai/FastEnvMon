export const STATIONS = Object.freeze([
  { id: "KA-01", shortName: "KA-01", name: "Senamiesčio oro kokybės stotelė", address: "Bangų g. 19", districtId: "senamiestis", lat: 55.7075, lon: 21.1347, type: "Savivaldybės stotelė", commissioned: "2018-05-14", parameters: ["automatic-air", "laboratory-air", "meteorology"] },
  { id: "KA-02", shortName: "KA-02", name: "Šiaurinės miesto dalies oro kokybės stotelė", address: "Liepojos g. 3", districtId: "giruliai", lat: 55.7381, lon: 21.1338, type: "Savivaldybės stotelė", commissioned: "2019-03-21", parameters: ["automatic-air", "meteorology"] },
  { id: "KA-03", shortName: "KA-03", name: "Šilutės plento oro kokybės stotelė", address: "Šilutės pl. 10", districtId: "silutes-plentas", lat: 55.6839, lon: 21.1651, type: "Savivaldybės stotelė", commissioned: "2018-10-08", parameters: ["automatic-air", "laboratory-air", "meteorology"] },
  { id: "KA-04", shortName: "KA-04", name: "Pietinės arterijos oro kokybės stotelė", address: "Taikos pr. 1", districtId: "taikos-pr", lat: 55.7045, lon: 21.1437, type: "Savivaldybės stotelė", commissioned: "2017-11-06", parameters: ["automatic-air", "meteorology"] },
  { id: "KA-05", shortName: "KA-05", name: "Baltijos prospekto oro kokybės stotelė", address: "Baltijos pr. 31", districtId: "baltijos-pr", lat: 55.7168, lon: 21.1745, type: "Savivaldybės stotelė", commissioned: "2020-02-17", parameters: ["automatic-air", "laboratory-air", "meteorology"] },
  { id: "KA-06", shortName: "KA-06", name: "Smiltynės oro kokybės stotelė", address: "Smiltynė, Kuršių nerija", districtId: "smiltyne", lat: 55.6881, lon: 21.1288, type: "Savivaldybės stotelė", commissioned: "2019-06-10", parameters: ["automatic-air", "meteorology"] },
  { id: "KA-07", shortName: "KA-07", name: "Melnragės oro kokybės stotelė", address: "Melnragė, Molo g. prieigos", districtId: "melnrage-i", lat: 55.7247, lon: 21.0864, type: "Savivaldybės stotelė", commissioned: "2018-08-28", parameters: ["automatic-air", "meteorology"] },
  { id: "KA-08", shortName: "KA-08", name: "Lėliukės oro kokybės stotelė", address: "Lėliukės g. prieigos", districtId: "leliukes", lat: 55.6827, lon: 21.1992, type: "Savivaldybės stotelė", commissioned: "2021-04-12", parameters: ["automatic-air", "meteorology"] },
  { id: "KA-09", shortName: "KA-09", name: "Trinyčių oro kokybės stotelė", address: "Trinyčių g. prieigos", districtId: "trinyciai", lat: 55.7441, lon: 21.1861, type: "Savivaldybės stotelė", commissioned: "2020-09-25", parameters: ["automatic-air", "meteorology"] },
  { id: "KA-10", shortName: "KA-10", name: "Tauralaukio oro kokybės stotelė", address: "Tauralaukis, Liepų g. prieigos", districtId: "tauralaukis", lat: 55.7631, lon: 21.1733, type: "Savivaldybės stotelė", commissioned: "2022-05-19", parameters: ["automatic-air", "meteorology"] }
]);

export const IOT_DEVICES = Object.freeze([
  { id: "IoT-01", shortName: "IoT-01", name: "AeroSense uosto vartų jutiklis", vendor: "AeroSense", districtId: "baltijos-pr", lat: 55.7212, lon: 21.1908, type: "Trečiosios šalies IoT", commissioned: "2024-01-15", parameters: ["pm25", "pm10", "no2", "temperature", "humidity", "wind-speed"] },
  { id: "IoT-02", shortName: "IoT-02", name: "ClimaNode Melnragė", vendor: "ClimaNode", districtId: "melnrage-ii", lat: 55.7357, lon: 21.0755, type: "Trečiosios šalies IoT", commissioned: "2024-03-06", parameters: ["pm25", "pm10", "no2", "temperature", "wind-speed"] },
  { id: "IoT-03", shortName: "IoT-03", name: "UrbanAir Taikos prospektas", vendor: "UrbanAir", districtId: "taikos-pr", lat: 55.6965, lon: 21.1524, type: "Trečiosios šalies IoT", commissioned: "2024-04-22", parameters: ["pm25", "pm10", "no2", "temperature", "humidity"] },
  { id: "IoT-04", shortName: "IoT-04", name: "SenseCity Lėliukės", vendor: "SenseCity", districtId: "leliukes", lat: 55.6918, lon: 21.2107, type: "Trečiosios šalies IoT", commissioned: "2024-06-11", parameters: ["pm25", "pm10", "no2", "temperature", "pressure"] },
  { id: "IoT-05", shortName: "IoT-05", name: "BalticWatch Senamiestis", vendor: "BalticWatch", districtId: "senamiestis", lat: 55.7126, lon: 21.1419, type: "Trečiosios šalies IoT", commissioned: "2024-08-30", parameters: ["pm25", "pm10", "no2", "temperature", "wind-direction"] }
]);

const district = (id, name, centroid, coordinates) => ({ type: "Feature", properties: { id, name, centroid }, geometry: { type: "Polygon", coordinates: [coordinates] } });

export const MICRODISTRICTS = Object.freeze([
  district("melnrage-i", "Melnragė I", [55.7252, 21.0892], [[21.069, 55.718], [21.089, 55.715], [21.108, 55.721], [21.109, 55.735], [21.088, 55.741], [21.069, 55.733], [21.069, 55.718]]),
  district("melnrage-ii", "Melnragė II", [55.7387, 21.0728], [[21.055, 55.731], [21.077, 55.729], [21.095, 55.739], [21.092, 55.751], [21.069, 55.752], [21.054, 55.743], [21.055, 55.731]]),
  district("giruliai", "Giruliai", [55.7615, 21.105], [[21.073, 55.750], [21.107, 55.747], [21.139, 55.756], [21.143, 55.775], [21.116, 55.781], [21.081, 55.771], [21.073, 55.750]]),
  district("smiltyne", "Smiltynė", [55.6894, 21.1255], [[21.112, 55.663], [21.134, 55.666], [21.146, 55.694], [21.141, 55.717], [21.121, 55.712], [21.109, 55.687], [21.112, 55.663]]),
  district("senamiestis", "Senamiestis", [55.708, 21.136], [[21.117, 55.699], [21.139, 55.697], [21.157, 55.706], [21.156, 55.720], [21.132, 55.722], [21.116, 55.714], [21.117, 55.699]]),
  district("naujamiestis", "Naujamiestis", [55.7005, 21.158], [[21.142, 55.689], [21.169, 55.688], [21.186, 55.700], [21.179, 55.716], [21.153, 55.718], [21.139, 55.706], [21.142, 55.689]]),
  district("taikos-pr", "Taikos prospektas", [55.689, 21.163], [[21.144, 55.674], [21.177, 55.675], [21.192, 55.688], [21.184, 55.704], [21.157, 55.704], [21.141, 55.691], [21.144, 55.674]]),
  district("baltijos-pr", "Baltijos prospektas", [55.719, 21.182], [[21.156, 55.713], [21.186, 55.708], [21.211, 55.718], [21.212, 55.735], [21.184, 55.739], [21.162, 55.729], [21.156, 55.713]]),
  district("silutes-plentas", "Šilutės plentas", [55.681, 21.176], [[21.166, 55.667], [21.198, 55.668], [21.218, 55.682], [21.207, 55.699], [21.178, 55.702], [21.159, 55.686], [21.166, 55.667]]),
  district("bangos-g", "Bangų g. teritorija", [55.714, 21.158], [[21.137, 55.707], [21.163, 55.707], [21.178, 55.716], [21.173, 55.729], [21.149, 55.729], [21.135, 55.719], [21.137, 55.707]]),
  district("leliukes", "Lėliukės", [55.687, 21.205], [[21.188, 55.674], [21.217, 55.674], [21.224, 55.692], [21.213, 55.704], [21.189, 55.699], [21.179, 55.684], [21.188, 55.674]]),
  district("tauralaukis", "Tauralaukis", [55.762, 21.173], [[21.141, 55.748], [21.169, 55.743], [21.198, 55.751], [21.207, 55.772], [21.178, 55.783], [21.146, 55.773], [21.141, 55.748]]),
  district("trinyciai", "Trinyčiai", [55.745, 21.181], [[21.156, 55.735], [21.185, 55.731], [21.212, 55.741], [21.214, 55.756], [21.184, 55.762], [21.158, 55.751], [21.156, 55.735]]),
  district("banduziai", "Bandužiai", [55.661, 21.183], [[21.147, 55.649], [21.178, 55.645], [21.211, 55.655], [21.215, 55.674], [21.185, 55.679], [21.154, 55.668], [21.147, 55.649]])
]);

export const ALL_SITES = Object.freeze([...STATIONS, ...IOT_DEVICES]);
export const SITE_BY_ID = new Map(ALL_SITES.map((item) => [item.id, item]));
export const DISTRICT_BY_ID = new Map(MICRODISTRICTS.map((item) => [item.properties.id, item]));

export function getSite(id) { return SITE_BY_ID.get(id); }
export function listSites(type = "all") {
  if (type === "stations") return STATIONS.slice();
  if (type === "iot") return IOT_DEVICES.slice();
  return ALL_SITES.slice();
}
