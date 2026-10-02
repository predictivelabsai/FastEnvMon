# Task: /impeccable adapt — responsive + touch-target fixes

You are working in the repo `C:\Users\Joosep\tenders\klaipeda-environment` (static demo site under `demo/`, served at http://localhost:8000 — the server is already running; use it for checks, do not start another one).

This is a Lithuanian municipal environmental-monitoring demo (public portal + admin backoffice). Read `logs/audit-report.md` first for context (findings #9, #11). Brand: Klaipėda identity — Plus Jakarta Sans, blue/green token palette, sea/shore/land stripe motif. Do NOT redesign: refinement only, preserve layout structure and all Lithuanian copy.

## Fix these, measured from a prior UI audit

1. **390px horizontal overflow** (page scrollWidth > viewport) on:
   - `demo/pages/oro.html`, `demo/pages/gyvoji_gamta.html`, `demo/pages/truksmas.html` — worst case +244px (scrollWidth 634 vs 390). Usual suspects: `analysis-filter-grid` / `periodic-layout` wide filter fields, `stats-grid`, long unbroken strings, elements with fixed widths, chart canvases. Root-cause the culprit elements (inspect with a headless check if helpful — python + playwright is available on this machine), then fix properly in CSS (flex-wrap, minmax, overflow-x on internal wrappers) — do NOT hide overflow on `body`/`main`.
   - `demo/pages/ataskaitos.html` — mild +33px overflow (423).
   Every public page must have `document.documentElement.scrollWidth <= 390` (plus a couple px tolerance) at 390×844.

2. **Touch targets below 40px** on every page:
   - Footer links: rendered ~19.1px tall (`demo/css/theme.css` around lines 135/247/388 — `.footer-links a` and related).
   - Nav sub-links ~34px; small buttons ~38px; admin inline action buttons ~31px; admin switch ~35×20px.
   Raise to ≥40px hit area via padding/min-height/pseudo-element hit areas WITHOUT changing visual size or look of the elements themselves. Visual identity of chips/switches must stay.

3. **Text-scale clipping**: at 150% text zoom the home page `map-preview` panel (`demo/css/theme.css` around line 334, the dotted map preview card) clips its content. Replace any fixed height with a min-height or let the container grow; verify nothing clips at 150% text zoom on `demo/index.html`.

4. **Admin dashboard table clipping**: on `demo/pages/admin/index.html` the „Naujausi auditai" audit-preview table clips horizontally on desktop. Make its wrapper scroll horizontally (`overflow-x: auto` on the table wrapper, min-width content) — same pattern as the other `admin-table` wrappers.

## Rules
- Files only under `demo/` (css/html/js). No docs, no git commits, no AI attribution anywhere.
- Keep zero console errors: nothing you change may introduce a runtime error (charts, Leaflet intact).
- Lithuanian text: never modify copy except where a fix strictly requires it (e.g. a `white-space` style, not wording).

## Deliverable
Print a concise markdown summary at the end: files changed, what was changed, and the measured result of each of the 4 items (overflow widths at 390px before/after if you measured, target sizes, etc.).