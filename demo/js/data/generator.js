import { getParameter, listParameters } from "./catalog.js";
import { ALL_SITES, STATIONS, getSite } from "./sites.js";
import { getPeriodicSite } from "./periodic_sites.js";
import { listManualRecords, saveManualRecord } from "./admin/records.js";

export const DEMO_NOW = new Date("2026-10-01T12:00:00Z");
export const HISTORY_START = new Date(DEMO_NOW.getTime() - 24 * 30.4375 * 24 * 60 * 60 * 1000);

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;
const AUTO_SECTIONS = new Set(["automatic-air", "meteorology"]);
const STORY = Object.freeze({
  gapStart: new Date("2025-02-10T00:00:00Z"),
  gapEnd: new Date("2025-02-13T00:00:00Z"),
  anomalyAt: new Date("2026-02-16T06:00:00Z"),
  correctedAt: new Date("2025-05-11T07:00:00Z"),
  backfillAt: new Date("2025-11-19T07:00:00Z")
});

export function hashSeed(input) {
  let hash = 1779033703 ^ String(input).length;
  for (let i = 0; i < String(input).length; i += 1) {
    hash = Math.imul(hash ^ String(input).charCodeAt(i), 3432918353);
    hash = hash << 13 | hash >>> 19;
  }
  return () => {
    hash = Math.imul(hash ^ hash >>> 16, 2246822507);
    hash = Math.imul(hash ^ hash >>> 13, 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
  };
}

export function mulberry32(seed) {
  return function next() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function unit(seed) {
  return mulberry32(hashSeed(seed)())();
}

function signed(seed) { return unit(seed) * 2 - 1; }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function isoHour(date) { return Math.floor(date.getTime() / HOUR) * HOUR; }
function monthKey(date) { return date.toISOString().slice(0, 7); }
function dayOfYear(date) {
  const start = Date.UTC(date.getUTCFullYear(), 0, 1);
  return Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / DAY);
}
function roundValue(value, precision = 1) {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
function gaussian(hour, peak, width) {
  const distance = Math.min(Math.abs(hour - peak), 24 - Math.abs(hour - peak));
  return Math.exp(-(distance ** 2) / (2 * width ** 2));
}

export function weatherValue(siteId, date) {
  const site = getSite(siteId);
  const d = new Date(date);
  const seasonal = Math.sin((2 * Math.PI * (dayOfYear(d) - 98)) / 365.25);
  const weatherNoise = signed(`weather:${siteId}:${isoHour(d)}`);
  const windNoise = signed(`wind:${siteId}:${isoHour(d)}`);
  const temperature = 8.4 + seasonal * 11.8 + weatherNoise * 2.7 + (site?.districtId === "smiltyne" ? 0.6 : 0);
  const windSpeed = clamp(3.8 + 1.1 * Math.sin((2 * Math.PI * (dayOfYear(d) + 40)) / 365.25) + windNoise * 2.2, 0.2, 18);
  const pressure = clamp(1013 + signed(`pressure:${siteId}:${monthKey(d)}`) * 15 + Math.sin((2 * Math.PI * d.getUTCHours()) / 24) * 2, 980, 1045);
  const humidity = clamp(77 - temperature * 1.25 + signed(`humidity:${siteId}:${isoHour(d)}`) * 10 + (windSpeed < 2 ? 4 : 0), 30, 100);
  const windDirection = (unit(`direction:${siteId}:${isoHour(d)}`) * 360 + (siteId === "KA-05" ? 18 : 0)) % 360;
  return { temperature, humidity, pressure, "wind-speed": windSpeed, "wind-direction": windDirection };
}

function pollutionValue(paramId, site, date) {
  const d = new Date(date);
  const hour = d.getUTCHours();
  const winter = 0.5 + 0.5 * Math.cos((2 * Math.PI * (d.getUTCMonth() - 1)) / 12);
  const traffic = gaussian(hour, 7.5, 2.1) + gaussian(hour, 17.5, 2.8);
  const weather = weatherValue(site.id, d);
  const windDilution = 1 / (0.76 + weather["wind-speed"] * 0.115);
  const pressureEpisode = Math.max(0, (weather.pressure - 1017) / 22);
  const portFactor = ["KA-05", "KA-01", "IoT-01"].includes(site.id) ? 1.18 : 1;
  const roadFactor = ["KA-03", "KA-04", "IoT-03"].includes(site.id) ? 1.16 : 1;
  const event = unit(`episode:${paramId}:${site.id}:${monthKey(d)}`) > (winter > 0.55 ? 0.962 : 0.988);
  const eventBoost = event ? (0.75 + unit(`episode-strength:${paramId}:${site.id}:${monthKey(d)}`) * 1.15) : 0;
  const noise = signed(`pollution:${paramId}:${site.id}:${isoHour(d)}`);
  const base = {
    pm25: 7.7, pm10: 13.7, no2: 18.5, co: 0.34, h2s: 1.9, nh3: 24,
    benzene: 1.05, toluene: 7.4, ethylbenzene: 1.8, "mp-xylene": 2.6, "o-xylene": 1.5, "voc-sum": 24
  }[paramId] ?? 5;
  const seasonMultiplier = 1 + winter * ({ pm25: 1.1, pm10: 0.72, no2: 0.68, co: 0.8, h2s: 0.25, nh3: 0.18, benzene: 0.42, toluene: 0.3, ethylbenzene: 0.3, "mp-xylene": 0.3, "o-xylene": 0.3, "voc-sum": 0.26 }[paramId] ?? 0.2);
  const trafficMultiplier = 1 + traffic * ({ no2: 0.45, co: 0.35, pm25: 0.18, pm10: 0.12, benzene: 0.32, toluene: 0.35, ethylbenzene: 0.3, "mp-xylene": 0.3, "o-xylene": 0.3, "voc-sum": 0.3 }[paramId] ?? 0.08);
  const portMultiplier = portFactor * (["nh3", "h2s", "toluene", "ethylbenzene", "mp-xylene", "o-xylene", "voc-sum"].includes(paramId) ? 1.13 : 1) * (paramId === "nh3" && site.id === "KA-05" ? 1.32 : 1);
  const roadMultiplier = roadFactor * (["no2", "co", "pm25", "pm10"].includes(paramId) ? 1.1 : 1);
  let value = base * seasonMultiplier * trafficMultiplier * windDilution * (1 + pressureEpisode * 0.25) * portMultiplier * roadMultiplier * (1 + noise * 0.12);
  value *= 1 + eventBoost;

  if (paramId === "nh3" && site.id === "KA-05" && isoHour(d) === STORY.anomalyAt.getTime()) value = 120;
  return Math.max(0, value);
}

function isGap(siteId, date) { return siteId === "KA-07" && date >= STORY.gapStart && date < STORY.gapEnd; }

function applyStory(record, parameterItem, siteId, date) {
  const stamped = new Date(date);
  if (siteId === "KA-03" && parameterItem.id === "pm10" && isoHour(stamped) === STORY.correctedAt.getTime()) {
    record.value = 31.6;
    record.version = 2;
    record.previousValue = 68.2;
    record.status = "PATAISYTAS";
    record.ingestedAt = new Date(STORY.correctedAt.getTime() + 3 * DAY).toISOString();
  }
  if (siteId === "KA-05" && parameterItem.id === "nh3" && isoHour(stamped) === STORY.anomalyAt.getTime()) {
    record.status = "NEVALIDUS. Laukiama patvirtinimo";
    record.flag = "ANOMALIJA >100 % + viršyta absoliutinė riba";
  }
  if ((siteId === "KA-02" || siteId === "IoT-02") && stamped >= STORY.backfillAt && stamped < STORY.backfillAt.getTime() + 2 * HOUR) {
    record.backfillBatch = "BF-2025-11-25-A";
    record.ingestedAt = "2025-11-25T08:40:00Z";
  }
  return record;
}

function autoRecord(parameterItem, site, date) {
  const weather = weatherValue(site.id, date);
  const isMeteo = parameterItem.section === "meteorology";
  const value = isMeteo ? weather[parameterItem.id] : pollutionValue(parameterItem.id, site, date);
  const record = {
    timestamp: new Date(date).toISOString(),
    value: roundValue(clamp(value, parameterItem.range.min, parameterItem.range.max), parameterItem.precision),
    status: "GALIOJANTIS",
    source: site.type
  };
  return applyStory(record, parameterItem, site.id, date);
}

function sparseValue(parameterItem, site, date) {
  const max = parameterItem.range.max;
  const seed = unit(`sparse:${parameterItem.id}:${site.id}:${date.toISOString().slice(0, 10)}`);
  const limit = parameterItem.norms?.limit;
  let base;
  if (parameterItem.section === "noise") base = 45 + seed * 22;
  else if (seed > 0.93 && limit !== null && limit !== undefined) base = limit * (1.1 + seed * 0.5);
  else if (parameterItem.section === "greenery") base = 3.5 + seed * 5.5;
  else if (limit !== null && limit !== undefined) base = limit * (0.3 + seed * 0.55);
  else base = max * (0.2 + seed * 0.45);
  return roundValue(clamp(base, parameterItem.range.min, max), parameterItem.precision);
}

function sparseSeries(parameterItem, site, from, to) {
  const stepDays = parameterItem.frequency === "120 d" ? 120 : 365;
  const records = [];
  const offset = Math.floor(unit(`offset:${parameterItem.id}:${site.id}`) * stepDays);
  let timestamp = new Date(HISTORY_START.getTime() - offset * DAY);
  while (timestamp <= to) {
    if (timestamp >= from) records.push({ timestamp: timestamp.toISOString(), value: sparseValue(parameterItem, site, timestamp), status: "GALIOJANTIS", source: "Laboratorinis / periodinis įrašas" });
    timestamp = new Date(timestamp.getTime() + stepDays * DAY);
  }
  return records;
}

function rawSeries(parameterId, siteId, from = HISTORY_START, to = DEMO_NOW) {
  const parameterItem = getParameter(parameterId);
  const site = getSite(siteId) ?? getPeriodicSite(siteId);
  if (!parameterItem || !site) return [];
  const start = new Date(Math.max(new Date(from).getTime(), HISTORY_START.getTime()));
  const end = new Date(Math.min(new Date(to).getTime(), DEMO_NOW.getTime()));
  if (start > end) return [];
  if (!AUTO_SECTIONS.has(parameterItem.section)) return sparseSeries(parameterItem, site, start, end);

  const records = [];
  for (let t = isoHour(start); t <= end.getTime(); t += HOUR) {
    const date = new Date(t);
    if (isGap(site.id, date)) continue;
    records.push(autoRecord(parameterItem, site, date));
  }
  return records;
}

export function generateSeries(parameterId, siteId, options = {}) {
  return rawSeries(parameterId, siteId, options.from ?? HISTORY_START, options.to ?? DEMO_NOW);
}

export function registerManualRecord(parameterId, siteId, timestamp, value, status = "GALIOJANTIS", metadata = {}) {
  const rawTimestamp = timestamp instanceof Date ? timestamp.toISOString() : String(timestamp);
  const timestampWithZone = /[zZ]|[+-]\d{2}:?\d{2}$/.test(rawTimestamp) ? rawTimestamp : `${rawTimestamp.length === 16 ? `${rawTimestamp}:00` : rawTimestamp}Z`;
  const normalizedTimestamp = new Date(timestampWithZone).toISOString();
  const existing = listManualRecords().filter((item) => item.parameterId === parameterId && item.siteId === siteId && item.timestamp === normalizedTimestamp);
  const generatedVersion = rawSeries(parameterId, siteId, new Date(normalizedTimestamp), new Date(normalizedTimestamp)).find((item) => item.timestamp === normalizedTimestamp)?.version || 0;
  const version = Math.max(generatedVersion, ...existing.map((item) => Number(item.version) || 0)) + 1;
  const record = {
    id: metadata.id ?? `MR-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    parameterId,
    siteId,
    timestamp: normalizedTimestamp,
    value: Number(value),
    status,
    version,
    source: metadata.source ?? "Rankinis suvedimas",
    createdAt: metadata.createdAt ?? new Date().toISOString(),
    editor: metadata.editor ?? "",
    reason: metadata.reason ?? "",
    previousValue: metadata.previousValue ?? null,
    flag: metadata.flag ?? ""
  };
  saveManualRecord(record);
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("kms-amis-manual-record"));
  return record;
}

export function getStoryEvents() {
  return {
    dataGap: { siteId: "KA-07", from: STORY.gapStart.toISOString(), to: STORY.gapEnd.toISOString() },
    anomaly: { siteId: "KA-05", parameterId: "nh3", timestamp: STORY.anomalyAt.toISOString() },
    correctedReading: { siteId: "KA-03", parameterId: "pm10", timestamp: STORY.correctedAt.toISOString(), version: 2 },
    backfillBatch: { batchId: "BF-2025-11-25-A", sourceSiteIds: ["KA-02", "IoT-02"], originalTimestamp: STORY.backfillAt.toISOString() }
  };
}

export function getLatestGenerated(parameterId, siteId) {
  const series = generateSeries(parameterId, siteId, { from: new Date(DEMO_NOW.getTime() - 14 * DAY), to: DEMO_NOW });
  return series.at(-1) ?? null;
}

export function currentWeatherAverage() {
  const weather = STATIONS.map((site) => weatherValue(site.id, DEMO_NOW));
  const mean = (key) => roundValue(weather.reduce((sum, item) => sum + item[key], 0) / weather.length, key === "wind-direction" || key === "pressure" ? 0 : 1);
  return { temperature: mean("temperature"), humidity: mean("humidity"), pressure: mean("pressure"), "wind-speed": mean("wind-speed"), "wind-direction": mean("wind-direction") };
}

export function listGeneratedParameterIds(sectionId) { return listParameters(sectionId).map((item) => item.id); }

export const STORY_EVENTS = getStoryEvents();
export const GENERATED_SITE_COUNT = ALL_SITES.length;
