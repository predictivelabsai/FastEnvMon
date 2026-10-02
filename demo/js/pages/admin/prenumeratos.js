import { getAllSubscriptions, listPendingSubscriptions, saveSubscription, eraseSubscriptionData, listEraseEvents, normalizeSubscriptionStatus, subscriptionStatusLabel } from "../../data/subscriptions.js";
import { formatDateTime, escapeHtml } from "../common.js";
import { auditAction, bootAdminShell, downloadCsv, toast } from "./shell.js";

const shell = bootAdminShell({ active: "subscriptions", title: "Prenumeratos ir BDSR", requiredRole: "administratorius" });
if (shell.allowed) {
  function ensureDemoSubscribers() {
    if (getAllSubscriptions().length) return;
    [
      { id: "SUB-DEMO-01", email: "aplinka@klaipeda.lt", sections: ["Automatinis aplinkos oras"], sites: ["KA-01", "KA-05"], status: "patvirtinta", createdAt: "2026-09-12T08:30:00.000Z" },
      { id: "SUB-DEMO-02", email: "gyventojas@example.lt", sections: ["Dirvožemis", "Paviršinis vanduo"], sites: ["DT-01", "VT-01"], status: "laukiama patvirtinimo", createdAt: "2026-09-28T14:12:00.000Z" },
      { id: "SUB-DEMO-03", email: "stebiu@pajuris.lt", sections: ["Želdynai ir želdiniai"], sites: ["ZG-01", "ZG-05"], status: "patvirtinta", createdAt: "2026-09-30T09:04:00.000Z" }
    ].forEach(saveSubscription);
  }
  function render() {
    const subscriptions = getAllSubscriptions();
    document.querySelector("#subscriber-table").innerHTML = subscriptions.map((item) => `<tr><td><strong>${escapeHtml(item.email)}</strong></td><td>${escapeHtml((item.sections || []).join(", ") || "–")}</td><td>${escapeHtml((item.sites || []).join(", ") || "–")}</td><td><span class="admin-chip ${normalizeSubscriptionStatus(item.status) === "active" ? "admin-status-ok" : "admin-status-warn"}">${escapeHtml(subscriptionStatusLabel(item.status))}</span></td><td>${formatDateTime(item.createdAt)}</td></tr>`).join("") || `<tr><td colspan="5">Prenumeratų nėra.</td></tr>`;
    const pending = listPendingSubscriptions();
    document.querySelector("#pending-subscribers").innerHTML = pending.length ? pending.map((item) => `<div class="admin-rule"><div><strong>${escapeHtml(item.email)}</strong><p>${formatDateTime(item.createdAt)} · laukia dvigubo patvirtinimo</p></div><button class="button button--secondary button--small" data-resend="${escapeHtml(item.id)}" type="button">Persiųsti patvirtinimo laišką</button></div>`).join("") : `<p class="muted">Laukiančių patvirtinimų nėra.</p>`;
    const erases = listEraseEvents();
    document.querySelector("#erase-log-table").innerHTML = erases.map((item) => `<tr><td>${formatDateTime(item.erasedAt)}</td><td>${escapeHtml(item.email)}</td><td>${item.recordsRemoved}</td></tr>`).join("") || `<tr><td colspan="3">BDSR užklausų dar nėra.</td></tr>`;
  }
  ensureDemoSubscribers();
  render();
  document.querySelector("#pending-subscribers").addEventListener("click", (event) => { const button = event.target.closest("button[data-resend]"); if (!button) return; auditAction("Persiųstas prenumeratos patvirtinimo laiškas", button.dataset.resend, "Simuliuota"); toast("Patvirtinimo laiškas persiųstas simuliuojant."); });
  document.querySelector("#erase-admin-form").addEventListener("submit", (event) => { event.preventDefault(); const email = document.querySelector("#erase-admin-email").value.trim(); if (!window.confirm("BDSR: duomenys bus ištrinti negrįžtamai")) return; const result = eraseSubscriptionData(email); auditAction("Ištrinti naudotojo duomenys pagal BDSR", email, `${result.recordsRemoved} įrašai pašalinti`); document.querySelector("#erase-admin-status").textContent = `BDSR veiksmas atliktas: pašalinta ${result.recordsRemoved} įrašų.`; toast("Naudotojo duomenys ištrinti."); render(); });
  document.querySelector("#export-erase-log").addEventListener("click", () => { const rows = [["Laikas", "El. paštas", "Pašalinta įrašų"], ...listEraseEvents().map((item) => [item.erasedAt, item.email, item.recordsRemoved])]; downloadCsv("kms-amis-bdsr-zurnalas.csv", rows); auditAction("Eksportuotas BDSR užklausų žurnalas", "CSV", "Atsisiųsta"); });
}
