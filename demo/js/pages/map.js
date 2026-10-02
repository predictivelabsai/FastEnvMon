import { DEMO_NOW } from "../data/generator.js";
import { SECTIONS, getParameter, listParameters } from "../data/catalog.js";
import { ALL_SITES, MICRODISTRICTS, STATIONS, IOT_DEVICES, getSite } from "../data/sites.js";
import { classifyValue, getLatest, getMicrodistricts, getSeries, getStats, normLabel } from "../data/query.js";
import { toLks94 } from "../data/lks94.js";
import { MAP_PALETTE, STATUS_PALETTE } from "../charts/palette.js";

const periodDays = { day: 1, week: 7, month: 30, year: 365 };
const sectionById = new Map(SECTIONS.map((item) => [item.id, item]));
const queryParams = new URLSearchParams(window.location.search);
const initialSection = sectionById.has(queryParams.get("section")) ? queryParams.get("section") : "automatic-air";
const state = { section: initialSection, parameter: queryParams.get("parameter") || "pm25", normLevel: "limit", district: "all", site: "all", showDistricts: true, showStations: true, showIot: true, measureMode: false };

const sectionFilter = document.querySelector("#filter-section");
const districtFilter = document.querySelector("#filter-district");
const siteFilter = document.querySelector("#filter-site");
const parameterFilter = document.querySelector("#filter-parameter");
const normFilter = document.querySelector("#norm-level");
const statusElement = document.querySelector("#map-status");
const measureList = document.querySelector("#measure-list");

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }
function formatValue(value, parameterItem) { return value === null || value === undefined ? "Nėra duomenų" : `${Number(value).toFixed(parameterItem.precision)} ${parameterItem.unit}`; }
function formatTime(value) { return value ? new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vilnius" }).format(new Date(value)) : "Nėra duomenų"; }
function supportsParameter(site, parameterItem) { return site.type.includes("IoT") ? site.parameters.includes(parameterItem.id) : site.parameters.includes(parameterItem.section); }
function selectedParameter() { return getParameter(state.parameter) || listParameters(state.section)[0]; }
function setStatus(message) { statusElement.textContent = message; }
function normalizeSiteType(site) { return site.type.includes("IoT") ? "iot" : "stations"; }

const map = L.map("map", { zoomControl: false, preferCanvas: true }).setView([55.716, 21.155], 12);
L.control.zoom({ position: "bottomright", zoomInTitle: "Didinti žemėlapį", zoomOutTitle: "Mažinti žemėlapį" }).addTo(map);
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" });
const imagery = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 19, attribution: "© Esri" });
osm.addTo(map);
const districtLayer = L.geoJSON(getMicrodistricts(), { style: districtStyle, onEachFeature: districtPopup });
districtLayer.addTo(map);
const sectionLayers = new Map(SECTIONS.map((section) => [section.id, L.layerGroup()]));
const markersBySite = new Map();
sectionLayers.get(state.section).addTo(map);

const baseLayers = { "Gatvių žemėlapis": osm, "Ortofoto pakaitalas": imagery };
const overlays = { "Mikrorajonų ribos": districtLayer };
SECTIONS.forEach((section) => overlays[`${section.name} · taškai`] = sectionLayers.get(section.id));
L.control.layers(baseLayers, overlays, { position: "topright", collapsed: true }).addTo(map);

const measureLayer = L.layerGroup().addTo(map);
const measures = [];
let measureStart = null;

function addSelectOption(select, value, label, selected = false) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  option.selected = selected;
  select.append(option);
}

function populateFilters() {
  sectionFilter.innerHTML = "";
  SECTIONS.filter((section) => section.id !== "meteorology").forEach((section) => addSelectOption(sectionFilter, section.id, section.name, section.id === state.section));
  districtFilter.innerHTML = "";
  addSelectOption(districtFilter, "all", "Visi mikrorajonai", state.district === "all");
  getMicrodistricts().forEach((feature) => addSelectOption(districtFilter, feature.properties.id, feature.properties.name, feature.properties.id === state.district));
  updateParameterOptions();
}

function updateParameterOptions() {
  const available = listParameters(state.section);
  if (!available.some((item) => item.id === state.parameter)) state.parameter = available[0]?.id;
  parameterFilter.innerHTML = "";
  available.forEach((item) => addSelectOption(parameterFilter, item.id, `${item.name} · ${item.unit}`, item.id === state.parameter));
  updateSiteOptions();
}

