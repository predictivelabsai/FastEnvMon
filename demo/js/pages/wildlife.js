import { DEMO_NOW } from "../data/generator.js";
import { getParameter, getParameter as parameterById } from "../data/catalog.js";
import { getSeries } from "../data/query.js";
import { WILDLIFE_POINTS } from "../data/periodic_sites.js";
import { CHART_PALETTE, chartDefaults } from "../charts/defaults.js";
import { escapeHtml, formatDate, formatNumber, setOptions, selectedValues } from "./common.js";

const sections = [
  ["flora", "Augalijos monitoringas", "flora-species", "flora-abundance", "Rūšių skaičius ir augalijos padengimo / gausumo balai"],
  ["invasive", "Invazinių rūšių monitoringas", "invasive-species", "invasive-abundance", "Invazinių rūšių skaičius ir paplitimo balai"],
  ["birds", "Paukščių monitoringas", "bird-species", "bird-abundance", "Stebėtų rūšių skaičius ir atskirų rūšių gausumas"],
  ["corvids", "Varninių paukščių monitoringas", "corvid-species", "corvid-abundance", "Varninių paukščių rūšių skaičius ir gausumas"],
  ["bats", "Šikšnosparnių monitoringas", "bat-species", "bat-abundance", "Šikšnosparnių rūšių skaičius ir gausumas"],
  ["amphibians", "Varliagyvių ir roplių monitoringas", "amphibian-species", "amphibian-abundance", "Varliagyvių ir roplių rūšių skaičius ir gausumas"],
  ["fish", "Žuvų monitoringas", "fish-species", "fish-abundance-water", "Žuvų rūšių skaičius ir gausumas telkiniuose"]
];
let active = sections[0];
let chart = null;
function initChart(config) { const canvas = document.querySelector("#wildlife-chart"); if (chart) chart.destroy(); chart = new window.Chart(canvas.getContext("2d"), config); canvas._kmsChart = chart; }
function years() { return [2024, 2025, 2026]; }
function valuesFor(parameterId, siteId) { return getSeries(parameterId, siteId, { from: new Date("2024-01-01T00:00:00Z"), to: DEMO_NOW, resolution: "yearly" }); }
function render() {
  const [, title, speciesId, abundanceId, description] = active;
  const siteIds = selectedValues(document.querySelector("#wildlife-sites"));
  const sites = WILDLIFE_POINTS.filter((site) => siteIds.includes(site.id));
  const speciesParameter = parameterById(speciesId);
  const abundanceParameter = parameterById(abundanceId);
  const records = [];
  sites.forEach((site) => {
    const species = valuesFor(speciesId, site.id);
    const abundance = valuesFor(abundanceId, site.id);
    years().forEach((year) => {
      const speciesRecord = species.find((item) => new Date(item.timestamp).getUTCFullYear() === year);
      const abundanceRecord = abundance.find((item) => new Date(item.timestamp).getUTCFullYear() === year);
      if (speciesRecord || abundanceRecord) records.push({ site, year, species: speciesRecord?.value ?? null, abundance: abundanceRecord?.value ?? null });
    });
  });
  document.querySelector("#wildlife-active-title").textContent = title;
  document.querySelector("#wildlife-active-description").textContent = description;
  const averageByYear = years().map((year) => { const group = records.filter((item) => item.year === year); return { year, species: group.length ? group.reduce((sum, item) => sum + (item.species ?? 0), 0) / group.length : null, abundance: group.length ? group.reduce((sum, item) => sum + (item.abundance ?? 0), 0) / group.length : null }; });
  initChart({ type: "bar", data: { labels: averageByYear.map((item) => item.year), datasets: [{ label: `Rūšių skaičius (${speciesParameter.unit})`, data: averageByYear.map((item) => item.species), backgroundColor: CHART_PALETTE[0], borderColor: CHART_PALETTE[0], borderWidth: 1, yAxisID: "y" }, { label: `Gausumas / padengimas (${abundanceParameter.unit})`, data: averageByYear.map((item) => item.abundance), backgroundColor: CHART_PALETTE[2], borderColor: CHART_PALETTE[2], borderWidth: 1, yAxisID: "y1" }] }, options: chartDefaults({ scales: { y: { beginAtZero: true, position: "left", title: { display: true, text: speciesParameter.unit } }, y1: { beginAtZero: true, position: "right", grid: { drawOnChartArea: false }, title: { display: true, text: abundanceParameter.unit } } } }) });
  document.querySelector("#wildlife-table").innerHTML = `<table class="data-table"><caption>Metų palyginimas pagal pasirinktus taškus</caption><thead><tr><th>Taškas</th><th>Metai</th><th>Rūšių skaičius</th><th>Gausumas / padengimas</th></tr></thead><tbody>${records.map((record) => `<tr><td>${escapeHtml(record.site.shortName)}</td><td>${record.year}</td><td>${formatNumber(record.species, speciesParameter.precision)} ${speciesParameter.unit}</td><td>${formatNumber(record.abundance, abundanceParameter.precision)} ${abundanceParameter.unit}</td></tr>`).join("") || `<tr><td colspan="4">Pasirinktuose taškuose duomenų nėra.</td></tr>`}</tbody></table>`;
  document.querySelector("#wildlife-status").textContent = `${records.length} metų įrašai · paskutiniai sugeneruoti metai: 2026`;
}
export function initWildlife() {
  const tabsNode = document.querySelector("#wildlife-tabs");
  const anchorIds = { flora: "augalija", invasive: "invazines", birds: "pauksciai", corvids: "varniniai", bats: "siksnosparniai", amphibians: "varliagyviai", fish: "zuvys" };
  tabsNode.innerHTML = sections.map((item, index) => `<button id="${anchorIds[item[0]]}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="wildlife-panel" tabindex="${index === 0 ? 0 : -1}" data-wildlife-tab="${item[0]}">${item[1].replace(" monitoringas", "")}</button>`).join("");
  setOptions(document.querySelector("#wildlife-sites"), WILDLIFE_POINTS, { value: (item) => item.id, label: (item) => `${item.shortName} · ${item.address}`, selected: WILDLIFE_POINTS.slice(0, 3).map((item) => item.id) });
  const tabButtons = [...tabsNode.querySelectorAll("button")];
  const panel = document.getElementById("wildlife-panel");
  function selectTab(button) {
    active = sections.find((item) => item[0] === button.dataset.wildlifeTab) || sections[0];
    tabButtons.forEach((item) => { item.setAttribute("aria-selected", String(item === button)); item.tabIndex = item === button ? 0 : -1; });
    panel?.setAttribute("aria-labelledby", button.id);
    render();
  }
  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => selectTab(button));
    button.addEventListener("keydown", (event) => {
      const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
      if (direction !== undefined) { event.preventDefault(); const next = tabButtons[(index + direction + tabButtons.length) % tabButtons.length]; next.focus(); selectTab(next); return; }
      if (event.key === "Home") { event.preventDefault(); tabButtons[0].focus(); selectTab(tabButtons[0]); return; }
      if (event.key === "End") { event.preventDefault(); const last = tabButtons[tabButtons.length - 1]; last.focus(); selectTab(last); }
    });
  });
  document.querySelector("#wildlife-sites").addEventListener("change", render);

  function activateHash() {
    const hash = window.location.hash.slice(1);
    const button = tabButtons.find((item) => item.id === hash) || tabButtons[0];
    selectTab(button);
    if (button.id !== hash) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tabsNode.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  }

  window.addEventListener("hashchange", activateHash);
  activateHash();
}
