import { DEMO_NOW, HISTORY_START } from "../data/generator.js";
import { listParameters, getParameter, normValue } from "../data/catalog.js";
import { getSeries, getMicrodistricts, listStations, getStats, compareSites, correlate } from "../data/query.js";
import { chartDefaults } from "../charts/defaults.js";
import { CHART_PALETTE, MAP_PALETTE } from "../charts/palette.js";
import { destroyChart, escapeHtml, formatNumber, rangeForPeriod, selectedValues, setOptions } from "./common.js";

const sectionNames = { "automatic-air": "Automatinių stotelių duomenys", "laboratory-air": "Monitoringo (laboratoriniai) duomenys", noise: "Aplinkos triukšmo monitoringas" };

function fmt(value, parameter) { return value === null || value === undefined ? "–" : `${formatNumber(value, parameter.precision)} ${parameter.unit}`; }
function siteSupports(site, parameter) { return parameter.section === "noise" ? site.type === "Savivaldybės stotelė" : site.parameters.includes(parameter.section) || site.parameters.includes(parameter.id); }
function valueForStats(records, parameter) {
  const values = records.flatMap((series) => series.map((item) => item.value)).filter(Number.isFinite);
  if (!values.length) return { min: null, max: null, mean: null, logMean: null, exceedanceCount: 0 };
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const logMean = parameter.section === "noise" ? 10 * Math.log10(values.reduce((sum, value) => sum + 10 ** (value / 10), 0) / values.length) : null;
  const limit = normValue(parameter, "limit");
  return { min: Math.min(...values), max: Math.max(...values), mean, logMean, exceedanceCount: limit === null ? 0 : values.filter((value) => value > limit).length, sampleCount: values.length };
}
function trend(current, previous) {
  if (current === null || previous === null || previous === 0) return null;
  return ((current - previous) / Math.abs(previous)) * 100;
}
function trendHtml(value) {
  if (value === null) return `<span class="trend-flat">–</span>`;
  const rounded = formatNumber(Math.abs(value), 1);
  if (value > 0.05) return `<span class="trend-up">↑ ${rounded} %</span>`;
  if (value < -0.05) return `<span class="trend-down">↓ ${rounded} %</span>`;
  return `<span class="trend-flat">→ 0 %</span>`;
}
function datesFor(period, parameter) {
  const range = rangeForPeriod(period, DEMO_NOW);
  const resolution = parameter.frequency === "60 min" || parameter.frequency === "30 min" ? "daily" : "daily";
  return { ...range, resolution };
}
function siteName(site) { return `${site.shortName} · ${site.name}`; }

function statMarkup(stats, parameter, currentMean, trendValue) {
  const averageLabel = parameter.section === "noise" ? "Logaritminis vidurkis" : "Vidurkis";
  const averageValue = parameter.section === "noise" ? stats.logMean : stats.mean;
  return `<div class="stat-card"><span class="stat-label">Mažiausia reikšmė</span><strong class="stat-value">${fmt(stats.min, parameter)}</strong><span class="stat-note">Pasirinktas laikotarpis</span></div>
    <div class="stat-card"><span class="stat-label">Didžiausia reikšmė</span><strong class="stat-value">${fmt(stats.max, parameter)}</strong><span class="stat-note">Pasirinktas laikotarpis</span></div>
    <div class="stat-card stat-card--accent"><span class="stat-label">${averageLabel}</span><strong class="stat-value">${fmt(averageValue, parameter)}</strong><span class="stat-note">${parameter.section === "noise" ? "10 × log₁₀ (galios vidurkis)" : "Aritmetinis vidurkis"}</span></div>
    <div class="stat-card"><span class="stat-label">Viršijimų kiekis</span><strong class="stat-value">${formatNumber(stats.exceedanceCount, 0)}</strong><span class="stat-note">virš ribinės ${normValue(parameter, "limit") === null ? "nenustatyta" : fmt(normValue(parameter, "limit"), parameter)}</span></div>
    <div class="stat-card"><span class="stat-label">Tendencija</span><strong class="stat-value">${trendHtml(trendValue)}</strong><span class="stat-note">vs. analogiškas laikotarpis</span></div>`;
}

function initChart(root, key, config) {
  const canvas = root.querySelector(`[data-chart="${key}"]`);
  if (!canvas || !window.Chart) return null;
  const existing = canvas._kmsChart;
  if (existing) existing.destroy();
  const chart = new window.Chart(canvas.getContext("2d"), config);
  canvas._kmsChart = chart;
  return chart;
}

