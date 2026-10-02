export const LT_DATE = new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeZone: "Europe/Vilnius" });
export const LT_DATE_TIME = new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vilnius" });

export function formatDate(value) {
  return value ? LT_DATE.format(new Date(value)) : "Nėra duomenų";
}

export function formatDateTime(value) {
  return value ? LT_DATE_TIME.format(new Date(value)) : "Nėra duomenų";
}

export function formatNumber(value, precision = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "–";
  return Number(value).toLocaleString("lt-LT", { maximumFractionDigits: precision, minimumFractionDigits: precision });
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

export function rangeForPeriod(period, demoNow) {
  const days = { "30d": 30, "90d": 90, "365d": 365, "730d": 730, all: 730 }[period] ?? 90;
  const to = new Date(demoNow);
  return { from: new Date(to.getTime() - days * 86400000), to };
}

export function selectedValues(select) {
  return [...(select?.selectedOptions || [])].map((option) => option.value);
}

export function setOptions(select, items, { value = (item) => item.id, label = (item) => item.name, selected = [] } = {}) {
  if (!select) return;
  select.innerHTML = items.map((item) => `<option value="${escapeHtml(value(item))}"${selected.includes(value(item)) ? " selected" : ""}>${escapeHtml(label(item))}</option>`).join("");
}

export function destroyChart(chart) {
  if (chart && typeof chart.destroy === "function") chart.destroy();
  return null;
}
