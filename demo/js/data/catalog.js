const emptyNorms = { recommended: null, target: null, limit: null, defaultLevel: "limit" };

function parameter(id, section, name, unit, min, max, frequency, norms = emptyNorms, precision = 1, extra = {}) {
  return Object.freeze({ id, section, name, unit, range: { min, max }, frequency, norms, precision, ...extra });
}

const automaticAir = [
  parameter("pm25", "automatic-air", "Kietosios dalelės KD 2,5", "µg/m³", 0, 10000, "60 min", { recommended: 15, target: 10, limit: 25, defaultLevel: "limit" }),
  parameter("pm10", "automatic-air", "Kietosios dalelės KD 10", "µg/m³", 0, 10000, "60 min", { recommended: 25, target: 20, limit: 40, defaultLevel: "limit" }),
  parameter("no2", "automatic-air", "Azoto dioksidas NO₂", "µg/m³", 0, 1000, "60 min", { recommended: 20, target: 30, limit: 40, defaultLevel: "limit" }),
  parameter("co", "automatic-air", "Anglies monoksidas CO", "mg/m³", 0, 100, "60 min", { recommended: 5, target: 7, limit: 10, defaultLevel: "limit" }),
  parameter("h2s", "automatic-air", "Sieros vandenilis H₂S", "µg/m³", 0, 1000, "30 min", { recommended: 5, target: 10, limit: 15, defaultLevel: "limit" }),
  parameter("nh3", "automatic-air", "Amoniakas NH₃", "µg/m³", 0, 1000, "60 min", { recommended: 10, target: 20, limit: 50, defaultLevel: "limit" }),
  parameter("benzene", "automatic-air", "Benzenas", "µg/m³", 0, 1000, "30 min", { recommended: 2, target: 3, limit: 5, defaultLevel: "limit" }),
  parameter("toluene", "automatic-air", "Toluenas", "µg/m³", 0, 1000, "30 min", { recommended: 30, target: 50, limit: 100, defaultLevel: "limit" }),
  parameter("ethylbenzene", "automatic-air", "Etilbenzenas", "µg/m³", 0, 1000, "30 min", { recommended: 10, target: 20, limit: 50, defaultLevel: "limit" }),
  parameter("mp-xylene", "automatic-air", "m,p-ksilenas", "µg/m³", 0, 1000, "30 min", { recommended: 20, target: 40, limit: 70, defaultLevel: "limit" }),
  parameter("o-xylene", "automatic-air", "o-ksilenas", "µg/m³", 0, 1000, "30 min", { recommended: 10, target: 20, limit: 50, defaultLevel: "limit" }),
  parameter("voc-sum", "automatic-air", "Suminiai LOJ", "µg/m³", 0, 1000, "30 min", { recommended: 100, target: 150, limit: 250, defaultLevel: "limit" })
];

const laboratoryAir = [
  parameter("pm25-lab", "laboratory-air", "Kietosios dalelės KD 2,5", "µg/m³", 0, 10000, "120 d", { recommended: 15, target: 10, limit: 25, defaultLevel: "limit" }),
  parameter("pm10-lab", "laboratory-air", "Kietosios dalelės KD 10", "µg/m³", 0, 10000, "120 d", { recommended: 25, target: 20, limit: 40, defaultLevel: "limit" }),
  parameter("no2-lab", "laboratory-air", "Azoto dioksidas NO₂", "µg/m³", 0, 1000, "120 d", { recommended: 20, target: 30, limit: 40, defaultLevel: "limit" }),
  parameter("so2-lab", "laboratory-air", "Sieros dioksidas SO₂", "µg/m³", 0, 1000, "120 d", { recommended: 50, target: 75, limit: 125, defaultLevel: "limit" }),
  parameter("benzene-lab", "laboratory-air", "Benzenas", "µg/m³", 0, 1000, "120 d", { recommended: 2, target: 3, limit: 5, defaultLevel: "limit" }),
  parameter("toluene-lab", "laboratory-air", "Toluenas", "µg/m³", 0, 1000, "120 d", { recommended: 30, target: 50, limit: 100, defaultLevel: "limit" }),
  parameter("ethylbenzene-lab", "laboratory-air", "Etilbenzenas", "µg/m³", 0, 1000, "120 d", { recommended: 10, target: 20, limit: 50, defaultLevel: "limit" }),
  parameter("mp-xylene-lab", "laboratory-air", "m,p-ksilenas", "µg/m³", 0, 1000, "120 d", { recommended: 20, target: 40, limit: 70, defaultLevel: "limit" }),
  parameter("o-xylene-lab", "laboratory-air", "o-ksilenas", "µg/m³", 0, 1000, "120 d", { recommended: 10, target: 20, limit: 50, defaultLevel: "limit" }),
  parameter("h2s-lab", "laboratory-air", "Sieros vandenilis H₂S", "µg/m³", 0, 1000, "120 d", { recommended: 5, target: 10, limit: 15, defaultLevel: "limit" }),
  parameter("nh3-lab", "laboratory-air", "Amoniakas NH₃", "µg/m³", 0, 1000, "120 d", { recommended: 10, target: 20, limit: 50, defaultLevel: "limit" }),
  parameter("co-lab", "laboratory-air", "Anglies monoksidas CO", "mg/m³", 0, 100, "120 d", { recommended: 5, target: 7, limit: 10, defaultLevel: "limit" }),
  parameter("skd", "laboratory-air", "Suspenduotos kietosios dalelės SKD", "mg/m³", 0, 100, "120 d", { recommended: 0.08, target: 0.12, limit: 0.2, defaultLevel: "limit" })
];

