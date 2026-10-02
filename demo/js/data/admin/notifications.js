export const NOTIFICATIONS_STORAGE_KEY = "kms_amis_admin_notifications_v1";
export const PORTAL_BANNER_KEY = "kms_amis_portal_banner";
export const PORTAL_BANNER_DISMISSED_KEY = "kms_amis_portal_banner_dismissed";

export const NOTIFICATION_TYPES = [
  ["gap", "Duomenų spraga"],
  ["invalid", "NEVALIDUS įrašas"],
  ["exceedance", "Normos viršijimas"],
  ["offline", "Neprisijungusi stotelė"]
];

const DEFAULT_STATE = {
  gapRules: ["30 min", "1 h", "1 d", "7 d", "1 mėn", "12 mėn"].map((duration, index) => ({ id: `gap-${index}`, duration, enabled: index < 4, site: index % 2 ? "Visos stotelės" : "KA-07", parameter: index % 2 ? "Visi parametrai" : "KD 10" })),
  channels: { email: true, group: true, banner: false },
  modes: { gap: "approve", invalid: "approve", exceedance: "auto", offline: "auto" },
  templates: {
    gap: { subject: "KMS AMIS · duomenų spraga ties {stotele}", body: "Stotelėje {stotele} negauti parametro {parametras} duomenys nuo {nuo} iki {iki}." },
    invalid: { subject: "KMS AMIS · NEVALIDUS įrašas", body: "Įrašas ties {stotele} pažymėtas NEVALIDUS: {parametras}, laikotarpis {nuo}–{iki}." },
    exceedance: { subject: "KMS AMIS · normos viršijimas", body: "Ties {stotele} nustatytas parametro {parametras} viršijimas nuo {nuo} iki {iki}." },
    offline: { subject: "KMS AMIS · stotelė neprisijungusi", body: "Stotelė {stotele} neprisijungusi nuo {nuo}." }
  },
  pending: [{ id: "PN-2026-001", type: "offline", target: "KA-07 · Melnragė", createdAt: "2026-10-01T06:40:00.000Z" }]
};

function cloneDefault() { return JSON.parse(JSON.stringify(DEFAULT_STATE)); }
export function readNotificationState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(NOTIFICATIONS_STORAGE_KEY) || "null");
    return parsed ? { ...cloneDefault(), ...parsed, templates: { ...cloneDefault().templates, ...(parsed.templates || {}) } } : cloneDefault();
  } catch (error) { return cloneDefault(); }
}
export function writeNotificationState(state) { localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(state)); return state; }
export function setPortalBanner(text) {
  const banner = { id: `banner-${Date.now()}`, text: String(text || "").trim(), publishedAt: new Date().toISOString() };
  localStorage.setItem(PORTAL_BANNER_KEY, JSON.stringify(banner));
  localStorage.removeItem(PORTAL_BANNER_DISMISSED_KEY);
  return banner;
}
export function getPortalBanner() {
  try { return JSON.parse(localStorage.getItem(PORTAL_BANNER_KEY) || "null"); } catch (error) { return null; }
}
export function clearPortalBanner() { localStorage.removeItem(PORTAL_BANNER_KEY); localStorage.removeItem(PORTAL_BANNER_DISMISSED_KEY); }
