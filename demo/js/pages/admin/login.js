import { appendAudit } from "../../data/admin/audit.js";
import { authenticate, changePassword, getSession, getTotpCode, getTotpProgress, setSession, TOTP_FALLBACK_CODE } from "../../data/admin/auth.js";

if (getSession()) window.location.href = "index.html";

let identity = null;
let totpTimer = null;
const stages = { credentials: document.querySelector("#login-stage-credentials"), password: document.querySelector("#login-stage-password"), totp: document.querySelector("#login-stage-totp") };

function showStage(name) {
  Object.entries(stages).forEach(([key, node]) => { node.hidden = key !== name; });
  const target = stages[name]?.querySelector("input");
  if (target) requestAnimationFrame(() => target.focus({ preventScroll: false }));
}
function showMessage(id, text, type = "error") { const node = document.querySelector(id); node.textContent = text; node.hidden = !text; node.className = `admin-form-message${type === "success" ? "" : " is-danger"}`; }
function updateTotp() {
  const now = Date.now();
  document.querySelector("#totp-code").textContent = getTotpCode(now);
  document.querySelector("#totp-progress").style.transform = `scaleX(${getTotpProgress(now)})`;
}
function startTotp() { showStage("totp"); updateTotp(); if (totpTimer) window.clearInterval(totpTimer); totpTimer = window.setInterval(updateTotp, 500); }

document.querySelector("#credentials-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;
  const result = authenticate(username, password);
  if (!result.ok) {
    appendAudit({ role: "sistema", action: "Nesėkmingas prisijungimas", target: username, result: "Neteisingi prisijungimo duomenys" });
    showMessage("#credentials-message", "Neteisingas naudotojo vardas arba slaptažodis.");
    return;
  }
  identity = result;
  showMessage("#credentials-message", "", "success");
  if (result.mustChange) showStage("password"); else startTotp();
});

document.querySelector("#new-password").addEventListener("input", (event) => {
  const value = event.target.value;
  const score = [value.length >= 12, /[A-ZĄČĘĖĮŠŲŪŽ]/.test(value), /[a-ząčęėįšųūž]/.test(value), /\d/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
  document.querySelector("#password-strength").textContent = `Stiprumas: ${score < 3 ? "silpnas" : score < 5 ? "vidutinis" : "stiprus"}.`;
});

document.querySelector("#password-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const password = document.querySelector("#new-password").value;
  const repeat = document.querySelector("#new-password-repeat").value;
  if (password.length < 12) { showMessage("#password-message", "Slaptažodis turi būti bent 12 simbolių."); return; }
  if (password !== repeat) { showMessage("#password-message", "Slaptažodžiai nesutampa."); return; }
  changePassword(identity.username, password);
  appendAudit({ role: identity.role, action: "Pakeistas laikinas slaptažodis", target: identity.username, result: "Išsaugota" });
  startTotp();
});

document.querySelector("#totp-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const entered = document.querySelector("#totp-input").value.trim();
  if (entered !== getTotpCode() && entered !== TOTP_FALLBACK_CODE) {
    appendAudit({ role: identity?.role || "sistema", action: "Nesėkmingas TOTP patikrinimas", target: identity?.username || "–", result: "Kodas nesutapo" });
    showMessage("#totp-message", "Kodas nesutapo. Įveskite rodomą kodą arba demonstracinį 000000.");
    return;
  }
  if (totpTimer) window.clearInterval(totpTimer);
  setSession(identity);
  appendAudit({ role: identity.role, action: "Prisijungta prie valdymo pulto", target: identity.username, result: "TOTP patvirtintas" });
  window.location.href = "index.html";
});
