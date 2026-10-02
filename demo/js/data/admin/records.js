export const MANUAL_RECORDS_STORAGE_KEY = "kms_amis_admin_manual_records_v1";

function readRaw() {
  try {
    const parsed = JSON.parse(localStorage.getItem(MANUAL_RECORDS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeRaw(items) {
  localStorage.setItem(MANUAL_RECORDS_STORAGE_KEY, JSON.stringify(items));
  return items;
}

export function listManualRecords() { return readRaw(); }
export function saveManualRecord(record) {
  const items = readRaw();
  const index = items.findIndex((item) => item.id === record.id);
  if (index >= 0) items[index] = { ...items[index], ...record };
  else items.push(record);
  writeRaw(items);
  return record;
}
export function updateManualRecord(id, patch) {
  const items = readRaw();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  items[index] = { ...items[index], ...patch, updatedAt: new Date().toISOString() };
  writeRaw(items);
  return items[index];
}
export function deleteManualRecord(id) {
  const items = readRaw();
  const remaining = items.filter((item) => item.id !== id);
  writeRaw(remaining);
  return items.length !== remaining.length;
}

export function ensureDemoInvalidRecords() {
  const current = readRaw();
  const demo = [
    { id: "MR-DEMO-01", parameterId: "as", siteId: "DT-01", timestamp: "2026-09-20T08:00:00.000Z", value: 28.4, status: "NEVALIDUS. Laukiama patvirtinimo", version: 1, source: "Laboratorinis importas", createdAt: "2026-09-20T09:14:00.000Z", editor: "", reason: "", flag: "Viršyta absoliutinė riba" },
    { id: "MR-DEMO-02", parameterId: "nb", siteId: "VT-01", timestamp: "2026-09-22T08:00:00.000Z", value: 8.7, status: "NEVALIDUS. Laukiama patvirtinimo", version: 1, source: "Laboratorinis importas", createdAt: "2026-09-22T10:02:00.000Z", editor: "", reason: "", flag: "Patikros neatitikimas" },
    { id: "MR-DEMO-03", parameterId: "flora-species", siteId: "GS-01", timestamp: "2026-08-18T08:00:00.000Z", value: 214, status: "NEVALIDUS. Laukiama patvirtinimo", version: 1, source: "Biologinis tyrimas", createdAt: "2026-08-18T12:11:00.000Z", editor: "", reason: "", flag: "Už katalogo ribų" },
    { id: "MR-DEMO-04", parameterId: "crown-condition", siteId: "ZG-01", timestamp: "2026-08-12T08:00:00.000Z", value: 11.2, status: "NEVALIDUS. Laukiama patvirtinimo", version: 1, source: "Želdynų apžiūra", createdAt: "2026-08-12T14:40:00.000Z", editor: "", reason: "", flag: "Už katalogo ribų" }
  ];
  let changed = false;
  demo.forEach((record) => {
    if (!current.some((item) => item.id === record.id)) { current.push(record); changed = true; }
  });
  if (changed) writeRaw(current);
  return current;
}
