import { listAudit } from "../../data/admin/audit.js";
import { formatDateTime, escapeHtml } from "../common.js";
import { bootAdminShell, downloadCsv } from "./shell.js";

const shell = bootAdminShell({ active: "audit", title: "Audito žurnalas" });
if (shell.allowed) {
  function filtered() {
    const role = document.querySelector("#audit-role").value;
    const date = document.querySelector("#audit-date").value;
    const action = document.querySelector("#audit-action").value.trim().toLowerCase();
    return listAudit().filter((item) => role === "all" || item.role === role).filter((item) => !date || item.timestamp.slice(0, 10) === date).filter((item) => !action || `${item.action} ${item.target}`.toLowerCase().includes(action));
  }
  function render() { document.querySelector("#audit-table").innerHTML = filtered().map((item) => `<tr><td>${formatDateTime(item.timestamp)}</td><td>${escapeHtml(item.role)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.target)}</td><td>${escapeHtml(item.result)}</td></tr>`).join("") || `<tr><td colspan="5">Pagal pasirinktus filtrus įrašų nėra.</td></tr>`; }
  document.querySelector("#audit-filter").addEventListener("click", render);
  document.querySelector("#audit-export").addEventListener("click", () => { downloadCsv("kms-amis-auditas.csv", [["Laikas", "Vaidmuo", "Veiksmas", "Taikinys", "Rezultatas"], ...filtered().map((item) => [item.timestamp, item.role, item.action, item.target, item.result])]); });
  render();
}
