import { DEMO_NOW } from "../data/generator.js";
import { listParameters, getParameter } from "../data/catalog.js";
import { getSeries, getMicrodistricts } from "../data/query.js";
import { GREENERY_POINTS } from "../data/periodic_sites.js";
import { CHART_PALETTE, chartDefaults } from "../charts/defaults.js";
import { escapeHtml, formatNumber, setOptions, selectedValues } from "./common.js";

const parameters = listParameters("greenery");
let chart = null;
function condition(value) { if (value >= 7) return ["geras", "condition-good"]; if (value >= 4) return ["vidutinis", "condition-medium"]; return ["prastas", "condition-poor"]; }
function initChart(config) { const canvas = document.querySelector("#greenery-chart"); if (chart) chart.destroy(); chart = new window.Chart(canvas.getContext("2d"), config); canvas._kmsChart = chart; }
function populateSites(previous = []) {
  const district = document.querySelector("#greenery-district").value;
  const sites = GREENERY_POINTS.filter((site) => district === "all" || site.districtId === district);
  const retained = previous.filter((id) => sites.some((site) => site.id === id));
  const selected = retained.length ? retained : sites.slice(0, 3).map((site) => site.id);
  setOptions(document.querySelector("#greenery-sites"), sites, { value: (item) => item.id, label: (item) => `${item.shortName} · ${item.address}`, selected });
}
function render() {
  const district = document.querySelector("#greenery-district").value;
  const sites = GREENERY_POINTS.filter((site) => selectedValues(document.querySelector("#greenery-sites")).includes(site.id) && (district === "all" || site.districtId === district));
  const rows = sites.map((site) => {
    const values = parameters.map((parameter) => getSeries(parameter.id, site.id, { from: new Date("2024-01-01T00:00:00Z"), to: DEMO_NOW, resolution: "yearly" }).at(-1)?.value ?? null);
    return { site, values };
  });
  document.querySelector("#greenery-table").innerHTML = `<table class="data-table score-table"><caption>Želdynų būklė pagal paskutinius metinius įrašus</caption><thead><tr><th>Taškas</th>${parameters.map((parameter) => `<th>${escapeHtml(parameter.name.replace(" būklė", ""))}</th>`).join("")}<th>Bendra interpretacija</th></tr></thead><tbody>${rows.map(({ site, values }) => `<tr><td><strong>${escapeHtml(site.shortName)}</strong><br><span class="fine-print">${escapeHtml(site.address)}</span></td>${values.map((value) => { const [label, className] = condition(value ?? 0); return `<td class="score"><div class="score-meter" aria-label="${formatNumber(value, 1)} iš 10">${Array.from({ length: 10 }, (_, index) => `<span class="${index < Math.round(value ?? 0) ? index < 4 ? "is-poor" : index < 7 ? "is-low" : "is-filled" : ""}"></span>`).join("")}</div><span class="fine-print">${formatNumber(value, 1)} / 10 · </span><span class="condition-tag ${className}">${label}</span></td>`; }).join("")}<td>${condition(values.filter((value) => value !== null).reduce((sum, value) => sum + value, 0) / Math.max(1, values.filter((value) => value !== null).length))[0]}</td></tr>`).join("") || `<tr><td colspan="7">Pasirinkite bent vieną želdynų tašką.</td></tr>`}</tbody></table>`;
  const selectedParameter = getParameter(document.querySelector("#greenery-parameter").value);
  const selected = rows.map(({ site, values }) => ({ site, value: values[parameters.findIndex((item) => item.id === selectedParameter.id)] })).filter((item) => item.value !== null);
  const barColors = selected.map((_, index) => CHART_PALETTE[index % CHART_PALETTE.length]);
  initChart({ type: "bar", data: { labels: selected.map((item) => item.site.shortName), datasets: [{ label: selectedParameter.name, data: selected.map((item) => item.value), backgroundColor: barColors, borderColor: barColors, borderWidth: 1 }] }, options: chartDefaults({ plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 10, title: { display: true, text: "Balai (0–10)" } } } }) });
  document.querySelector("#greenery-status").textContent = `${rows.length} taškai · atnaujinta pagal metinius demonstracinius įrašus`;
}
export function initGreenery() {
  setOptions(document.querySelector("#greenery-district"), [{ id: "all", name: "Visi mikrorajonai" }, ...getMicrodistricts().map((item) => ({ id: item.properties.id, name: item.properties.name }))]);
  populateSites();
  setOptions(document.querySelector("#greenery-parameter"), parameters, { label: (item) => item.name, selected: [parameters[0].id] });
  ["#greenery-sites", "#greenery-parameter"].forEach((selector) => document.querySelector(selector).addEventListener("change", render));
  document.querySelector("#greenery-district").addEventListener("change", () => {
    populateSites(selectedValues(document.querySelector("#greenery-sites")));
    render();
  });
  render();
}
