import { bootAdminShell, auditAction, toast } from "./shell.js";

const shell = bootAdminShell({ active: "settings", title: "Nustatymai", requiredRole: "administratorius" });
if (shell.allowed) {
  const SETTINGS_KEY = "kms_amis_admin_settings_v1";
  const rules = [
    ["range", "Reikšmė katalogo intervale", "Tikrina, ar reikšmė patenka tarp parametro minimalaus ir maksimalaus dydžio."],
    ["deviation", ">100 % nuokrypis + absoliutinė riba", "Žymi anomaliją, kai metinio vidurkio nuokrypis viršija 100 % ir kartu viršijama absoliutinė riba."],
    ["gap", "Duomenų spragos aptikimas", "Vertina, ar pagal parametrui nustatytą dažnį laiku gautas naujas įrašas."],
    ["unit", "Vieneto formato patikra", "Lygina gauto įrašo matavimo vienetą su katalogo vienetu." ]
  ];
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); } catch (error) { saved = {}; }
  if (saved.offlineMinutes) document.querySelector("#offline-minutes").value = saved.offlineMinutes;
  if (saved.cacheTtl) document.querySelector("#cache-ttl").value = saved.cacheTtl;
  if (saved.rateLimit) document.querySelector("#rate-limit").value = saved.rateLimit;
  document.querySelector("#validation-rules").innerHTML = rules.map(([id, label, description]) => `<div class="admin-rule"><div><strong>${label}</strong><p>${description}</p></div><label class="admin-switch"><input type="checkbox" data-validation-rule="${id}" ${saved.rules?.[id] !== false ? "checked" : ""}><span class="fine-print">Įjungta</span></label></div>`).join("");
  document.querySelector("#settings-form").addEventListener("submit", (event) => { event.preventDefault(); const ruleState = {}; document.querySelectorAll("[data-validation-rule]").forEach((input) => { ruleState[input.dataset.validationRule] = input.checked; }); const value = { offlineMinutes: Number(document.querySelector("#offline-minutes").value), cacheTtl: Number(document.querySelector("#cache-ttl").value), rateLimit: Number(document.querySelector("#rate-limit").value), rules: ruleState, updatedAt: new Date().toISOString() }; localStorage.setItem(SETTINGS_KEY, JSON.stringify(value)); document.querySelector("#settings-message").textContent = "Nustatymai išsaugoti šios naršyklės demonstracinėje būsenoje."; auditAction("Išsaugoti valdymo pulto nustatymai", SETTINGS_KEY, "Išsaugota"); toast("Nustatymai išsaugoti."); });
}