const noise = [
  parameter("l-day", "noise", "Dienos triukšmo rodiklis Ldienos", "dBA", 0, 130, "120 d", { recommended: 55, target: 60, limit: 65, defaultLevel: "limit" }),
  parameter("l-evening", "noise", "Vakaro triukšmo rodiklis Lvakaro", "dBA", 0, 130, "120 d", { recommended: 50, target: 55, limit: 60, defaultLevel: "limit" }),
  parameter("l-night", "noise", "Nakties triukšmo rodiklis Lnakties", "dBA", 0, 130, "120 d", { recommended: 45, target: 50, limit: 55, defaultLevel: "limit" }),
  parameter("l-den", "noise", "Dienos, vakaro ir nakties rodiklis Ldvn", "dBA", 0, 130, "120 d", { recommended: 55, target: 60, limit: 65, defaultLevel: "limit" }),
  parameter("l-day-max", "noise", "Dienos maksimalus triukšmo lygis", "dBA", 0, 130, "120 d", { recommended: 65, target: 70, limit: 75, defaultLevel: "limit" }),
  parameter("l-evening-max", "noise", "Vakaro maksimalus triukšmo lygis", "dBA", 0, 130, "120 d", { recommended: 60, target: 65, limit: 70, defaultLevel: "limit" }),
  parameter("l-night-max", "noise", "Nakties maksimalus triukšmo lygis", "dBA", 0, 130, "120 d", { recommended: 55, target: 60, limit: 65, defaultLevel: "limit" })
];

const soil = [
  ["as", "Arsenas As", 1000, 20], ["ba", "Baris Ba", 5000, 300], ["cr", "Chromas Cr", 1000, 100], ["co-soil", "Kobaltas Co", 1000, 50],
  ["cu", "Varis Cu", 1000, 100], ["mn", "Manganas Mn", 10000, 500], ["mo", "Molibdenas Mo", 1000, 30], ["ni", "Nikelis Ni", 1000, 75],
  ["pb", "Švinas Pb", 1000, 100], ["sn", "Alavas Sn", 1000, 50], ["v", "Vanadis V", 2000, 150], ["zn", "Cinkas Zn", 3000, 300],
  ["petroleum-c10-c40", "Naftos produktai C10–C40", 1000, 300]
].map(([id, name, max, limit]) => parameter(id, "soil", name, "mg/kg", 0, max, "12 months", { recommended: limit * 0.45, target: limit * 0.7, limit, defaultLevel: "limit" }, 1));

const water = [
  ["nb", "Bendras azotas Nb", "mg/l", 30, 5], ["nh4-n", "Amonio azotas NH₄-N", "mg/l", 30, 1], ["no3-n", "Nitratų azotas NO₃-N", "mg/l", 30, 10],
  ["pb-water", "Bendras fosforas Pb", "mg/l", 10, 0.3], ["po4-p", "Fosfatų fosforas PO₄-P", "mg/l", 10, 0.2], ["bds7", "Biocheminis deguonies suvartojimas BDS7", "mg/l", 30, 6],
  ["o2", "Ištirpęs deguonis O₂", "mg/l", 50, 5], ["secchi", "Seki (Secchi) gylis", "cm", 300, null], ["phytoplankton-taxonomy", "Fitoplanktono taksonominė sudėtis", "vnt.", 100, null],
  ["phytoplankton-abundance", "Fitoplanktono gausumas", "tūkst. vnt./l", 40000, 12000], ["phytoplankton-biomass", "Fitoplanktono biomasė", "mg/l", 100, 20],
  ["macroinvertebrate-taxonomy", "Makrobestuburių taksonominė sudėtis", "vnt.", 100, null], ["macroinvertebrate-abundance", "Makrobestuburių gausumas", "ind./l", 300, 120]
].map(([id, name, unit, max, limit], index) => parameter(id, "surface-water", name, unit, 0, max, "12 months", { recommended: limit === null ? null : limit * 0.55, target: limit === null ? null : limit * 0.75, limit, defaultLevel: "limit" }, index === 1 || index === 9 ? 0 : 1));

