import { DEMO_NOW } from "../data/generator.js";
import { listParameters, getParameter, normValue } from "../data/catalog.js";
import { getSeries, getMicrodistricts, listStations } from "../data/query.js";
import { SOIL_POINTS, WATER_POINTS, WILDLIFE_POINTS, GREENERY_POINTS } from "../data/periodic_sites.js";
import { CHART_PALETTE, chartDefaults } from "../charts/defaults.js";
import { escapeHtml, formatDate, formatNumber, rangeForPeriod, selectedValues, setOptions } from "./common.js";

export const SITES_BY_SECTION = Object.freeze({ soil: SOIL_POINTS, "surface-water": WATER_POINTS, wildlife: WILDLIFE_POINTS, greenery: GREENERY_POINTS, noise: listStations() });
function fmt(value, parameter) { return value === null || value === undefined ? "–" : `${formatNumber(value, parameter.precision)} ${parameter.unit}`; }
function initChart(root, key, config) {
  const canvas = root.querySelector(`[data-chart="${key}"]`);
  if (!canvas || !window.Chart) return;
  if (canvas._kmsChart) canvas._kmsChart.destroy();
  canvas._kmsChart = new window.Chart(canvas.getContext("2d"), config);
}
function getRange(root) {
  const period = root.querySelector('[data-field="period"]').value;
  return { ...rangeForPeriod(period, DEMO_NOW), resolution: "daily" };
}
function sitesForSection(section) { return SITES_BY_SECTION[section] || listStations(); }
function populateSites(root, section, previous = []) {
  const district = root.querySelector('[data-field="district"]').value;
  const sites = sitesForSection(section).filter((site) => district === "all" || site.districtId === district);
  const retained = previous.filter((id) => sites.some((site) => site.id === id));
  const selected = retained.length ? retained : sites.slice(0, 3).map((site) => site.id);
  setOptions(root.querySelector('[data-field="sites"]'), sites, { value: (item) => item.id, label: (item) => `${item.shortName} · ${item.address}`, selected });
}
function populate(root, section) {
  const parameters = listParameters(section);
  setOptions(root.querySelector('[data-field="parameter"]'), parameters, { label: (item) => `${item.name} · ${item.unit}`, selected: [parameters[0]?.id] });
  setOptions(root.querySelector('[data-field="district"]'), [{ id: "all", name: "Visi mikrorajonai" }, ...getMicrodistricts().map((item) => ({ id: item.properties.id, name: item.properties.name }))]);
  populateSites(root, section);
}
function currentSites(root, section) {
  const district = root.querySelector('[data-field="district"]').value;
  return sitesForSection(section).filter((site) => selectedValues(root.querySelector('[data-field="sites"]')).includes(site.id) && (district === "all" || site.districtId === district));
}
function summarize(series, parameter) {
  const values = series.map((item) => item.value).filter(Number.isFinite);
  const limit = normValue(parameter, "limit");
  if (!values.length) return { min: null, max: null, mean: null, count: 0, exceedances: 0 };
  return { min: Math.min(...values), max: Math.max(...values), mean: values.reduce((sum, value) => sum + value, 0) / values.length, count: values.length, exceedances: limit === null ? 0 : values.filter((value) => value > limit).length };
}
function render(root, section) {
  const parameter = getParameter(root.querySelector('[data-field="parameter"]').value) || listParameters(section)[0];
  const sites = currentSites(root, section);
  const range = getRange(root);
  const seriesBySite = sites.map((site) => ({ site, series: getSeries(parameter.id, site.id, range) }));
  const stats = summarize(seriesBySite.flatMap((item) => item.series), parameter);
  root.querySelector('[data-role="summary"]').innerHTML = `<div class="stat-card"><span class="stat-label">Mėginių kiekis</span><strong class="stat-value">${stats.count}</strong><span class="stat-note">periodiniai įrašai</span></div><div class="stat-card"><span class="stat-label">Mažiausia</span><strong class="stat-value">${fmt(stats.min, parameter)}</strong></div><div class="stat-card"><span class="stat-label">Didžiausia</span><strong class="stat-value">${fmt(stats.max, parameter)}</strong></div><div class="stat-card stat-card--accent"><span class="stat-label">Vidurkis</span><strong class="stat-value">${fmt(stats.mean, parameter)}</strong></div><div class="stat-card"><span class="stat-label">Virš normos</span><strong class="stat-value">${stats.exceedances}</strong><span class="stat-note">${normValue(parameter, "limit") === null ? "norma nenustatyta" : fmt(normValue(parameter, "limit"), parameter)}</span></div>`;
  root.querySelector('[data-role="status"]').textContent = `${sites.length} taškai · ${parameter.name}`;

  const rows = seriesBySite.flatMap(({ site, series }) => series.map((item) => `<tr><td>${escapeHtml(site.shortName)}</td><td>${escapeHtml(site.address)}</td><td>${formatDate(item.timestamp)}</td><td class="${normValue(parameter, "limit") !== null && item.value > normValue(parameter, "limit") ? "value-exceedance" : ""}">${fmt(item.value, parameter)}</td><td>${item.status || "GALIOJANTIS"}</td></tr>`)).join("");
  root.querySelector('[data-role="table"]').innerHTML = `<table class="data-table"><caption>Periodinių mėginių lentelė</caption><thead><tr><th>Taškas</th><th>Adresas</th><th>Data</th><th>Reikšmė</th><th>Būsena</th></tr></thead><tbody>${rows || `<tr><td colspan="5">Pasirinktu laikotarpiu duomenų nerasta.</td></tr>`}</tbody></table>`;

  if (root.dataset.presentation === "bar") {
    const latest = seriesBySite.map(({ site, series }) => ({ site, record: series.at(-1) })).filter((item) => item.record);
    const barColors = latest.map((_, index) => CHART_PALETTE[index % CHART_PALETTE.length]);
    initChart(root, "main", { type: "bar", data: { labels: latest.map((item) => item.site.shortName), datasets: [{ label: parameter.name, data: latest.map((item) => item.record.value), backgroundColor: barColors, borderColor: barColors, borderWidth: 1 }] }, options: chartDefaults({ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: parameter.unit } } } }) });
  } else {
    const labels = [...new Set(seriesBySite.flatMap((item) => item.series.map((record) => record.timestamp)))].sort();
    const datasets = seriesBySite.map(({ site, series }, index) => { const byDate = new Map(series.map((record) => [record.timestamp, record.value])); return { label: site.shortName, data: labels.map((label) => byDate.get(label) ?? null), borderColor: CHART_PALETTE[index % CHART_PALETTE.length], backgroundColor: CHART_PALETTE[index % CHART_PALETTE.length], tension: .2, spanGaps: true, pointRadius: 3 }; });
    initChart(root, "main", { type: "line", data: { labels: labels.map(formatDate), datasets }, options: chartDefaults({ scales: { y: { beginAtZero: true, title: { display: true, text: parameter.unit } }, x: { ticks: { maxTicksLimit: 10 } } } }) });
  }
}
export function initPeriodic(root) {
  const section = root.dataset.periodicSection;
  populate(root, section);
  root.querySelector('[data-field="period"]').value = root.dataset.defaultPeriod || "730d";
  const redraw = () => render(root, section);
  ["parameter", "period", "sites"].forEach((field) => root.querySelector(`[data-field="${field}"]`).addEventListener("change", redraw));
  root.querySelector('[data-field="district"]').addEventListener("change", () => {
    const previous = selectedValues(root.querySelector('[data-field="sites"]'));
    populateSites(root, section, previous);
    redraw();
  });
  root.querySelector('[data-action="apply"]').addEventListener("click", redraw);
  redraw();
  return { render: redraw };
}
