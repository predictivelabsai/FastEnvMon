import { listParameters } from "../../data/catalog.js";
import { STATIONS, getSite } from "../../data/sites.js";
import { DEMO_NOW, registerManualRecord } from "../../data/generator.js";
import { listManualRecords } from "../../data/admin/records.js";
import { formatDateTime, formatNumber, setOptions, escapeHtml } from "../common.js";
import { auditAction, bootAdminShell, toast } from "./shell.js";

const shell = bootAdminShell({ active: "approval", title: "Duomenų patvirtinimas" });
if (shell.allowed) {
  const sites = STATIONS;
  const parameters = listParameters("automatic-air");
  const historySite = document.querySelector("#history-site");
  const historyParameter = document.querySelector("#history-parameter");
  const overwriteSite = document.querySelector("#overwrite-site");
  const overwriteParameter = document.querySelector("#overwrite-parameter");
  [historySite, overwriteSite].forEach((select) => setOptions(select, sites, { label: (item) => `${item.shortName} · ${item.name}` }));
  [historyParameter, overwriteParameter].forEach((select) => setOptions(select, parameters, { label: (item) => `${item.name} (${item.unit})` }));
  historySite.value = "KA-03"; overwriteSite.value = "KA-03"; historyParameter.value = "pm10"; overwriteParameter.value = "pm10";

  function timestampFromInput(value) { return value ? new Date(`${value}:00Z`).toISOString() : DEMO_NOW.toISOString(); }
  function renderHistory() {
    const siteId = historySite.value;
    const parameterId = historyParameter.value;
    const input = document.querySelector("#history-timestamp").value;
    const timestamp = timestampFromInput(input);
    const manual = listManualRecords().filter((item) => item.siteId === siteId && item.parameterId === parameterId && Math.abs(new Date(item.timestamp) - new Date(timestamp)) < 3600000);
    const isStory = siteId === "KA-03" && parameterId === "pm10" && input.startsWith("2025-05-11");
    const rows = isStory ? [
      { version: 1, timestamp: "2025-05-11T07:00:00Z", value: 68.2, editor: "sistema", reason: "Pradinis automatinis matavimas", status: "GALIOJANTIS" },
      { version: 2, timestamp: "2025-05-11T07:00:00Z", value: 31.6, editor: "administratorius", reason: "Klaidingas matavimas", status: "PATAISYTAS" }
    ] : [];
    manual.forEach((item) => rows.push({ version: item.version || 1, timestamp: item.timestamp, value: item.value, editor: item.editor || "sistema", reason: item.reason || "Rankinis įrašas", status: item.status }));
    const limited = rows.sort((a, b) => (a.version || 0) - (b.version || 0)).slice(-3);
    document.querySelector("#history-table").innerHTML = limited.length ? limited.map((row) => `<tr><td>v${row.version}</td><td>${formatDateTime(row.timestamp)}</td><td>${formatNumber(row.value)} ${escapeHtml(getSite(siteId)?.parameters ? (listParameters("automatic-air").find((item) => item.id === parameterId)?.unit || "") : "" )}</td><td>${escapeHtml(row.editor)}</td><td>${escapeHtml(row.reason)}</td><td><span class="admin-chip ${row.status === "PATAISYTAS" ? "admin-status-warn" : "admin-status-ok"}">${escapeHtml(row.status)}</span></td></tr>`).join("") : `<tr><td colspan="6">Šiai datai versijų istorijos nėra.</td></tr>`;
  }

  document.querySelector("#history-form").addEventListener("submit", (event) => { event.preventDefault(); renderHistory(); });
  renderHistory();
  document.querySelector("#overwrite-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const parameter = parameters.find((item) => item.id === overwriteParameter.value);
    const value = Number(document.querySelector("#overwrite-value").value);
    if (value < parameter.range.min || value > parameter.range.max) { document.querySelector("#overwrite-message").textContent = `Reikšmė už katalogo ribų (min ${formatNumber(parameter.range.min)} · max ${formatNumber(parameter.range.max)}).`; return; }
    const timestamp = timestampFromInput(document.querySelector("#overwrite-timestamp").value);
    const record = registerManualRecord(parameter.id, overwriteSite.value, timestamp, value, "PATAISYTAS", { editor: shell.session.role, reason: document.querySelector("#overwrite-reason").value, source: "Duomenų patvirtinimas" });
    document.querySelector("#overwrite-message").textContent = `Sukurta v${record.version} versija. Ankstesnis įrašas išsaugotas istorijoje.`;
    auditAction("Sukurta nauja duomenų versija", `${record.siteId} · ${parameter.name} · v${record.version}`, record.status);
    toast("Nauja duomenų versija išsaugota.");
    renderHistory();
  });
}
