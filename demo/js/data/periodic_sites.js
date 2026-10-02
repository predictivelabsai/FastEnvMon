export const SOIL_POINTS = Object.freeze([
  { id: "DT-01", shortName: "DT-01", name: "Poilsio parko dirvožemio mėginių ėmimo taškas", address: "Kretingos g. 92", districtId: "giruliai", lat: 55.7472, lon: 21.1305, type: "Mėginių ėmimo taškas", parameters: ["soil"] },
  { id: "DT-02", shortName: "DT-02", name: "Buvusios pramonės teritorijos dirvožemio mėginių ėmimo taškas", address: "Minijos g. 145", districtId: "silutes-plentas", lat: 55.6688, lon: 21.1904, type: "Mėginių ėmimo taškas", parameters: ["soil"] },
  { id: "DT-03", shortName: "DT-03", name: "Karališkojo miško dirvožemio mėginių ėmimo taškas", address: "Karališkojo miško takas", districtId: "tauralaukis", lat: 55.7571, lon: 21.1488, type: "Mėginių ėmimo taškas", parameters: ["soil"] },
  { id: "DT-04", shortName: "DT-04", name: "Smiltynės dirvožemio mėginių ėmimo taškas", address: "Smiltynė, centrinių kopų prieigos", districtId: "smiltyne", lat: 55.6887, lon: 21.1234, type: "Mėginių ėmimo taškas", parameters: ["soil"] },
  { id: "DT-05", shortName: "DT-05", name: "Girulių kopos dirvožemio mėginių ėmimo taškas", address: "Girulių pl. prieigos", districtId: "giruliai", lat: 55.7634, lon: 21.1048, type: "Mėginių ėmimo taškas", parameters: ["soil"] },
  { id: "DT-06", shortName: "DT-06", name: "Buvusio sąvartyno teritorijos dirvožemio mėginių ėmimo taškas", address: "Lėliukės g. prieigos", districtId: "leliukes", lat: 55.6901, lon: 21.2072, type: "Mėginių ėmimo taškas", parameters: ["soil"] }
]);

export const WATER_POINTS = Object.freeze([
  { id: "VT-01", shortName: "VT-01", name: "Danės upės žemupio vandens telkinio taškas", address: "Danės krantinė ties Biržos tiltu", districtId: "senamiestis", lat: 55.7108, lon: 21.1369, type: "Vandens telkinio taškas", parameters: ["surface-water"] },
  { id: "VT-02", shortName: "VT-02", name: "Danės upės vidurupio vandens telkinio taškas", address: "Danės upės slėnis ties Trinyčiais", districtId: "trinyciai", lat: 55.7447, lon: 21.1788, type: "Vandens telkinio taškas", parameters: ["surface-water"] },
  { id: "VT-03", shortName: "VT-03", name: "Tauralaukio tvenkinio vandens telkinio taškas", address: "Tauralaukio tvenkinys", districtId: "tauralaukis", lat: 55.7653, lon: 21.1737, type: "Vandens telkinio taškas", parameters: ["surface-water"] },
  { id: "VT-04", shortName: "VT-04", name: "Smiltynės marių pakrantės vandens telkinio taškas", address: "Smiltynė, marių pakrantė", districtId: "smiltyne", lat: 55.6868, lon: 21.1287, type: "Vandens telkinio taškas", parameters: ["surface-water"] },
  { id: "VT-05", shortName: "VT-05", name: "Lėliukės tvenkinio vandens telkinio taškas", address: "Lėliukės g. tvenkinys", districtId: "leliukes", lat: 55.6884, lon: 21.2078, type: "Vandens telkinio taškas", parameters: ["surface-water"] }
]);

export const WILDLIFE_POINTS = Object.freeze([
  { id: "GS-01", shortName: "GS-01", name: "Karališkojo miško gyvosios gamtos stebėjimo taškas", address: "Karališkojo miško takas", districtId: "tauralaukis", lat: 55.7588, lon: 21.1531, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-02", shortName: "GS-02", name: "Girulių kopos gyvosios gamtos stebėjimo taškas", address: "Girulių kopa, miško prieigos", districtId: "giruliai", lat: 55.7621, lon: 21.1067, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-03", shortName: "GS-03", name: "Smiltynės senojo miško gyvosios gamtos stebėjimo taškas", address: "Smiltynė, senasis miškas", districtId: "smiltyne", lat: 55.6854, lon: 21.1208, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-04", shortName: "GS-04", name: "Danės kanalo gyvosios gamtos stebėjimo taškas", address: "Danės kanalo pakrantė", districtId: "trinyciai", lat: 55.7431, lon: 21.1862, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-05", shortName: "GS-05", name: "Makšamių pievų gyvosios gamtos stebėjimo taškas", address: "Makšamių pievos", districtId: "tauralaukis", lat: 55.7549, lon: 21.1884, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-06", shortName: "GS-06", name: "Melnragės pajūrio gyvosios gamtos stebėjimo taškas", address: "Melnragė, pajūrio buveinės", districtId: "melnrage-i", lat: 55.7258, lon: 21.0876, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-07", shortName: "GS-07", name: "Ąžuolyno gyvosios gamtos stebėjimo taškas", address: "Ąžuolyno takas prie Kretingos g.", districtId: "giruliai", lat: 55.7398, lon: 21.1398, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] },
  { id: "GS-08", shortName: "GS-08", name: "Jono kalnelio gyvosios gamtos stebėjimo taškas", address: "Jono kalnelio skveras", districtId: "bangos-g", lat: 55.7144, lon: 21.1518, type: "Gyvosios gamtos stebėjimo taškas", parameters: ["wildlife"] }
]);

export const GREENERY_POINTS = Object.freeze([
  { id: "ZG-01", shortName: "ZG-01", name: "Skulptūrų parko želdynų plotas", address: "K. Donelaičio g. 10", districtId: "naujamiestis", lat: 55.7144, lon: 21.1427, type: "Želdynų plotas", parameters: ["greenery"] },
  { id: "ZG-02", shortName: "ZG-02", name: "Trinyčių parko želdynų plotas", address: "Trinyčių g. 2", districtId: "trinyciai", lat: 55.7442, lon: 21.1851, type: "Želdynų plotas", parameters: ["greenery"] },
  { id: "ZG-03", shortName: "ZG-03", name: "Debreceno prospekto želdynų plotas", address: "Debreceno g. skiriamoji juosta", districtId: "taikos-pr", lat: 55.6798, lon: 21.1739, type: "Želdynų plotas", parameters: ["greenery"] },
  { id: "ZG-04", shortName: "ZG-04", name: "Sąjūdžio parko želdynų plotas", address: "Sąjūdžio parko prieigos", districtId: "baltijos-pr", lat: 55.7231, lon: 21.1858, type: "Želdynų plotas", parameters: ["greenery"] },
  { id: "ZG-05", shortName: "ZG-05", name: "Smiltynės krantinės želdynų plotas", address: "Smiltynė, krantinės prieigos", districtId: "smiltyne", lat: 55.6882, lon: 21.1271, type: "Želdynų plotas", parameters: ["greenery"] },
  { id: "ZG-06", shortName: "ZG-06", name: "Danės skvero želdynų plotas", address: "Danės skveras", districtId: "senamiestis", lat: 55.7119, lon: 21.1388, type: "Želdynų plotas", parameters: ["greenery"] }
]);

export const PERIODIC_SITES = Object.freeze([...SOIL_POINTS, ...WATER_POINTS, ...WILDLIFE_POINTS, ...GREENERY_POINTS]);
export function getPeriodicSite(id) { return PERIODIC_SITES.find((site) => site.id === id); }
