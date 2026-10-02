import { SECTIONS, getParameter, listParameters } from "../../data/catalog.js";
import { ALL_SITES, STATIONS } from "../../data/sites.js";
import { PERIODIC_SITES } from "../../data/periodic_sites.js";
import { DEMO_NOW, registerManualRecord } from "../../data/generator.js";
import { listFeed } from "../../data/admin/feed.js";
import { clearQueryCache } from "../../data/query.js";
import { formatDateTime, formatNumber, setOptions, escapeHtml } from "../common.js";
import { auditAction, bootAdminShell, toast } from "./shell.js";

const shell = bootAdminShell({ active: "data", title: "Duomenų valdymas" });
if (shell.allowed) {
  const allowedSections = SECTIONS.filter((item) => ["laboratory-air", "soil", "surface-water", "noise", "wildlife", "greenery"].includes(item.id));
  const sectionSelect = document.querySelector("#manual-section");
  const siteSelect = document.querySelector("#manual-site");
  const parameterSelect = document.querySelector("#manual-parameter");
  setOptions(sectionSelect, allowedSections, { label: (item) => item.name });

  function updateSelectors() {
    const sectionId = sectionSelect.value;
    const sites = sectionId === "laboratory-air" ? STATIONS : PERIODIC_SITES.filter((site) => site.parameters.includes(sectionId));
    const parameters = listParameters(sectionId);
    setOptions(siteSelect, sites, { label: (item) => `${item.shortName} · ${item.name}` });
    setOptions(parameterSelect, parameters, { label: (item) => `${item.name} (${item.unit})` });
  }

  function renderSources() {
    const protocols = ["HTTPS", "AMQP", "MQTT", "WebSocket", "HTTPS", "HTTP", "HTTPS", "MQTT", "AMQP", "HTTPS", "MQTT", "WebSocket", "CSV", "JSON", "WMS/WFS", "XLSX/XML"];
    const rows = [...ALL_SITES.map((site, index) => ({ ...site, protocol: protocols[index], frequency: site.id.startsWith("KA") ? "60 min" : "5 min" })), { id: "GIS-01", shortName: "GIS-01", name: "Savivaldybės rajonų sluoksnis", type: "Trečiosios šalies WMS / WFS", protocol: "WMS/WFS", frequency: "pagal užklausą" }];
    document.querySelector("#sources-table").innerHTML = rows.map((row) => `<tr><td><strong>${escapeHtml(row.shortName)}</strong><small>${escapeHtml(row.name)}</small></td><td>${escapeHtml(row.type)}${row.vendor ? `<small>${escapeHtml(row.vendor)}</small>` : ""}</td><td><span class="admin-chip protocol-chip">${escapeHtml(row.protocol)}</span></td><td>${row.frequency}</td><td><span class="admin-chip ${row.id === "KA-07" ? "admin-status-danger" : "admin-status-ok"}">${row.id === "KA-07" ? "Neprisijungusi" : "Aktyvus"}</span></td></tr>`).join("");
  }

  function renderLog() {
    const feed = listFeed().slice(0, 12);
    document.querySelector("#ingestion-log").innerHTML = feed.map((item) => `<tr><td>${formatDateTime(item.timestamp)}</td><td>${escapeHtml(item.siteId)}<small>${escapeHtml(item.siteName)}</small></td><td>${escapeHtml(item.parameterName)}</td><td>${item.count}</td><td><span class="admin-chip protocol-chip">${escapeHtml(item.protocol)}</span></td><td><span class="admin-chip ${item.status.includes("ATMESTA") ? "admin-status-danger" : "admin-status-ok"}">${escapeHtml(item.status)}</span></td></tr>`).join("");
  }

  sectionSelect.addEventListener("change", updateSelectors);
  updateSelectors();
  renderSources();
  renderLog();
  document.querySelector("#manual-date").value = new Date(DEMO_NOW.getTime() - 3600000).toISOString().slice(0, 16);

  document.querySelector("#manual-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const parameter = getParameter(parameterSelect.value);
    const value = Number(document.querySelector("#manual-value").value);
    const outOfRange = value < parameter.range.min || value > parameter.range.max;
    const markedInvalid = document.querySelector("#manual-invalid").checked;
    const status = outOfRange || markedInvalid ? "NEVALIDUS. Laukiama patvirtinimo" : "GALIOJANTIS";
    const rangeMessage = outOfRange ? `Reikšmė už katalogo ribų (min ${formatNumber(parameter.range.min)} · max ${formatNumber(parameter.range.max)})` : value > (parameter.norms.limit ?? Infinity) ? `Reikšmė viršija normą (${formatNumber(parameter.norms.limit)} ${parameter.unit}), bet yra katalogo ribose.` : "Reikšmė atitinka katalogo intervalą.";
    const message = document.querySelector("#manual-message");
    message.hidden = false;
    message.className = `admin-form-message${outOfRange ? " is-danger" : ""}`;
    message.textContent = `${rangeMessage} Įrašas bus saugomas kaip ${status}.`;
    const record = registerManualRecord(parameter.id, siteSelect.value, document.querySelector("#manual-date").value, value, status, { editor: shell.session.role, source: "Rankinis laboratorinis suvedimas", flag: outOfRange ? "Už katalogo ribų" : "" });
    clearQueryCache();
    auditAction("Įvestas rankinis duomenų įrašas", `${record.siteId} · ${parameter.name}`, status);
    toast("Laboratorinis įrašas išsaugotas.");
    renderLog();
  });

  document.querySelector("#backfill-file").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    document.querySelector("#backfill-message").textContent = `Paketas „${file.name}“ paruoštas simuliuojamam priėmimui. Reali byla neįkelta.`;
    auditAction("Simuliuotas perdavimo paketo importas", file.name, "Paruošta peržiūrai");
    toast("Perdavimo paketo veiksmas simuliuotas.");
  });
}