const wildlife = [
  ["flora-species", "Augalija: rūšių skaičius", "vnt.", 200, 120], ["flora-abundance", "Augalija: rūšių gausumas ir padengimas", "balai", 10, 7],
  ["invasive-species", "Invazinės rūšys: rūšių skaičius", "vnt.", 50, 10], ["invasive-abundance", "Invazinės rūšys: gausumas ir padengimas", "balai", 10, 5],
  ["bird-species", "Paukščiai: rūšių skaičius", "vnt.", 500, 300], ["bird-abundance", "Paukščiai: atskirų rūšių gausumas", "vnt.", 2000, 1000],
  ["corvid-species", "Varniniai paukščiai: rūšių skaičius", "vnt.", 10, 7], ["corvid-abundance", "Varniniai paukščiai: atskirų rūšių gausumas", "vnt.", 2000, 900],
  ["bat-species", "Šikšnosparniai: rūšių skaičius", "vnt.", 20, 12], ["bat-abundance", "Šikšnosparniai: atskirų rūšių gausumas", "vnt.", 1500, 800],
  ["amphibian-species", "Varliagyviai ir ropliai: rūšių skaičius", "vnt.", 30, 20], ["amphibian-abundance", "Varliagyviai ir ropliai: atskirų rūšių gausumas", "vnt.", 200, 100],
  ["fish-species", "Žuvys: rūšių skaičius", "vnt.", 100, 60], ["fish-abundance-water", "Žuvys: gausumas telkiniuose", "ind./ha", 3000, 1500], ["fish-biomass-water", "Žuvys: biomasė telkiniuose", "kg/ha", 500, 260],
  ["fish-abundance-river", "Žuvys: gausumas upėse", "ind./100 m²", 3000, 1500], ["fish-biomass-river", "Žuvys: biomasė upėse", "kg/100 m²", 500, 260], ["fish-age", "Žuvys: individo amžius", "m.", 30, 20]
].map(([id, name, unit, max, limit], index) => parameter(id, "wildlife", name, unit, 0, max, "12 months", { recommended: limit * 0.55, target: limit * 0.75, limit, defaultLevel: "limit" }, index === 0 || index === 2 || index === 4 || index === 6 || index === 8 || index === 10 || index === 12 || index === 18 ? 0 : 1));

const greenery = [
  ["crown-condition", "Lajos būklė"], ["foliage-condition", "Lapijos ir spyglių būklė"], ["trunk-condition", "Kamieno būklė"],
  ["mechanical-damage", "Žievės, kamieno, šakų, šaknų, lapų ir spyglių mechaniniai pažeidimai"], ["understory-condition", "Pomedžio būklė"]
].map(([id, name]) => parameter(id, "greenery", name, "balai", 0, 10, "12 months", { recommended: 8, target: 7, limit: 5, defaultLevel: "limit" }, 1));

const meteorological = [
  parameter("temperature", "meteorology", "Aplinkos oro temperatūra", "°C", -50, 50, "60 min", emptyNorms, 1),
  parameter("humidity", "meteorology", "Santykinis oro drėgnis", "% RH", 0, 100, "60 min", emptyNorms, 1),
  parameter("pressure", "meteorology", "Atmosferos slėgis", "hPa", 300, 1100, "60 min", emptyNorms, 0),
  parameter("wind-speed", "meteorology", "Vėjo greitis", "m/s", 0, 40, "60 min", emptyNorms, 1),
  parameter("wind-direction", "meteorology", "Vėjo kryptis", "°", 0, 360, "60 min", emptyNorms, 0)
];

export const CATALOG = Object.freeze([
  ...automaticAir,
  ...laboratoryAir,
  ...noise,
  ...soil,
  ...water,
  ...wildlife,
  ...greenery,
  ...meteorological
]);

export const SECTIONS = Object.freeze([
  { id: "automatic-air", name: "Automatinis aplinkos oras", menuName: "Automatinių stotelių duomenys" },
  { id: "laboratory-air", name: "Laboratorinis aplinkos oras", menuName: "Monitoringo (laboratoriniai) duomenys" },
  { id: "noise", name: "Aplinkos triukšmas", menuName: "Aplinkos triukšmo monitoringas" },
  { id: "soil", name: "Dirvožemis", menuName: "Dirvožemio monitoringas" },
  { id: "surface-water", name: "Paviršinis vanduo", menuName: "Paviršinio vandens monitoringas" },
  { id: "wildlife", name: "Gyvoji gamta", menuName: "Gyvosios gamtos monitoringas" },
  { id: "greenery", name: "Želdynai ir želdiniai", menuName: "Želdynų ir želdinių monitoringas" },
  { id: "meteorology", name: "Meteorologija", menuName: "Susiję meteorologiniai duomenys" }
]);

export const PARAMETER_BY_ID = new Map(CATALOG.map((item) => [item.id, item]));
export const SECTION_BY_ID = new Map(SECTIONS.map((item) => [item.id, item]));

export function getParameter(id) { return PARAMETER_BY_ID.get(id); }
export function listParameters(sectionId) { return sectionId ? CATALOG.filter((item) => item.section === sectionId) : CATALOG.slice(); }
export function normValue(parameterItem, level = parameterItem?.norms?.defaultLevel || "limit") {
  return parameterItem?.norms?.[level] ?? null;
}
