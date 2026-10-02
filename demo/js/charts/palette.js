export const CHART_PALETTE = Object.freeze([
  "#0b2f8b",
  "#4768c7",
  "#197067",
  "#d19a00",
  "#7c4f9e",
  "#a13e00",
  "#537083"
]);

export const STATUS_PALETTE = Object.freeze({
  good: "#50f0e6",
  fair: "#50eaa9",
  moderate: "#f4e400",
  poor: "#fa4600",
  "very-poor": "#e51d1d",
  "extremely-poor": "#a71d17",
  "no-data": "#8798a0"
});

export const MAP_PALETTE = Object.freeze({
  thresholdExceedance: STATUS_PALETTE.poor,
  statusText: "#15333b",
  inverseText: "#ffffff",
  districtOutline: "#4768c7",
  measureOutline: "#0b2f8b",
  measureStart: "#ffde45",
  measureEnd: STATUS_PALETTE.fair
});
