import { DEMO_NOW, currentWeatherAverage } from "../data/generator.js";
import { getLatest, listStations, classifyValue } from "../data/query.js";
import { PORTAL_BANNER_KEY, PORTAL_BANNER_DISMISSED_KEY } from "../data/admin/notifications.js";
import { escapeHtml } from "./common.js";

const directionNames = ["Š", "ŠR", "R", "PR", "P", "PV", "V", "ŠV"];
function direction(value) { return directionNames[Math.round(value / 45) % 8]; }
function formatTime(value) { return new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vilnius" }).format(new Date(value)); }
function cityAqi() {
  const sites = listStations();
  const values = { pm25: [], pm10: [], no2: [], co: [] };
  sites.forEach((site) => Object.keys(values).forEach((paramId) => { const item = getLatest(site.id, paramId); if (item) values[paramId].push(item.value); }));
  const ratios = [
    Math.max(...values.pm25, 0) / 25,
    Math.max(...values.pm10, 0) / 40,
    Math.max(...values.no2, 0) / 40,
    Math.max(...values.co, 0) / 10
  ];
  const ratio = Math.max(...ratios);
  const score = Math.min(100, Math.max(0, Math.round(ratio * 2.2 * 20)));
  const bandIndex = Math.min(5, Math.floor(score / 20));
  return { score, classification: ["good", "fair", "moderate", "poor", "very-poor", "extremely-poor"][bandIndex] };
}

function renderWeather() {
  const average = currentWeatherAverage();
  const strip = document.querySelector("#weather-strip");
  const items = [
    ["Oro temperatūra", `${average.temperature.toFixed(1)} °C`, "stotelių vidurkis"],
    ["Santykinis drėgnis", `${average.humidity.toFixed(0)} %`, "stotelių vidurkis"],
    ["Atmosferos slėgis", `${average.pressure.toFixed(0)} hPa`, "stotelių vidurkis"],
    ["Vėjo greitis", `${average["wind-speed"].toFixed(1)} m/s`, "stotelių vidurkis"],
    ["Vėjo kryptis", `${direction(average["wind-direction"])} · ${average["wind-direction"].toFixed(0)}°`, "stotelių vidurkis"]
  ];
  strip.innerHTML = items.map(([label, value, note]) => `<div class="weather-item"><span class="label">${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
  document.querySelector("#weather-updated").textContent = `Paskutinis atnaujinimas: ${formatTime(DEMO_NOW)}`;
}

function renderAqi() {
  const aqi = cityAqi();
  const score = document.querySelector("#aqi-score");
  const label = { good: "Gera oro kokybė", fair: "Priimtina oro kokybė", moderate: "Vidutinė oro kokybė", poor: "Prasta oro kokybė", "very-poor": "Labai prasta oro kokybė", "extremely-poor": "Ypač prasta oro kokybė" }[aqi.classification];
  const description = { good: "Pagrindinių teršalų rodikliai yra žemiau pasirinktų ribinių verčių.", fair: "Bendra būklė priimtina, tačiau atskiri taškai gali skirtis.", moderate: "Kai kuriuose taškuose verta atkreipti dėmesį į teršalų pokyčius.", poor: "Dalis rodiklių viršija ribines vertes.", "very-poor": "Rekomenduojama peržiūrėti žemėlapio perspėjimus.", "extremely-poor": "Rekomenduojama riboti jautrių grupių buvimą lauke." }[aqi.classification];
  score.className = `aqi-score status-${aqi.classification}`;
  score.querySelector("strong").textContent = aqi.score;
  document.querySelector("#aqi-label").textContent = label;
  document.querySelector("#aqi-description").textContent = description;
  const chip = document.querySelector("#aqi-chip");
  chip.className = `status-chip status-${aqi.classification}`;
  chip.textContent = label;
}

export function renderBannerFromStorage() {
  const mount = document.querySelector("#portal-banner");
  if (!mount) return;
  let banner;
  try { banner = JSON.parse(localStorage.getItem(PORTAL_BANNER_KEY) || "null"); } catch (error) { banner = null; }
  if (!banner?.text) { mount.innerHTML = ""; return; }
  const dismissed = localStorage.getItem(PORTAL_BANNER_DISMISSED_KEY);
  if (dismissed === banner.id) { mount.innerHTML = ""; return; }
  mount.innerHTML = `<div class="notice portal-banner" role="status"><span><strong>Tinklapyje paskelbtas administracijos pranešimas:</strong> ${escapeHtml(banner.text)}</span><button class="button button--secondary button--small" type="button" aria-label="Uždaryti pranešimą">Uždaryti</button></div>`;
  mount.querySelector("button").addEventListener("click", () => {
    localStorage.setItem(PORTAL_BANNER_DISMISSED_KEY, banner.id);
    mount.innerHTML = "";
  });
}

renderWeather();
renderAqi();
renderBannerFromStorage();
