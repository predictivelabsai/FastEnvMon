import { SLA_LEVELS, ensureTickets, listTickets, saveTicket, updateTicket, demoNow } from "../../data/admin/sla.js";
import { formatDateTime, escapeHtml } from "../common.js";
import { auditAction, bootAdminShell, toast } from "./shell.js";

const shell = bootAdminShell({ active: "sla", title: "SLA bilietai" });
if (shell.allowed) {
  const fixedNow = demoNow();
  function countdown(dueAt) {
    const minutes = Math.round((new Date(dueAt).getTime() - fixedNow.getTime()) / 60000);
    const late = minutes < 0;
    const absolute = Math.abs(minutes);
    const hours = Math.floor(absolute / 60);
    const mins = String(absolute % 60).padStart(2, "0");
    return `<span class="sla-countdown ${late ? "is-late" : "is-ok"}">${late ? "Vėluoja" : `Likutis ${hours}:${mins}`}</span>`;
  }
  function render() {
    document.querySelector("#sla-table").innerHTML = listTickets().map((ticket) => { const level = SLA_LEVELS[ticket.level]; return `<tr><td><strong>${escapeHtml(ticket.id)}</strong><small>${formatDateTime(ticket.createdAt)}</small></td><td>${escapeHtml(level.name)}</td><td>${escapeHtml(ticket.description)}<small>${escapeHtml(level.description)}</small></td><td>${escapeHtml(level.response)}</td><td>${escapeHtml(level.fix)}</td><td>${escapeHtml(level.total)}</td><td>${escapeHtml(level.service)}</td><td>${escapeHtml(ticket.target)}</td><td>${countdown(ticket.dueAt)}<small>${formatDateTime(ticket.dueAt)}</small></td><td><select class="select-field" data-ticket-status="${escapeHtml(ticket.id)}" aria-label="Bilieto ${escapeHtml(ticket.id)} būsena" style="min-height:34px;width:auto"><option ${ticket.status === "Naujas" ? "selected" : ""}>Naujas</option><option ${ticket.status === "Tiriamas" ? "selected" : ""}>Tiriamas</option><option ${ticket.status === "Išspręstas" ? "selected" : ""}>Išspręstas</option></select></td></tr>`; }).join("");
  }
  ensureTickets();
  render();
  document.querySelector("#sla-table").addEventListener("change", (event) => { const id = event.target.dataset.ticketStatus; if (!id) return; const status = event.target.value; updateTicket(id, { status, closedAt: status === "Išspręstas" ? new Date().toISOString() : "" }); auditAction(status === "Išspręstas" ? "Uždarytas SLA bilietas" : "Atnaujinta SLA bilieto būsena", id, status); toast("Būsena atnaujinta."); render(); });
  document.querySelector("#sla-form").addEventListener("submit", (event) => { event.preventDefault(); const levelId = document.querySelector("#sla-level").value; const level = SLA_LEVELS[levelId]; const createdAt = fixedNow.toISOString(); const ticket = { id: `SLA-${String(Date.now()).slice(-6)}`, level: levelId, description: document.querySelector("#sla-description").value, target: document.querySelector("#sla-target").value, createdAt, dueAt: new Date(fixedNow.getTime() + level.totalHours * 3600000).toISOString(), status: "Naujas" }; saveTicket(ticket); auditAction("Sukurtas SLA bilietas", ticket.id, level.name); toast("SLA bilietas sukurtas."); event.target.reset(); render(); });
}
