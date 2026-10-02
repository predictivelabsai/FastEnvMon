import { CATALOG, SECTIONS, getParameter as catalogParameter, normValue } from "./catalog.js";
import { ALL_SITES, DISTRICT_BY_ID, MICRODISTRICTS, SITE_BY_ID, STATIONS, getSite } from "./sites.js";
import { getPeriodicSite } from "./periodic_sites.js";
import { DEMO_NOW, HISTORY_START, generateSeries } from "./generator.js";
import { listManualRecords } from "./admin/records.js";

const rawCache = new Map();
const seriesCache = new Map();
const dayAggregateCache = new Map();
const QUERY_CACHE_LIMIT = 40;
const levelLabels = { recommended: "rekomenduojama", target: "siektina", limit: "ribinė" };

function setCappedCache(cache, key, value) {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, value);
  if (cache.size > QUERY_CACHE_LIMIT) cache.delete(cache.keys().next().value);
  return value;
}

function dateOrDefault(value, fallback) { return value ? new Date(value) : new Date(fallback); }
function dateKey(date) { return new Date(date).toISOString(); }
function round(value, precision = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}
function cacheKey(paramId, siteId, from, to) { return `${paramId}|${siteId}|${dateKey(from)}|${dateKey(to)}`; }
function bucketStart(date, resolution) {
  const d = new Date(date);
  if (resolution === "daily") return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  if (resolution === "weekly") {
    const day = d.getUTCDay() || 7;
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day + 1));
  }
  if (resolution === "monthly") return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
  if (resolution === "yearly") return new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return new Date(Math.floor(d.getTime() / 3600000) * 3600000);
}
function aggregate(records, parameterItem, resolution) {
  if (resolution === "hourly") return records.map((item) => ({ ...item, timestamp: dateKey(item.timestamp), value: round(item.value, parameterItem.precision) }));
  const grouped = new Map();
  records.forEach((item) => {
    const key = bucketStart(item.timestamp, resolution).toISOString();
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(item);
  });
  return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([timestamp, items]) => ({
    timestamp,
    value: round(items.reduce((sum, item) => sum + item.value, 0) / items.length, parameterItem.precision),
    count: items.length,
    status: items.some((item) => item.status !== "GALIOJANTIS") ? "YRA PASTABŲ" : "GALIOJANTIS"
  }));
}

export function getParameter(id) { return catalogParameter(id); }
function getDataSite(id) { return getSite(id) ?? getPeriodicSite(id); }
export function getStation(id) { return SITE_BY_ID.get(id) ?? getPeriodicSite(id); }
export function listStations() { return ALL_SITES.slice(); }
export function getMicrodistricts() { return MICRODISTRICTS.slice(); }
export function getSections() { return SECTIONS.slice(); }

export function getSeries(paramId, siteId, options = {}) {
  const parameterItem = getParameter(paramId);
  const from = dateOrDefault(options.from, HISTORY_START);
  const to = dateOrDefault(options.to, DEMO_NOW);
  const resolution = options.resolution ?? "hourly";
  if (!parameterItem || !getDataSite(siteId)) return [];
  const rawKey = cacheKey(paramId, siteId, from, to);
  if (!rawCache.has(rawKey)) {
    const generated = generateSeries(paramId, siteId, { from, to });
    const manual = listManualRecords().filter((item) => item.parameterId === paramId && item.siteId === siteId && new Date(item.timestamp) >= from && new Date(item.timestamp) <= to);
    const merged = new Map(generated.map((item) => [item.timestamp, item]));
    manual.forEach((item) => {
      const previous = merged.get(item.timestamp);
      if (!previous || (Number(item.version) || 0) >= (Number(previous.version) || 0)) merged.set(item.timestamp, item);
    });
    setCappedCache(rawCache, rawKey, [...merged.values()].sort((a, b) => a.timestamp.localeCompare(b.timestamp)));
  }
  const records = rawCache.get(rawKey);
  if (resolution === "daily" && dayAggregateCache.has(rawKey)) return dayAggregateCache.get(rawKey);
  const seriesKey = `${rawKey}|${resolution}`;
  if (!seriesCache.has(seriesKey)) setCappedCache(seriesCache, seriesKey, aggregate(records, parameterItem, resolution));
  if (resolution === "daily") setCappedCache(dayAggregateCache, rawKey, seriesCache.get(seriesKey));
  return seriesCache.get(seriesKey);
}

export function getLatest(siteId, paramId) {
  const parameterItem = getParameter(paramId);
  if (!parameterItem || !getDataSite(siteId)) return null;
  const series = getSeries(paramId, siteId, { from: new Date(DEMO_NOW.getTime() - 14 * 24 * 60 * 60 * 1000), to: DEMO_NOW, resolution: "hourly" });
  return series.at(-1) ?? null;
}