function getFilterState(root) {
  return {
    period: root.querySelector('[data-field="period"]').value,
    type: root.querySelector('[data-field="type"]').value,
    district: root.querySelector('[data-field="district"]').value,
    address: root.querySelector('[data-field="address"]').value,
    code: root.querySelector('[data-field="code"]').value.trim().toLowerCase(),
    exceedances: root.querySelector('[data-field="exceedances"]').checked,
    sites: selectedValues(root.querySelector('[data-field="sites"]')),
    parameter: root.querySelector('[data-field="parameter"]').value
  };
}

function updateSiteOptions(root, parameter, state) {
  const district = root.querySelector('[data-field="district"]').value;
  const address = root.querySelector('[data-field="address"]').value;
  const code = root.querySelector('[data-field="code"]').value.trim().toLowerCase();
  const candidates = listStations().filter((site) => siteSupports(site, parameter) && (district === "all" || site.districtId === district) && (address === "all" || site.address === address) && (!code || `${site.id} ${site.shortName} ${site.name}`.toLowerCase().includes(code)));
  const options = candidates.filter((site) => {
    if (!root.querySelector('[data-field="exceedances"]').checked) return true;
    const range = datesFor(root.querySelector('[data-field="period"]').value, parameter);
    const limit = normValue(parameter, "limit");
    return limit === null || getSeries(parameter.id, site.id, range).some((item) => item.value > limit);
  });
  const previous = state?.sites?.filter((id) => options.some((site) => site.id === id)) || [];
  const selected = previous.length ? previous : options.slice(0, Math.min(3, options.length)).map((site) => site.id);
  setOptions(root.querySelector('[data-field="sites"]'), options, { value: (site) => site.id, label: siteName, selected });
  if (root.querySelector('[data-role="site-count"]')) root.querySelector('[data-role="site-count"]').textContent = `${options.length} taškai atitinka filtrus`;
  return options;
}

function populateFilters(root, section) {
  const parameters = listParameters(section);
  setOptions(root.querySelector('[data-field="parameter"]'), parameters, { label: (item) => `${item.name} · ${item.unit}` , selected: [parameters[0]?.id] });
  const districts = getMicrodistricts().map((feature) => ({ id: feature.properties.id, name: feature.properties.name }));
  setOptions(root.querySelector('[data-field="district"]'), [{ id: "all", name: "Visi mikrorajonai" }, ...districts]);
  const addresses = [...new Set(listStations().map((site) => site.address))].sort((a, b) => a.localeCompare(b, "lt"));
  setOptions(root.querySelector('[data-field="address"]'), [{ id: "all", name: "Visi adresai" }, ...addresses.map((name) => ({ id: name, name }))], { value: (item) => item.id });
  const part = root.querySelector('[data-field="part"]');
  if (part) setOptions(part, [{ id: section, name: sectionNames[section] || section }]);
}

function renderStationTable(root, parameter, selected, range) {
  const rows = selected.map((site) => {
    const series = getSeries(parameter.id, site.id, range);
    const stats = valueForStats([series], parameter);
    return `<tr><td><strong>${escapeHtml(site.shortName)}</strong><br><span class="fine-print">${escapeHtml(site.address)}</span></td><td>${fmt(stats.min, parameter)}</td><td>${fmt(stats.max, parameter)}</td><td>${fmt(parameter.section === "noise" ? stats.logMean : stats.mean, parameter)}</td><td>${stats.exceedanceCount}</td></tr>`;
  }).join("");
  root.querySelector('[data-role="station-table"]').innerHTML = `<table class="data-table"><caption>Taškų suvestinė pagal pasirinktą laikotarpį</caption><thead><tr><th>Taškas</th><th>Min.</th><th>Maks.</th><th>${parameter.section === "noise" ? "Log. vidurkis" : "Vidurkis"}</th><th>Viršijimai</th></tr></thead><tbody>${rows || `<tr><td colspan="5">Pagal šiuos filtrus įrašų nerasta.</td></tr>`}</tbody></table>`;
}

