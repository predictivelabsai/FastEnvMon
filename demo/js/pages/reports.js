import { DEMO_NOW } from "../data/generator.js";
import { SECTIONS, getParameter } from "../data/catalog.js";
import { getStats, listStations } from "../data/query.js";
import { CHART_PALETTE, chartDefaults } from "../charts/defaults.js";
import { escapeHtml, formatDate, formatNumber } from "./common.js";

const representative = { "automatic-air": "pm25", "laboratory-air": "pm25-lab", noise: "l-den", soil: "as", "surface-water": "nh4-n", wildlife: "bird-species", greenery: "crown-condition" };
const chartLabels = {
  "Automatinis aplinkos oras": "Autom. oras",
  "Laboratorinis aplinkos oras": "Labor. oras",
  "Aplinkos triukšmas": "Triukšmas",
  "Paviršinis vanduo": "Pavirš. vanduo",
  "Želdynai ir želdiniai": "Želdynai"
};
let chart = null;
function fmt(value, parameter) { return value === null || value === undefined ? "–" : `${formatNumber(value, parameter.precision)} ${parameter.unit}`; }
function yearRange(year) { return { from: new Date(`${year}-01-01T12:00:00Z`), to: new Date(`${year}-12-31T12:00:00Z`), resolution: "daily" }; }
function renderReport(year) {
  document.querySelector("#selected-report-year").textContent = year;
  const site = listStations()[0];
  const rows = SECTIONS.filter((section) => representative[section.id]).map((section) => {
    const parameter = getParameter(representative[section.id]);
    const stats = getStats(parameter.id, site.id, yearRange(year));
    return { section, parameter, stats };
  });
  document.querySelector("#report-sections").innerHTML = rows.map(({ section, parameter, stats }) => `<section class="report-section"><h3>${escapeHtml(section.menuName)}</h3><p class="muted">Atstovaujamas parametras: <strong>${escapeHtml(parameter.name)}</strong> · taškas ${escapeHtml(site.shortName)} (${escapeHtml(site.address)}).</p><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Mažiausia</th><th>Didžiausia</th><th>${parameter.section === "noise" ? "Logaritminis vidurkis" : "Vidurkis"}</th><th>Viršijimai</th><th>Įrašų kiekis</th></tr></thead><tbody><tr><td>${fmt(stats.min, parameter)}</td><td>${fmt(stats.max, parameter)}</td><td>${fmt(parameter.section === "noise" ? stats.logMean : stats.mean, parameter)}</td><td>${stats.exceedanceCount}</td><td>${stats.sampleCount}</td></tr></tbody></table></div></section>`).join("");
  if (chart) chart.destroy();
  const canvas = document.querySelector("#report-chart");
  chart = new window.Chart(canvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: rows.map((row) => row.section.name),
      datasets: [{
        label: "Vidurkis / logaritminis vidurkis",
        data: rows.map((row) => row.parameter.section === "noise" ? row.stats.logMean : row.stats.mean),
        backgroundColor: CHART_PALETTE,
        borderColor: CHART_PALETTE,
        borderWidth: 1
      }]
    },
    options: chartDefaults({
      layout: { padding: { bottom: 8 } },
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true },
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 0,
            callback(value) {
              const label = this.getLabelForValue(value);
              return chartLabels[label] || label;
            }
          }
        }
      }
    })
  });
  canvas._kmsChart = chart;
  document.querySelector("#report-period").textContent = `${formatDate(yearRange(year).from)} – ${formatDate(yearRange(year).to)}`;
  document.querySelector("#report-note").textContent = year < 2024 ? "Šiems metams generatoriaus istorijoje nėra įrašų; tai ataskaitos struktūros pavyzdys." : `Suvestinė sugeneruota iš demonstracinio duomenų variklio pagal ${site.shortName} atstovaujamąjį tašką.`;
}
export function initReports() {
  document.querySelectorAll("[data-report-year]").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); const year = Number(link.dataset.reportYear); renderReport(year); document.querySelector("#report-view").scrollIntoView({ behavior: "smooth", block: "start" }); }));
  document.querySelector("#print-report").addEventListener("click", () => window.print());
  renderReport(2025);
}