function updateSiteOptions() {
  const parameterItem = selectedParameter();
  const previous = state.site;
  siteFilter.innerHTML = "";
  addSelectOption(siteFilter, "all", "Visi taškai", previous === "all");
  ALL_SITES.filter((site) => supportsParameter(site, parameterItem) && (state.district === "all" || site.districtId === state.district)).forEach((site) => addSelectOption(siteFilter, site.id, `${site.shortName} · ${site.name}`, site.id === previous));
  if (previous !== "all" && ![...siteFilter.options].some((option) => option.value === previous)) state.site = "all";
  siteFilter.value = state.site;
  const norm = parameterItem.norms[state.normLevel];
  document.querySelector("#norm-help").textContent = norm === null || norm === undefined ? "Šiam parametrui normos demo reikšmė nenustatyta." : `Pasirinkta ${normLabel(state.normLevel)} norma: ${formatValue(norm, parameterItem)}.`;
}

function visibleSites() {
  const parameterItem = selectedParameter();
  return ALL_SITES.filter((site) => supportsParameter(site, parameterItem) && (state.district === "all" || site.districtId === state.district) && (state.site === "all" || site.id === state.site));
}

function markerIcon(site, classification) {
  const iot = normalizeSiteType(site) === "iot";
  const code = escapeHtml(site.shortName);
  const textColor = ["very-poor", "extremely-poor"].includes(classification.key) ? MAP_PALETTE.inverseText : MAP_PALETTE.statusText;
  return L.divIcon({ className: "", html: `<span class="station-label${iot ? " station-label--iot" : ""}" style="border-color:${STATUS_PALETTE[classification.key]};background-color:${STATUS_PALETTE[classification.key]};color:${textColor}">${code}</span>`, iconSize: null, iconAnchor: [0, 15] });
}

function updateMarker(entry, site, parameterItem) {
  const { marker } = entry;
  marker.setLatLng([site.lat, site.lon]);
  marker.options.title = site.shortName;
  marker.options.alt = `${site.shortName}: ${site.name}`;
  marker.setTooltipContent(site.shortName);
  const element = marker.getElement();
  if (element) {
    element.title = site.shortName;
    element.setAttribute("alt", marker.options.alt);
  }
  const presentationKey = `${parameterItem.id}|${state.normLevel}`;
  if (entry.presentationKey === presentationKey) return;
  const latest = getLatest(site.id, parameterItem.id);
  const classification = classifyValue(latest?.value, parameterItem.id, state.normLevel);
  marker.setIcon(markerIcon(site, classification));
  marker.setPopupContent(popupHtml(site, "day", parameterItem, latest));
  entry.presentationKey = presentationKey;
}

function createMarker(site, parameterItem) {
  const marker = L.marker([site.lat, site.lon], { title: site.shortName, alt: `${site.shortName}: ${site.name}` });
  marker.bindTooltip(site.shortName, { direction: "top", offset: [19, -3], opacity: 0.92 });
  marker.bindPopup("", { maxWidth: 360, minWidth: 270 });
  const entry = { marker, sectionId: state.section, presentationKey: null };
  updateMarker(entry, site, parameterItem);
  return entry;
}

function renderMarkers() {
  const layer = sectionLayers.get(state.section);
  if (!map.hasLayer(layer)) layer.addTo(map);
  const parameterItem = selectedParameter();
  const sites = visibleSites().filter((site) => {
    const type = normalizeSiteType(site);
    return (type === "stations" && state.showStations) || (type === "iot" && state.showIot);
  });
  const visibleSiteIds = new Set(sites.map((site) => site.id));

  markersBySite.forEach((entry, siteId) => {
    if (visibleSiteIds.has(siteId)) return;
    sectionLayers.get(entry.sectionId)?.removeLayer(entry.marker);
    markersBySite.delete(siteId);
  });

  sites.forEach((site) => {
    let entry = markersBySite.get(site.id);
    if (!entry) {
      entry = createMarker(site, parameterItem);
      markersBySite.set(site.id, entry);
    } else {
      updateMarker(entry, site, parameterItem);
    }
    if (entry.sectionId !== state.section) {
      sectionLayers.get(entry.sectionId)?.removeLayer(entry.marker);
      entry.sectionId = state.section;
    }
    if (!layer.hasLayer(entry.marker)) layer.addLayer(entry.marker);
  });

  setStatus(`${parameterItem.name} · ${normLabel(state.normLevel)} norma · rodoma ${sites.length} taškų. Spustelėkite kodą, kad peržiūrėtumėte informaciją.`);
}

