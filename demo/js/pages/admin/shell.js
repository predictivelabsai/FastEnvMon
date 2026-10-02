import { appendAudit, listAudit } from "../../data/admin/audit.js";
import { clearSession, getRoleLabel, getSession } from "../../data/admin/auth.js";

const NAV_ITEMS = [
  ["index.html", "Peržiūros skydas", "dashboard"],
  ["duomenys.html", "Duomenų valdymas", "data"],
  ["patvirtinimas.html", "Duomenų patvirtinimas", "approval"],
  ["nevalidus.html", "Neleistini įrašai (NEVALIDUS)", "invalid"],
  ["pranesimai.html", "Pranešimų valdymas", "notifications"],
  ["prenumeratos.html", "Prenumeratos ir BDSR", "subscriptions", "administratorius"],
  ["auditas.html", "Audito žurnalas", "audit"],
  ["sla.html", "SLA bilietai", "sla"],
  ["nustatymai.html", "Nustatymai", "settings", "administratorius"]
];

function currentRole() { return getSession()?.role ?? "sistema"; }

function renderSidebar(active, session) {
  const sidebar = document.querySelector("#admin-sidebar");
  if (!sidebar) return;
  const links = NAV_ITEMS.filter(([, , , role]) => !role || role === session.role).map(([href, label, key]) => `<li><a class="admin-nav-link${key === active ? " is-active" : ""}" href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");
  sidebar.innerHTML = `<a class="admin-brand" href="index.html"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>KMS AMIS</strong><small>valdymo pultas</small></span></a><div class="brand-stripe brand-stripe--compact" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div><nav class="admin-nav" aria-label="Valdymo pulto meniu"><ul>${links}<li><button class="admin-nav-link admin-nav-logout" type="button" data-admin-sidebar-logout>Atsijungti</button></li></ul></nav><div class="admin-sidebar-note"><span class="eyebrow">Demonstracija</span><p>Duomenys ir veiksmai išsaugomi tik šios naršyklės localStorage.</p></div>`;
  sidebar.querySelector("[data-admin-sidebar-logout]").addEventListener("click", () => logout(session));
}

function logout(session) {
  appendAudit({ role: session.role, action: "Atsijungta iš valdymo pulto", target: "Sesija", result: "Atlikta" });
  clearSession();
  window.location.href = "login.html";
}

function renderTopbar(session) {
  const topbar = document.querySelector("#admin-topbar");
  if (!topbar) return;
  topbar.innerHTML = `<div><span class="eyebrow">KMS AMIS · fazė 3</span><strong>Valdymo pultas</strong></div><div class="admin-top-actions"><span class="role-chip">${getRoleLabel(session.role)}</span><button class="button button--secondary button--small" type="button" data-admin-logout>Atsijungti</button></div>`;
  topbar.querySelector("[data-admin-logout]").addEventListener("click", () => logout(session));
}

export function toast(message, type = "success") {
  let region = document.querySelector("#admin-toast-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "admin-toast-region";
    region.className = "admin-toast-region";
    document.body.append(region);
  }
  const item = document.createElement("div");
  item.className = `admin-toast admin-toast--${type}`;
  item.textContent = message;
  region.append(item);
  window.setTimeout(() => item.remove(), 4200);
}

export function auditAction(action, target, result = "Atlikta") {
  return appendAudit({ role: currentRole(), action, target, result });
}

export function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function bootAdminShell({ active, title, requiredRole = "any" } = {}) {
  const session = getSession();
  if (!session) {
    window.location.href = "login.html";
    return { allowed: false, session: null };
  }
  renderSidebar(active, session);
  renderTopbar(session);
  document.title = `${title || "Valdymo pultas"} · KMS AMIS`;
  if (requiredRole !== "any" && session.role !== requiredRole) {
    const main = document.querySelector("#admin-main");
    if (main) main.innerHTML = `<section class="surface surface-pad admin-refusal"><span class="eyebrow">Prieigos teisė</span><h1>Prieiga nesuteikta</h1><p>Šiai sričiai reikalingas administratoriaus vaidmuo. Dabartinis vaidmuo: <strong>${getRoleLabel(session.role)}</strong>.</p><a class="button button--secondary" href="index.html">Grįžti į peržiūros skydą</a></section>`;
    return { allowed: false, session };
  }
  return { allowed: true, session };
}

export function recentAudit(limit = 5) { return listAudit().slice(0, limit); }
