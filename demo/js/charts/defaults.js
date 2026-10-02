export { CHART_PALETTE } from "./palette.js";

const PLUS_JAKARTA_SANS_STACK = '"Plus Jakarta Sans", Arial, sans-serif';
const INK_600 = "#537083";
const INK_500 = "#5b7383";
const LINE = "#d6e2e6";

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, overrides) {
  const merged = { ...base };
  Object.entries(overrides || {}).forEach(([key, value]) => {
    if (isObject(value) && isObject(base?.[key])) merged[key] = deepMerge(base[key], value);
    else if (Array.isArray(value)) merged[key] = value.slice();
    else merged[key] = value;
  });
  return merged;
}

function scaleDefaults(axis) {
  return {
    ticks: {
      color: INK_500,
      font: { family: PLUS_JAKARTA_SANS_STACK, size: 11 },
      padding: 6,
      ...(axis === "y" ? { maxTicksLimit: 7 } : {})
    },
    grid: {
      color: LINE,
      drawBorder: false,
      ...(axis === "y" ? { borderDash: [] } : {})
    },
    border: { display: false },
    title: {
      color: INK_600,
      font: { family: PLUS_JAKARTA_SANS_STACK, size: 11, weight: 600 },
      padding: 6
    }
  };
}

const BASE_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 350 },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        boxHeight: 10,
        padding: 14,
        color: INK_600,
        font: { family: PLUS_JAKARTA_SANS_STACK, size: 12, weight: 500 }
      }
    },
    tooltip: {
      mode: "index",
      intersect: false,
      backgroundColor: "#0f2830",
      padding: 10,
      cornerRadius: 8,
      titleFont: { family: PLUS_JAKARTA_SANS_STACK, size: 12, weight: 600 },
      bodyFont: { family: PLUS_JAKARTA_SANS_STACK, size: 12 },
      titleColor: "#f8fbfb",
      bodyColor: "#f8fbfb",
      boxPadding: 6
    }
  },
  interaction: { mode: "index", intersect: false }
};

export function chartDefaults(overrides = {}) {
  const requestedScales = overrides.scales || {};
  const scaleKeys = new Set(["x", "y", ...Object.keys(requestedScales)]);
  const scales = {};

  scaleKeys.forEach((key) => {
    const axis = key.startsWith("y") ? "y" : "x";
    scales[key] = deepMerge(scaleDefaults(axis), requestedScales[key] || {});
  });

  return deepMerge(BASE_OPTIONS, { ...overrides, scales });
}

if (typeof window !== "undefined" && window.Chart) {
  window.Chart.defaults.font.family = PLUS_JAKARTA_SANS_STACK;
  window.Chart.defaults.color = INK_500;
  if (window.Chart.defaults.scale?.ticks) window.Chart.defaults.scale.ticks.color = INK_500;
}
