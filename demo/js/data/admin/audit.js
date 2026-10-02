export const AUDIT_STORAGE_KEY = "kms_amis_admin_audit_v1";

const SEED_ENTRIES = [
  { timestamp: "2026-10-01T09:41:00.000Z", role: "administratorius", action: "Peržiūrėta KA-07 stotelės būsena", target: "KA-07", result: "KA-07 pažymėta nepasiekiama" },
  { timestamp: "2026-10-01T09:18:00.000Z", role: "specialistas", action: "Patikrinta duomenų spraga", target: "KA-07 · 2025-02-10–2025-02-13", result: "Atvira" },
  { timestamp: "2026-10-01T08:57:00.000Z", role: "administratorius", action: "Atnaujintas pranešimo šablonas", target: "NEVALIDUS", result: "Išsaugota" },
  { timestamp: "2026-09-30T16:32:00.000Z", role: "specialistas", action: "Peržiūrėtas perdavimo paketas", target: "BF-2025-11-25-A", result: "Priimtas" }
];

function readRaw() {
  try {
    const parsed = JSON.parse(localStorage.getItem(AUDIT_STORAGE_KEY) || "null");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeRaw(items) { localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(items)); return items; }

export function listAudit() {
  const current = readRaw();
  if (current.length) return current;
  return writeRaw(SEED_ENTRIES.slice());
}

export function appendAudit({ role = "sistema", action, target = "", result = "Atlikta", timestamp = new Date().toISOString() }) {
  const entry = { id: `AUD-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, timestamp, role, action, target, result };
  writeRaw([entry, ...listAudit()].slice(0, 300));
  return entry;
}

export function clearAudit() { localStorage.removeItem(AUDIT_STORAGE_KEY); }
