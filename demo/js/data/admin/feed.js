import { hashSeed, mulberry32, DEMO_NOW } from "../generator.js";
import { getLatest } from "../query.js";
import { listSites } from "../sites.js";
import { getParameter, listParameters } from "../catalog.js";

export const FEED_STORAGE_KEY = "kms_amis_admin_ingestion_feed_v1";
const PROTOCOLS = ["HTTPS", "AMQP", "MQTT", "WebSocket", "CSV", "JSON"];
const PARAMETER_IDS = ["pm25", "pm10", "no2", "nh3", "co"];

function readRaw() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FEED_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) { return []; }
}
function writeRaw(items) { localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(items)); return items; }

export function listFeed() { return readRaw(); }
export function appendFeed(event) { return writeRaw([event, ...readRaw()].slice(0, 40)); }

export function createIngestionEvent(index = 0) {
  const sites = listSites();
  const site = sites[index % sites.length];
  const parameterId = PARAMETER_IDS[index % PARAMETER_IDS.length];
  const parameter = getParameter(parameterId);
  const latest = getLatest(site.id, parameterId);
  const seed = mulberry32(hashSeed(`feed:${index}:${site.id}`)())();
  const timestamp = new Date(DEMO_NOW.getTime() + index * 45 * 1000).toISOString();
  return {
    id: `ING-${Date.now()}-${index}`,
    siteId: site.id,
    siteName: site.name,
    parameterId,
    parameterName: parameter?.name ?? parameterId,
    unit: parameter?.unit ?? "",
    count: 1 + Math.floor(seed * 8),
    protocol: PROTOCOLS[index % PROTOCOLS.length],
    status: site.id === "KA-07" ? "ATMESTA · stotelė neprisijungusi" : (latest?.status ?? "GALIOJANTIS"),
    value: latest?.value ?? null,
    timestamp
  };
}

export function ensureFeedSeed() {
  const current = readRaw();
  if (current.length) return current;
  const seeded = [0, 1, 2, 3].map((index) => createIngestionEvent(index));
  return writeRaw(seeded);
}