function render(root, section) {
  const state = getFilterState(root);
  const parameter = getParameter(state.parameter) || listParameters(section)[0];
  const range = datesFor(state.period, parameter);
  const sites = listStations().filter((site) => state.sites.includes(site.id) && siteSupports(site, parameter));
  if (!sites.length) {
    root.querySelector('[data-role="status"]').textContent = "Pasirinkite bent vieną monitoringo tašką.";
    return;
  }
  const currentSeries = sites.map((site) => getSeries(parameter.id, site.id, range));
  const duration = range.to.getTime() - range.from.getTime();
  const previousRange = { from: new Date(range.from.getTime() - duration), to: range.from, resolution: range.resolution };
  const previousSeries = sites.map((site) => getSeries(parameter.id, site.id, previousRange));
  const stats = valueForStats(currentSeries, parameter);
  const previousStats = valueForStats(previousSeries, parameter);
  const currentMean = parameter.section === "noise" ? stats.logMean : stats.mean;
  const previousMean = parameter.section === "noise" ? previousStats.logMean : previousStats.mean;
  root.querySelector('[data-role="stats"]').innerHTML = statMarkup(stats, parameter, currentMean, trend(currentMean, previousMean));
  root.querySelector('[data-role="status"]').textContent = `${sites.length} tašk. · ${stats.sampleCount || 0} reikšmių · ${parameter.name}`;
  root.querySelector('[data-role="norm"]').textContent = normValue(parameter, "limit") === null ? "Šiam parametrui kataloge demonstracinė ribinė norma nenustatyta." : `Ribinė norma: ${fmt(normValue(parameter, "limit"), parameter)}. Viršijimas grafike pažymėtas oranžine spalva.`;
  renderStationTable(root, parameter, sites, range);

  const labels = [...new Set(currentSeries.flatMap((series) => series.map((item) => item.timestamp)))].sort();
  const datasets = sites.map((site, siteIndex) => {
    const values = new Map(getSeries(parameter.id, site.id, range).map((item) => [item.timestamp, item.value]));
    const data = labels.map((label) => values.get(label) ?? null);
    const limit = normValue(parameter, "limit");
    return { label: site.shortName, data, borderColor: CHART_PALETTE[siteIndex % CHART_PALETTE.length], backgroundColor: CHART_PALETTE[siteIndex % CHART_PALETTE.length], borderWidth: 2, tension: .22, spanGaps: true, pointRadius: data.map((value) => value !== null && limit !== null && value > limit ? 4 : 0), pointHoverRadius: 5, pointBackgroundColor: data.map((value) => value !== null && limit !== null && value > limit ? MAP_PALETTE.thresholdExceedance : CHART_PALETTE[siteIndex % CHART_PALETTE.length]), segment: { borderColor: (ctx) => limit !== null && ((ctx.p0?.parsed?.y ?? 0) > limit || (ctx.p1?.parsed?.y ?? 0) > limit) ? MAP_PALETTE.thresholdExceedance : CHART_PALETTE[siteIndex % CHART_PALETTE.length] } };
  });
  const limit = normValue(parameter, "limit");
  if (limit !== null) datasets.push({ label: "Ribinė norma", data: labels.map(() => limit), borderColor: CHART_PALETTE[5], backgroundColor: CHART_PALETTE[5], borderDash: [6, 5], borderWidth: 1.5, pointRadius: 0, tension: 0, fill: false });
  initChart(root, "time", { type: "line", data: { labels: labels.map((label) => new Intl.DateTimeFormat("lt-LT", { day: "2-digit", month: "2-digit" }).format(new Date(label))), datasets }, options: chartDefaults({ scales: { y: { beginAtZero: true, title: { display: true, text: parameter.unit } }, x: { ticks: { maxTicksLimit: 10 } } } }) });

  const comparison = compareSites(parameter.id, sites.map((site) => site.id), range);
  const comparisonColors = comparison.map((_, index) => CHART_PALETTE[index % CHART_PALETTE.length]);
  initChart(root, "compare", { type: "bar", data: { labels: comparison.map((item) => item.station.shortName), datasets: [{ label: parameter.section === "noise" ? "Logaritminis vidurkis" : "Vidurkis", data: comparison.map((item) => parameter.section === "noise" ? item.stats.logMean : item.stats.mean), backgroundColor: comparisonColors, borderColor: comparisonColors, borderWidth: 1 }] }, options: chartDefaults({ plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: parameter.unit } } } }) });

  if (root.querySelector('[data-chart="correlation"]')) {
    const site = sites[0];
    const correlation = correlate("wind-speed", site.id, parameter.id, site.id, range);
    const coefficient = correlation.pearson;
    root.querySelector('[data-role="pearson"]').textContent = coefficient === null ? "r = –" : `r = ${formatNumber(coefficient, 3)}`;
    root.querySelector('[data-role="correlation-explain"]').textContent = coefficient === null ? "Suderintų matavimų šiam laikotarpiui nepakanka." : Math.abs(coefficient) < .3 ? "Ryšys silpnas arba praktiškai nereikšmingas." : Math.abs(coefficient) < .7 ? "Ryšys vidutinio stiprumo." : "Ryšys stiprus; koreliacija nerodo priežastinio ryšio.";
    initChart(root, "correlation", { type: "scatter", data: { datasets: [{ label: `Vėjo greitis → ${parameter.name}`, data: correlation.points.map((point) => ({ x: point.x, y: point.y })), backgroundColor: CHART_PALETTE[2], borderColor: CHART_PALETTE[2], pointRadius: 4 }] }, options: chartDefaults({ plugins: { legend: { display: false } }, scales: { x: { title: { display: true, text: "Vėjo greitis (m/s)" } }, y: { title: { display: true, text: `${parameter.name} (${parameter.unit})` } } } }) });
  }
}

