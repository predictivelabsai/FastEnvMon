import { DEMO_NOW } from "../../data/generator.js";
import { STATIONS, IOT_DEVICES } from "../../data/sites.js";
import { getAllSubscriptions } from "../../data/subscriptions.js";
import { listManualRecords } from "../../data/admin/records.js";
import { appendFeed, createIngestionEvent, ensureFeedSeed, listFeed } from "../../data/admin/feed.js";
import { formatDateTime, formatNumber, escapeHtml } from "../common.js";
import { bootAdminShell, recentAudit } from "./shell.js";

const shell = bootAdminShell({ active: "dashboard", title: "Peržiūros skydas" });
if (shell.allowed) {
  let feed = ensureFeedSeed();
  let feedIndex = 4;
  let feedStatusTick = 0;
  const statusClass = (value) => value.includes("ATMESTA") || value.includes("NEVALIDUS") ? "admin-status-danger" : value.includes("PASTAB") ? "admin-status-warn" : "admin-status-ok";

  function renderFeed() {
    document.querySelector("#feed-table").innerHTML = feed.slice(0, 10).map((item, index) => `<tr class="${index === 0 ? "admin-feed-row-new" : ""}"><td>${formatDateTime(item.timestamp)}</td><td><strong>${escapeHtml(item.siteId)}</strong><small>${escapeHtml(item.siteName)}</small></td><td>${escapeHtml(item.parameterName)}<small>${escapeHtml(item.value === null ? "–" : `${formatNumber(item.value)} ${item.unit}`)}</small></td><td>${item.count}</td><td><span class="admin-chip protocol-chip">${escapeHtml(item.protocol)}</span></td><td><span class="admin-chip ${statusClass(item.status)}">${escapeHtml(item.status)}</span></td></tr>`).join("");
    const total = 1240 + feed.reduce((sum, item) => sum + Number(item.count || 0), 0);
    document.querySelector("#kpi-ingested").textContent = total.toLocaleString("lt-LT");
    feedStatusTick += 1;
    if (feedStatusTick % 3 === 0) document.querySelector("#feed-status").textContent = `Priėmimo srautas atnaujintas · naujausias įvykis ${formatDateTime(feed[0]?.timestamp)} · viso šiandien ${total.toLocaleString("lt-LT")} įrašų`;
  }

  function renderHealth() {
    const sites = [...STATIONS, ...IOT_DEVICES];
    document.querySelector("#health-table").innerHTML = sites.map((site) => {
      const offline = site.id === "KA-07";
      return `<tr><td><strong>${escapeHtml(site.shortName)}</strong><small>${escapeHtml(site.name)}</small></td><td>${escapeHtml(site.type)}</td><td>${offline ? formatDateTime("2026-10-01T06:40:00Z") : formatDateTime(DEMO_NOW)}</td><td><span class="admin-chip ${offline ? "admin-status-danger" : "admin-status-ok"}">${offline ? "Neprisijungusi" : "OK"}</span>${offline ? "<small>neprisijungusi nuo 2026-10-01 09:40</small>" : ""}</td></tr>`;
    }).join("");
  }

  function renderAudit() {
    document.querySelector("#audit-preview").innerHTML = recentAudit(5).map((entry) => `<tr><td>${formatDateTime(entry.timestamp)}</td><td>${escapeHtml(entry.role)}</td><td>${escapeHtml(entry.action)}<small>${escapeHtml(entry.target)}</small></td><td>${escapeHtml(entry.result)}</td></tr>`).join("");
  }

  function renderKpis() {
    const invalid = listManualRecords().filter((item) => String(item.status).startsWith("NEVALIDUS")).length + 1;
    const subscribers = getAllSubscriptions().filter((item) => item.status === "active").length;
    document.querySelector("#kpi-invalid").textContent = invalid;
    document.querySelector("#kpi-subscribers").textContent = subscribers;
  }

  function render() { feed = listFeed(); renderFeed(); renderHealth(); renderAudit(); renderKpis(); }
  render();
  window.setInterval(() => { const event = createIngestionEvent(feedIndex); feedIndex += 1; appendFeed(event); render(); }, 4000);
}