function districtStyle(feature) {
  const parameterItem = selectedParameter();
  const sites = STATIONS.filter((site) => site.districtId === feature.properties.id && supportsParameter(site, parameterItem));
  const values = sites.map((site) => getLatest(site.id, parameterItem.id)?.value).filter((value) => Number.isFinite(value));
  const mean = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  const classification = classifyValue(mean, parameterItem.id, state.normLevel);
  return { color: MAP_PALETTE.districtOutline, weight: 1, fillColor: STATUS_PALETTE[classification.key], fillOpacity: 0.5, opacity: 0.75 };
}

function districtPopup(feature, layer) {
  layer.bindTooltip(feature.properties.name, { sticky: true, direction: "center", className: "district-label" });
  layer.on("click", () => {
    const parameterItem = selectedParameter();
    const sites = STATIONS.filter((site) => site.districtId === feature.properties.id && supportsParameter(site, parameterItem));
    const values = sites.map((site) => getLatest(site.id, parameterItem.id)?.value).filter((value) => Number.isFinite(value));
    const mean = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
    layer.bindPopup(`<div class="popup-kicker">Mikrorajonas</div><h3 class="popup-title">${escapeHtml(feature.properties.name)}</h3><p class="popup-meta">${escapeHtml(parameterItem.name)} · ${values.length ? `${formatValue(mean, parameterItem)} vidurkis` : "Nėra šio parametro taškų"}</p>`).openPopup();
  });
}

function popupHtml(site, period, parameterItem = selectedParameter(), latest = getLatest(site.id, parameterItem.id)) {
  const days = periodDays[period] ?? 1;
  const stats = getStats(parameterItem.id, site.id, { from: new Date(DEMO_NOW.getTime() - days * 24 * 60 * 60 * 1000), to: DEMO_NOW, resolution: days === 1 ? "hourly" : "daily" });
  const lks = toLks94(site.lat, site.lon);
  const norm = parameterItem.norms[state.normLevel];
  const latestClass = classifyValue(latest?.value, parameterItem.id, state.normLevel);
  const status = latest?.status && latest.status !== "GALIOJANTIS" ? `<p class="popup-note">${escapeHtml(latest.status)}${latest.flag ? ` · ${escapeHtml(latest.flag)}` : ""}</p>` : "";
  return `<div class="popup-kicker">${escapeHtml(site.shortName)} · ${escapeHtml(site.type)}</div>
    <h3 class="popup-title">${escapeHtml(site.name)}</h3>
    <p class="popup-meta">${escapeHtml(site.address ?? "Klaipėda")}<br>WGS84: ${site.lat.toFixed(5)}, ${site.lon.toFixed(5)}<br>LKS-94 aproks.: X ${lks.easting.toLocaleString("lt-LT")}, Y ${lks.northing.toLocaleString("lt-LT")}<br>Mikrorajonas: ${escapeHtml(site.districtId)}</p>
    <label class="control-label" for="popup-period-${site.id}">Laikotarpis</label>
    <select class="popup-select" id="popup-period-${site.id}" data-popup-period="${site.id}"><option value="day" ${period === "day" ? "selected" : ""}>Paros</option><option value="week" ${period === "week" ? "selected" : ""}>Savaitės</option><option value="month" ${period === "month" ? "selected" : ""}>Mėnesio</option><option value="year" ${period === "year" ? "selected" : ""}>Metų</option></select>
    <table class="popup-data-table"><tbody><tr><th>Parametras</th><td>${escapeHtml(parameterItem.name)}</td></tr><tr><th>Paskutinis matavimas</th><td>${formatValue(latest?.value, parameterItem)} <span class="status-dot status-${latestClass.key}"></span></td></tr><tr><th>Laikotarpio vidurkis</th><td>${formatValue(parameterItem.section === "noise" && stats.logMean !== null ? stats.logMean : stats.mean, parameterItem)}</td></tr><tr><th>Min. / maks.</th><td>${formatValue(stats.min, parameterItem)} / ${formatValue(stats.max, parameterItem)}</td></tr></tbody></table>
    <div class="popup-norm">Taikoma norma: <strong>${norm === null || norm === undefined ? "nenustatyta" : `${normLabel(state.normLevel)} · ${formatValue(norm, parameterItem)}`}</strong></div>
    <p class="popup-note">Paskutinis atnaujinimas: ${formatTime(latest?.timestamp)}${status}</p>`;
}

