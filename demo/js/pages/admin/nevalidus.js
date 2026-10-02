import { getParameter } from "../../data/catalog.js";
import { ALL_SITES, getSite } from "../../data/sites.js";
import { getPeriodicSite, PERIODIC_SITES } from "../../data/periodic_sites.js";
import { registerManualRecord } from "../../data/generator.js";
import { ensureDemoInvalidRecords, listManualRecords, updateManualRecord } from "../../data/admin/records.js";
import { formatDateTime, formatNumber, escapeHtml, setOptions } from "../common.js";
import { auditAction, bootAdminShell, toast } from "./shell.js";

const shell = bootAdminShell({ active: "invalid", title: "NEVALIDUS įrašai" });
if (shell.allowed) {
  ensureDemoInvalidRecords();
  let editingId = null;
  const story = { id: "STORY-KA05-NH3", siteId: "KA-05", parameterId: "nh3", timestamp: "2026-02-16T06:00:00.000Z", value: 120, status: "NEVALIDUS. Laukiama patvirtinimo", flag: "ANOMALIJA >100 % + viršyta absoliutinė riba", createdAt: "2026-02-16T06:05:00.000Z" };
  const siteFilter = document.querySelector("#invalid-site-filter");
  setOptions(siteFilter, [{ id: "all", name: "Visi taškai" }, ...ALL_SITES, ...PERIODIC_SITES], { value: (item) => item.id, label: (item) => item.name ? `${item.shortName || item.id} · ${item.name}` : item.id });

  function rows() { return [story, ...listManualRecords().filter((item) => String(item.status).startsWith("NEVALIDUS"))]; }
  function statusClass(status) { return status === "GALIOJANTIS" ? "admin-status-ok" : "admin-status-danger"; }
  function approve(row, value) {
    const parameter = getParameter(row.parameterId);
    if (row.id === story.id) registerManualRecord(row.parameterId, row.siteId, row.timestamp, value ?? row.value, "GALIOJANTIS", { editor: shell.session.role, source: "NEVALIDUS patvirtinimas", reason: "Patvirtinta po peržiūros", flag: "" });
    else updateManualRecord(row.id, { value: value ?? row.value, status: "GALIOJANTIS", editor: shell.session.role, approvedAt: new Date().toISOString(), reason: "Patvirtinta po peržiūros" });
    auditAction("Patvirtintas NEVALIDUS įrašas", `${row.siteId} · ${parameter?.name || row.parameterId}`, "GALIOJANTIS");
    editingId = null;
    toast("Įrašas patvirtintas kaip galiojantis.");
    render();
  }
  function render() {
    const site = siteFilter.value;
    const status = document.querySelector("#invalid-status-filter").value;
    const filtered = rows().filter((row) => site === "all" || row.siteId === site).filter((row) => status === "all" || (status === "invalid" && String(row.status).startsWith("NEVALIDUS")) || (status === "valid" && row.status === "GALIOJANTIS"));
    document.querySelector("#invalid-table").innerHTML = filtered.map((row) => {
      const parameter = getParameter(row.parameterId);
      const siteData = getSite(row.siteId) || getPeriodicSite(row.siteId);
      const edit = editingId === row.id ? `<div class="admin-inline-edit"><input data-edit-value="${row.id}" type="number" step="any" aria-label="Nauja ${escapeHtml(parameter?.name || row.parameterId)} reikšmė (${escapeHtml(row.siteId)})" value="${row.value}"><button class="button button--primary" data-action="approve-edit" data-id="${row.id}" type="button">Išsaugoti</button></div>` : row.status === "GALIOJANTIS" ? "<span class=\"fine-print\">Sprendimas įrašytas</span>" : `<div class="admin-inline-actions"><button class="button button--primary" data-action="approve" data-id="${row.id}" type="button">Patvirtinti</button><button class="button button--secondary" data-action="edit" data-id="${row.id}" type="button">Redaguoti ir patvirtinti</button><button class="button button--secondary" data-action="keep" data-id="${row.id}" type="button">Laikyti nepatvirtintu</button></div>`;
      return `<tr><td>${formatDateTime(row.timestamp)}<small>${escapeHtml(row.createdAt ? `gauta ${formatDateTime(row.createdAt)}` : "")}</small></td><td><strong>${escapeHtml(row.siteId)}</strong><small>${escapeHtml(siteData?.name || "")}</small></td><td>${escapeHtml(parameter?.name || row.parameterId)}</td><td>${formatNumber(row.value)} ${escapeHtml(parameter?.unit || "")}</td><td>${escapeHtml(row.flag || "–")}</td><td><span class="admin-chip ${statusClass(row.status)}">${escapeHtml(row.status)}</span></td><td>${edit}</td></tr>`;
    }).join("") || `<tr><td colspan="7">Pagal filtrus įrašų nėra.</td></tr>`;
  }
  document.querySelector("#invalid-table").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const row = rows().find((item) => item.id === button.dataset.id);
    if (!row) return;
    if (button.dataset.action === "edit") { editingId = row.id; render(); return; }
    if (button.dataset.action === "approve-edit") { approve(row, Number(document.querySelector(`[data-edit-value="${row.id}"]`).value)); return; }
    if (button.dataset.action === "approve") { approve(row); return; }
    auditAction("NEVALIDUS įrašas paliktas nepatvirtintas", `${row.siteId} · ${row.parameterId}`, "Laukiama patvirtinimo");
    toast("Įrašas paliktas nepatvirtintas.");
  });
  [siteFilter, document.querySelector("#invalid-status-filter")].forEach((node) => node.addEventListener("change", render));
  document.querySelector("#invalid-refresh").addEventListener("click", render);
  render();
}