export function initAnalysisPanel(root) {
  const section = root.dataset.analysisSection;
  populateFilters(root, section);
  root.querySelector('[data-field="period"]').value = root.dataset.defaultPeriod || (section === "noise" || section === "laboratory-air" ? "730d" : "90d");
  updateSiteOptions(root, getParameter(root.querySelector('[data-field="parameter"]').value), { sites: [] });
  const initial = () => render(root, section);
  root.querySelector('[data-action="apply"]').addEventListener("click", initial);
  ["parameter", "district", "address", "period", "exceedances"].forEach((field) => root.querySelector(`[data-field="${field}"]`).addEventListener("change", () => {
    const selected = selectedValues(root.querySelector('[data-field="sites"]'));
    const parameter = getParameter(root.querySelector('[data-field="parameter"]').value);
    updateSiteOptions(root, parameter, { sites: selected });
    render(root, section);
  }));
  root.querySelector('[data-field="code"]').addEventListener("input", () => { const parameter = getParameter(root.querySelector('[data-field="parameter"]').value); updateSiteOptions(root, parameter, { sites: selectedValues(root.querySelector('[data-field="sites"]')) }); });
  initial();
  return { render: initial };
}

export function initAirTabs() {
  const tabs = [...document.querySelectorAll("[data-analysis-tab]")];
  if (!tabs.length) return;
  const selectTab = (tab, { focus = false } = {}) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      if (selected && focus) item.focus();
    });
    document.querySelectorAll("[data-analysis-panel]").forEach((panel) => { panel.hidden = panel.dataset.analysisPanel !== tab.dataset.analysisTab; });
  };
  tabs.forEach((tab, index) => {
    if (!tab.id) tab.id = `analysis-tab-${tab.dataset.analysisTab}`;
    const panel = document.querySelector(`[data-analysis-panel="${tab.dataset.analysisTab}"]`);
    if (panel) {
      if (!panel.id) panel.id = `analysis-panel-${tab.dataset.analysisTab}`;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      if (!panel.hasAttribute("tabindex")) panel.setAttribute("tabindex", "0");
      tab.setAttribute("aria-controls", panel.id);
    }
    tab.tabIndex = tab.getAttribute("aria-selected") === "true" ? 0 : -1;
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (direction !== undefined) { event.preventDefault(); selectTab(tabs[(index + direction + tabs.length) % tabs.length], { focus: true }); return; }
      if (event.key === "Home") { event.preventDefault(); selectTab(tabs[0], { focus: true }); return; }
      if (event.key === "End") { event.preventDefault(); selectTab(tabs[tabs.length - 1], { focus: true }); }
    });
  });

  const activateHash = () => {
    const hash = window.location.hash.slice(1);
    const tab = hash === "laboratoriniai" ? document.querySelector("#tab-laboratory-air") : tabs[0];
    selectTab(tab || tabs[0]);
    if (hash !== "laboratoriniai") return;

    const target = document.querySelector("#laboratoriniai") || document.querySelector(".analysis-tabs");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  };

  window.addEventListener("hashchange", activateHash);
  activateHash();
}

export function setAnalysisDateBounds() {
  document.querySelectorAll("[data-demo-date]").forEach((item) => { item.textContent = new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeZone: "Europe/Vilnius" }).format(DEMO_NOW); });
}

export { HISTORY_START };