function wirePopup(popup, site) {
  const select = popup.getElement()?.querySelector("[data-popup-period]");
  if (!select) return;
  select.addEventListener("change", () => { popup.setContent(popupHtml(site, select.value)); wirePopup(popup, site); });
}

map.on("popupopen", (event) => {
  const popup = event.popup;
  const source = popup._source;
  if (source?.options?.title) wirePopup(popup, getSite(source.options.title));
});

function updateDistricts() {
  districtLayer.setStyle(districtStyle);
  if (state.showDistricts && !map.hasLayer(districtLayer)) districtLayer.addTo(map);
  if (!state.showDistricts && map.hasLayer(districtLayer)) map.removeLayer(districtLayer);
}

function renderMeasures() {
  measureList.innerHTML = measures.map((item, index) => `<li><span>Matavimas ${index + 1}</span><strong>${item.distance.toLocaleString("lt-LT")} m</strong></li>`).join("");
}

function addMeasurePoint(latlng) {
  if (!measureStart) {
    measureStart = latlng;
    measureLayer.addLayer(L.circleMarker(latlng, { radius: 6, color: MAP_PALETTE.measureOutline, fillColor: MAP_PALETTE.measureStart, fillOpacity: 1, weight: 2 }));
    setStatus("Taškas A pažymėtas. Pasirinkite tašką B.");
    return;
  }
  const distance = Math.round(map.distance(measureStart, latlng));
  const line = L.polyline([measureStart, latlng], { color: MAP_PALETTE.measureOutline, weight: 3, dashArray: "7 6" });
  measureLayer.addLayer(line);
  measureLayer.addLayer(L.circleMarker(latlng, { radius: 6, color: MAP_PALETTE.measureOutline, fillColor: MAP_PALETTE.measureEnd, fillOpacity: 1, weight: 2 }));
  measures.unshift({ distance });
  if (measures.length > 5) measures.pop();
  measureStart = null;
  renderMeasures();
  setStatus(`Atstumas: ${distance.toLocaleString("lt-LT")} m. Galite pradėti kitą matavimą.`);
}

map.on("click", (event) => { if (state.measureMode) addMeasurePoint(event.latlng); });

document.querySelector("#measure-toggle").addEventListener("click", (event) => {
  state.measureMode = !state.measureMode;
  map.closePopup();
  event.currentTarget.setAttribute("aria-pressed", String(state.measureMode));
  event.currentTarget.textContent = state.measureMode ? "Baigti matavimą" : "Matuoti atstumą";
  measureStart = null;
  setStatus(state.measureMode ? "Matavimo režimas įjungtas. Spustelėkite tašką A." : "Matavimo režimas išjungtas.");
});
document.querySelector("#measure-clear").addEventListener("click", () => { measures.length = 0; measureStart = null; measureLayer.clearLayers(); renderMeasures(); setStatus("Matavimai išvalyti."); });

sectionFilter.addEventListener("change", () => { state.section = sectionFilter.value; state.site = "all"; updateParameterOptions(); sectionLayers.forEach((layer, id) => { if (id !== state.section && map.hasLayer(layer)) map.removeLayer(layer); }); sectionLayers.get(state.section).addTo(map); renderMarkers(); updateDistricts(); });
districtFilter.addEventListener("change", () => { state.district = districtFilter.value; state.site = "all"; updateSiteOptions(); renderMarkers(); updateDistricts(); });
siteFilter.addEventListener("change", () => { state.site = siteFilter.value; renderMarkers(); });
parameterFilter.addEventListener("change", () => { state.parameter = parameterFilter.value; updateSiteOptions(); renderMarkers(); updateDistricts(); });
normFilter.addEventListener("change", () => { state.normLevel = normFilter.value; updateSiteOptions(); renderMarkers(); updateDistricts(); });
document.querySelectorAll("#layer-toggles input").forEach((input) => input.addEventListener("change", () => { state[`show${input.dataset.layer[0].toUpperCase()}${input.dataset.layer.slice(1)}`] = input.checked; renderMarkers(); if (input.dataset.layer === "districts") updateDistricts(); }));

populateFilters();
renderMarkers();
updateDistricts();
