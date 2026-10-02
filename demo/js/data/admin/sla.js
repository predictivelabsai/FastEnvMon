import { DEMO_NOW } from "../generator.js";

export const SLA_STORAGE_KEY = "kms_amis_admin_sla_tickets_v1";
export const SLA_LEVELS = Object.freeze({
  I: { name: "I lygis (Saugumo klaida)", description: "Sistemoje užfiksuotas kibernetinis incidentas, duomenų saugumo pažeidimas arba kritinis OWASP pažeidžiamumas, keliantis grėsmę duomenų vientisumui.", response: "Neturi viršyti 1 val. nuo pranešimo išsiuntimo ar užregistravimo momento.", fix: "Neturi viršyti 4 val. nuo reakcijos laiko pabaigos.", total: "Neturi viršyti 5 val.", service: "24 val. per parą, 7 dienas per savaitę (24/7).", totalHours: 5 },
  II: { name: "II lygis (Kritinė klaida)", description: "Sistema ar esminės jos dalys yra visiškai nepasiekiamos. Visiškai sutrikęs automatinis duomenų surinkimas (realiuoju laiku) iš Stotelių.", response: "Neturi viršyti 2 val. nuo pranešimo išsiuntimo ar užregistravimo momento.", fix: "Neturi viršyti 6 val. nuo reakcijos laiko pabaigos.", total: "Neturi viršyti 8 val.", service: "24 val. per parą, 7 dienas per savaitę (24/7).", totalHours: 8 },
  III: { name: "III lygis (Tipinė klaida)", description: "Sutrikusios sistemos funkcijos (pavyzdžiui: rankinis duomenų įvedimas; duomenų filtravimas; statistinė, grafinė ir koreliacinė duomenų analizė; ataskaitų generavimas; monitoringo rezultatų atvaizdavimas žemėlapyje), tačiau sistema pasiekiama ir automatinis duomenų surinkimas veikia.", response: "Neturi viršyti 4 val. nuo pranešimo išsiuntimo ar užregistravimo momento.", fix: "Neturi viršyti 24 val. nuo reakcijos laiko pabaigos.", total: "Neturi viršyti 28 val.", service: "Darbo dienomis, nuo 8:00 iki 17:00 val.", totalHours: 28 },
  IV: { name: "IV lygis (Netipinė klaida)", description: "Vizualiniai dizaino, naudotojo sąsajos neatitikimai, tekstinės klaidos ar kiti Perkančiosios organizacijos nustatyti trūkumai, neturintys jokios įtakos sistemos funkcionalumui ar duomenų apdorojimui.", response: "Neturi viršyti 24 val. nuo pranešimo išsiuntimo ar užregistravimo momento.", fix: "Neturi viršyti 72 val. nuo reakcijos laiko pabaigos.", total: "Neturi viršyti 96 val.", service: "Darbo dienomis, nuo 8:00 iki 17:00 val.", totalHours: 96 }
});

function readRaw() { try { const parsed = JSON.parse(localStorage.getItem(SLA_STORAGE_KEY) || "[]"); return Array.isArray(parsed) ? parsed : []; } catch (error) { return []; } }
function writeRaw(items) { localStorage.setItem(SLA_STORAGE_KEY, JSON.stringify(items)); return items; }

export function listTickets() { return readRaw(); }
export function ensureTickets() {
  const current = readRaw();
  if (current.length) return current;
  const seed = [
    ["SLA-001", "I", "Saugumo incidento tyrimas", "2026-10-01T06:00:00.000Z", "KA-01"],
    ["SLA-002", "II", "Automatinio srauto nutrūkimas", "2026-10-01T03:00:00.000Z", "KA-07"],
    ["SLA-003", "III", "Rankinio įrašo korekcija", "2026-09-30T07:00:00.000Z", "KA-03"],
    ["SLA-004", "III", "Ataskaitos filtro neatitikimas", "2026-10-01T08:30:00.000Z", "Portalas"],
    ["SLA-005", "IV", "Žymos teksto klaida", "2026-09-30T10:00:00.000Z", "Bendras vaizdas"],
    ["SLA-006", "IV", "Žemėlapio legendos patikslinimas", "2026-10-01T11:00:00.000Z", "Žemėlapis"]
  ].map(([id, level, description, createdAt, target], index) => ({ id, level, description, target, createdAt, dueAt: new Date(new Date(createdAt).getTime() + SLA_LEVELS[level].totalHours * 3600000).toISOString(), status: index === 5 ? "Išspręstas" : index === 4 ? "Tiriamas" : "Naujas" }));
  return writeRaw(seed);
}
export function saveTicket(ticket) { const tickets = readRaw(); const index = tickets.findIndex((item) => item.id === ticket.id); if (index >= 0) tickets[index] = { ...tickets[index], ...ticket }; else tickets.unshift(ticket); return writeRaw(tickets); }
export function updateTicket(id, patch) { const ticket = readRaw().find((item) => item.id === id); return ticket ? saveTicket({ ...ticket, ...patch }) : []; }
export function demoNow() { return new Date(DEMO_NOW); }
