import { CATALOG, SECTIONS } from "../data/catalog.js";
import { ALL_SITES, MICRODISTRICTS } from "../data/sites.js";
import { deleteSubscription, getAllSubscriptions, saveSubscription, updateSubscription } from "../data/subscriptions.js";
import { escapeHtml } from "./common.js";

let pendingId = null;
let demoCode = "";
function id(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
function checked(group) { return [...document.querySelectorAll(`[data-check-group="${group}"]:checked`)].map((input) => input.value); }
function renderSummary() {
  const groups = [["Mikrorajonai", checked("districts")], ["Monitoringo dalys", checked("sections")], ["Taškai", checked("sites")], ["Parametrai", checked("parameters")]];
  const markup = groups.map(([label, values]) => `<div><strong>${label}:</strong> ${values.length ? `${values.length} pasirinkta` : "nepasirinkta"}</div>`).join("");
  document.querySelectorAll("#subscription-selection-summary, #subscription-selection-summary-confirm").forEach((summary) => { summary.innerHTML = markup; });
}
function go(step) {
  document.querySelectorAll("[data-wizard-step]").forEach((item) => item.classList.toggle("is-active", item.dataset.wizardStep === step));
  const panels = [...document.querySelectorAll("[data-wizard-panel]")];
  panels.forEach((item) => { item.hidden = item.dataset.wizardPanel !== step; });
  window.scrollTo({ top: document.querySelector("#subscription-wizard").offsetTop - 18, behavior: "smooth" });
  const panel = panels.find((item) => item.dataset.wizardPanel === step);
  if (panel && !panel.hasAttribute("tabindex")) panel.setAttribute("tabindex", "-1");
  if (panel) requestAnimationFrame(() => panel.focus({ preventScroll: true }));
}
function selectionValid() { return checked("districts").length || checked("sections").length || checked("sites").length || checked("parameters").length; }
export function initSubscription() {
  const groups = {
    districts: MICRODISTRICTS.map((item) => ({ id: item.properties.id, label: item.properties.name })),
    sections: SECTIONS.filter((item) => item.id !== "meteorology").map((item) => ({ id: item.id, label: item.menuName })),
    sites: ALL_SITES.map((item) => ({ id: item.id, label: `${item.shortName} · ${item.name}` })),
    parameters: CATALOG.filter((item) => item.section !== "meteorology").map((item) => ({ id: item.id, label: item.name }))
  };
  Object.entries(groups).forEach(([group, items]) => { const target = document.querySelector(`[data-check-list="${group}"]`); target.innerHTML = items.map((item) => `<label><input type="checkbox" data-check-group="${group}" value="${escapeHtml(item.id)}"> <span>${escapeHtml(item.label)}</span></label>`).join(""); });
  document.querySelectorAll("[data-check-group]").forEach((input) => input.addEventListener("change", renderSummary));
  document.querySelector("#to-confirm").addEventListener("click", () => { if (!selectionValid()) { document.querySelector("#subscription-status").textContent = "Pasirinkite bent vieną rajoną, monitoringo dalį, tašką arba parametrą."; return; } renderSummary(); go("confirm"); });
  document.querySelector("#back-to-selection").addEventListener("click", () => go("selection"));
  document.querySelector("#subscription-form").addEventListener("submit", (event) => { event.preventDefault(); const email = document.querySelector("#subscription-email").value.trim().toLowerCase(); if (!event.target.querySelector("[name=consent]").checked) { document.querySelector("#subscription-status").textContent = "Norint tęsti būtinas aiškus sutikimas su prenumeratos sąlygomis."; return; } demoCode = `KMS-${Math.floor(1000 + Math.random() * 9000)}`; pendingId = id("sub"); saveSubscription({ id: pendingId, email, status: "pending", createdAt: new Date().toISOString(), demoCode, districts: checked("districts"), sections: checked("sections"), sites: checked("sites"), parameters: checked("parameters"), consent: true, consentAt: new Date().toISOString() }); document.querySelector("#demo-code").textContent = `[${demoCode}]`; document.querySelector("#subscription-status").textContent = "Patvirtinimo žingsnis parengtas."; go("verify"); });
  document.querySelector("#verify-form").addEventListener("submit", (event) => { event.preventDefault(); const code = document.querySelector("#verify-code").value.trim(); if (code !== demoCode) { document.querySelector("#verify-status").textContent = "Kodas nesutampa. Demonstracijoje naudokite ekrane rodomą kodą skliaustuose."; return; } updateSubscription(pendingId, { status: "active", verifiedAt: new Date().toISOString() }); document.querySelector("#verify-status").textContent = "Prenumerata patvirtinta. Demonstracinis įrašas pateks į bendrą phase-3 administravimo modulio saugyklą."; go("done"); });
  document.querySelector("#erase-form").addEventListener("submit", (event) => { event.preventDefault(); const email = document.querySelector("#erase-email").value.trim().toLowerCase(); const count = deleteSubscription(email); document.querySelector("#erase-status").textContent = count ? `Ištrinta ${count} prenumerata(-os).` : "Šiam el. paštui prenumeratų nerasta."; });
  renderSummary();
  document.querySelector("#subscription-storage-note").textContent = `Demo saugyklos raktas: kms-amis-demo-subscriptions-v1 · įrašų šiuo metu: ${getAllSubscriptions().length}`;
}
