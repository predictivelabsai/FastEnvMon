# Task: /impeccable optimize — cache caps, script defer, marker diffing

You are working in the repo `C:\Users\Joosep\tenders\klaipeda-environment` (static demo site under `demo/`, served at http://localhost:8000 — server already running, reuse it; do not start another one). Read `logs/audit-report.md` first (P2 items 3–5). These are performance-hygiene fixes with zero behavior change: refine, do not redesign, do not alter data content or visible output.

## Fix these, measured from a prior UI audit

1. **Unbounded client caches**: `demo/js/data/query.js` has `rawCache`, `seriesCache`, `dayAggregateCache` maps that grow without limit during long sessions. Add a simple insertion-order eviction cap (e.g. 40 entries per cache, drop oldest) to each — a tiny shared helper is fine. No visible behavior change.

2. **Unbounded GDPR erase-event log**: `demo/js/data/subscriptions.js` `eraseSubscriptionData()` appends BDSR erase events to localStorage without a cap while the admin feed/audit stores are capped. Cap the erase log at the most recent 50 events (trim on write). Keep the export/CSV and UI behavior identical.

3. **Synchronous CDN scripts**: Chart.js and Leaflet `<script>` tags on roughly 9 public pages are loaded synchronously (end of body but still render/parse-blocking). Add the `defer` attribute to them (the inline init `<script type="module">` follows in document order; deferred classic scripts and module scripts execute in document order, so `window.Chart`/`window.L` must still exist when init runs — if a page's init runs too early for any reason, apply the smallest safe fix to preserve that, and note it in your summary).

4. **Leaflet full marker rebuilds**: `demo/js/data/map.js` (or wherever the map module lives — check `demo/js/`) recreates ALL markers, popups and latest-value lookups on every filter change around lines 107-118 and 212-217. Implement layer diffing: keep a map of markers/keyed layers; on re-render add only new sites, remove stale ones, and update styles/positions/popups of existing ones. Keep the popup content generation logic intact — same data, same visuals, just not rebuilt from scratch.

## Rules
- Behavior and visuals must remain identical; no git commits; no AI attribution.
- Zero console errors is the bar: after your changes, load `index.html`, `zemelapis.html`, `oro.html`, `gyvoji_gamta.html`, `ataskaitos.html` via python + playwright (available on this machine) and confirm no console/page errors and that charts/maps still render. Report the counts (e.g. number of console errors, number of Leaflet tiles / chart canvases found) if easily obtainable.

## Deliverable
Concise markdown summary at the end: caches capped (sizes), erase-log cap, pages where defer was added, diffing approach in the map module, and the verification results.