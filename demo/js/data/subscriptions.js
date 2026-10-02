// Shared public-demo subscription store. Phase 3 admin can import the same API.
export const SUBSCRIPTIONS_STORAGE_KEY = "kms-amis-demo-subscriptions-v1";
export const SUBSCRIPTION_ERASE_EVENTS_KEY = "kms-amis-demo-subscription-erases-v1";
const SUBSCRIPTION_ERASE_EVENT_LIMIT = 50;

// Canonical status enum shared by the public wizard and the admin backoffice.
const STATUS_ALIASES = { "patvirtinta": "active", "active": "active", "laukiama patvirtinimo": "pending", "pending": "pending", "atšaukta": "cancelled", "cancelled": "cancelled" };
const STATUS_LABELS = { active: "Patvirtinta", pending: "Laukiama patvirtinimo", cancelled: "Atšaukta" };

export function normalizeSubscriptionStatus(status) {
  return STATUS_ALIASES[String(status || "").trim().toLowerCase()] || "pending";
}

export function subscriptionStatusLabel(status) {
  return STATUS_LABELS[normalizeSubscriptionStatus(status)] || STATUS_LABELS.pending;
}

function readRaw() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SUBSCRIPTIONS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeRaw(items) {
  localStorage.setItem(SUBSCRIPTIONS_STORAGE_KEY, JSON.stringify(items));
  return items;
}

export function getAllSubscriptions() { return readRaw().map((item) => ({ ...item, status: normalizeSubscriptionStatus(item.status) })); }
export function readSubscriptions() { return getAllSubscriptions(); }

export function saveSubscription(subscription) {
  const items = readRaw();
  const record = { ...subscription, updatedAt: new Date().toISOString() };
  const existingIndex = items.findIndex((item) => item.id === record.id || item.email === record.email);
  if (existingIndex >= 0) items[existingIndex] = { ...items[existingIndex], ...record };
  else items.push(record);
  writeRaw(items);
  return record;
}

export function updateSubscription(id, patch) {
  const items = readRaw();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  items[index] = { ...items[index], ...patch, updatedAt: new Date().toISOString() };
  writeRaw(items);
  return items[index];
}

export function deleteSubscription(idOrEmail) {
  const needle = String(idOrEmail || "").trim().toLowerCase();
  const items = readRaw();
  const remaining = items.filter((item) => String(item.id).toLowerCase() !== needle && String(item.email).toLowerCase() !== needle);
  writeRaw(remaining);
  return items.length - remaining.length;
}

export function clearSubscriptions() {
  writeRaw([]);
}

function readEraseEvents() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SUBSCRIPTION_ERASE_EVENTS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function listPendingSubscriptions() {
  return getAllSubscriptions().filter((item) => normalizeSubscriptionStatus(item.status) === "pending");
}

export function listEraseEvents() { return readEraseEvents(); }

export function eraseSubscriptionData(email) {
  const needle = String(email || "").trim().toLowerCase();
  const items = readRaw();
  const removed = items.filter((item) => String(item.email || "").trim().toLowerCase() === needle);
  const remaining = items.filter((item) => String(item.email || "").trim().toLowerCase() !== needle);
  writeRaw(remaining);
  const event = { id: `BDSR-${Date.now()}`, email: needle, erasedAt: new Date().toISOString(), recordsRemoved: removed.length };
  localStorage.setItem(SUBSCRIPTION_ERASE_EVENTS_KEY, JSON.stringify([...readEraseEvents(), event].slice(-SUBSCRIPTION_ERASE_EVENT_LIMIT)));
  return event;
}