function mean(values) { return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null; }
function periodStats(series, parameterItem) {
  const values = series.map((item) => item.value).filter((value) => Number.isFinite(value));
  const avg = mean(values);
  const logMean = parameterItem.section === "noise" && values.length ? 10 * Math.log10(mean(values.map((value) => 10 ** (value / 10)))) : null;
  const limit = normValue(parameterItem, "limit");
  return { min: values.length ? round(Math.min(...values), parameterItem.precision) : null, max: values.length ? round(Math.max(...values), parameterItem.precision) : null, mean: round(avg, parameterItem.precision), logMean: round(logMean, parameterItem.precision), exceedanceCount: limit === null ? 0 : values.filter((value) => value > limit).length };
}

export function getStats(paramId, siteId, options = {}) {
  const parameterItem = getParameter(paramId);
  const to = dateOrDefault(options.to, DEMO_NOW);
  const from = dateOrDefault(options.from, new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000));
  const duration = to.getTime() - from.getTime();
  const currentSeries = getSeries(paramId, siteId, { from, to, resolution: options.resolution ?? "daily" });
  const previousFrom = new Date(from.getTime() - duration);
  const previousSeries = getSeries(paramId, siteId, { from: previousFrom, to: from, resolution: options.resolution ?? "daily" });
  const current = periodStats(currentSeries, parameterItem);
  const previous = periodStats(previousSeries, parameterItem);
  const trendVsPreviousPeriod = current.mean === null || previous.mean === null || previous.mean === 0 ? null : round(((current.mean - previous.mean) / Math.abs(previous.mean)) * 100, 1);
  return { ...current, trendVsPreviousPeriod, from: from.toISOString(), to: to.toISOString(), sampleCount: currentSeries.length };
}

export function compareSites(paramId, siteIds, options = {}) {
  return siteIds.map((siteId) => ({ siteId, station: getStation(siteId), stats: getStats(paramId, siteId, options) }));
}

export function correlate(paramAX, siteA, paramBX, siteB, options = {}) {
  const from = dateOrDefault(options.from, new Date(DEMO_NOW.getTime() - 30 * DAY));
  const to = dateOrDefault(options.to, DEMO_NOW);
  const seriesA = getSeries(paramAX, siteA, { from, to, resolution: options.resolution ?? "daily" });
  const seriesB = getSeries(paramBX, siteB, { from, to, resolution: options.resolution ?? "daily" });
  const byTimestamp = new Map(seriesB.map((item) => [item.timestamp, item.value]));
  const points = seriesA.filter((item) => byTimestamp.has(item.timestamp)).map((item) => ({ timestamp: item.timestamp, x: item.value, y: byTimestamp.get(item.timestamp) }));
  const xMean = mean(points.map((point) => point.x));
  const yMean = mean(points.map((point) => point.y));
  const numerator = points.reduce((sum, point) => sum + (point.x - xMean) * (point.y - yMean), 0);
  const denominator = Math.sqrt(points.reduce((sum, point) => sum + (point.x - xMean) ** 2, 0) * points.reduce((sum, point) => sum + (point.y - yMean) ** 2, 0));
  return { points, pearson: points.length > 1 && denominator ? round(numerator / denominator, 3) : null };
}

export function normLabel(level) { return levelLabels[level] ?? level; }
export function getNorm(paramId, level = "limit") {
  const parameterItem = getParameter(paramId);
  return { value: normValue(parameterItem, level), label: normLabel(level), parameter: parameterItem };
}

export function classifyValue(value, paramId, level = "limit") {
  const parameterItem = getParameter(paramId);
  const selected = normValue(parameterItem, level);
  if (value === null || value === undefined || selected === null) return { key: "no-data", label: "Nėra duomenų", ratio: null };
  const ratio = value / selected;
  if (ratio <= 0.75) return { key: "good", label: "Gera", ratio };
  if (ratio <= 1) return { key: "fair", label: "Priimtina", ratio };
  if (ratio <= 1.25) return { key: "moderate", label: "Vidutinė", ratio };
  if (ratio <= 1.75) return { key: "poor", label: "Prasta", ratio };
  if (ratio <= 2.5) return { key: "very-poor", label: "Labai prasta", ratio };
  return { key: "extremely-poor", label: "Ypač prasta", ratio };
}

export function clearQueryCache() { rawCache.clear(); seriesCache.clear(); dayAggregateCache.clear(); }
export const QUERY_CACHE_INFO = { raw: rawCache, aggregated: seriesCache, daily: dayAggregateCache };

if (typeof window !== "undefined") window.addEventListener("kms-amis-manual-record", clearQueryCache);

const DAY = 24 * 60 * 60 * 1000;
