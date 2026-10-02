// Demo-only forward transform: the production system will use the official EPSG:3346 pipeline.
const A = 6378137;
const F = 1 / 298.257223563;
const E2 = F * (2 - F);
const K0 = 0.9998;
const LON0 = 24 * Math.PI / 180;
const FALSE_EASTING = 500000;

export function toLks94(lat, lon) {
  const phi = lat * Math.PI / 180;
  const lambda = lon * Math.PI / 180;
  const ep2 = E2 / (1 - E2);
  const n = A / Math.sqrt(1 - E2 * Math.sin(phi) ** 2);
  const t = Math.tan(phi) ** 2;
  const c = ep2 * Math.cos(phi) ** 2;
  const a = Math.cos(phi) * (lambda - LON0);
  const m = A * ((1 - E2 / 4 - 3 * E2 ** 2 / 64 - 5 * E2 ** 3 / 256) * phi
    - (3 * E2 / 8 + 3 * E2 ** 2 / 32 + 45 * E2 ** 3 / 1024) * Math.sin(2 * phi)
    + (15 * E2 ** 2 / 256 + 45 * E2 ** 3 / 1024) * Math.sin(4 * phi)
    - (35 * E2 ** 3 / 3072) * Math.sin(6 * phi));

  const easting = FALSE_EASTING + K0 * n * (a + (1 - t + c) * a ** 3 / 6 + (5 - 18 * t + t ** 2 + 72 * c - 58 * ep2) * a ** 5 / 120);
  const northing = K0 * (m + n * Math.tan(phi) * (a ** 2 / 2 + (5 - t + 9 * c + 4 * c ** 2) * a ** 4 / 24 + (61 - 58 * t + t ** 2 + 600 * c - 330 * ep2) * a ** 6 / 720));

  return { easting: Math.round(easting), northing: Math.round(northing) };
}
