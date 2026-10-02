# Task: Fix the 3 P1 + 4 P2 + 1 P3 findings from the final re-audit (last fix round)

Working directory: this repo. Static demo under `demo/` served at http://localhost:8000 (server running). Do NOT create a git commit. Do not modify `demo/js/ui/multiselect.js` or the shared `demo/js/charts/defaults.js` palette/font choices beyond what is listed (item 6 extends tokens INTO a new shared map palette, it does not redesign defaults.js). Lithuanian copy for anything new; keep correct Lithuanian grammar. Never add AI attribution (no "Co-Authored-By", no "Generated with...") anywhere, including comments.

Findings and evidence are in `logs/audit-report-2.md` — read it first. Fix ALL of the following.

## P1-1. Laboratory-air analysis has no eligible sites or rendered charts (most important)
Symptom: `oro.html#laboratoriniai` activates the correct tab/panel, but `#lab-sites` has 0 options/0 selected, the status says „Pasirinkite bent vieną monitoringo tašką", and all 3 laboratory panel canvases have no Chart instance.
Root cause to find in `demo/js/pages/analysis.js` (station/site eligibility filtering around lines 10, 70–74, 112) and how laboratory parameters map to sites in `demo/js/data/` (catalog.js/generator.js/query.js — check what section-id or site-set the laboratory parameters carry vs what the eligibility test expects; oro.html's `#lab-sites` select (lines ~48–50) is populated by the module's district/station logic).
Fix: make the laboratory tab function fully — laboratory parameters must resolve to a real, non-empty point/station set (whatever the data model defines for lab measurements; if the generator already produces lab data for specific points, wire the eligibility to those; if it defines none, add a small lab point set to the existing deterministic generator rather than inventing a new data shape). After the fix: selecting a site on the laboratory panel renders all 3 charts with data, statistics populate, no console errors. Then re-exercise `oro.html#laboratoriniai` end-to-end.

## P1-2. Eight authenticated admin pages overflow at 390px (774–897px)
Measured: dashboard 774, prenumeratos 774, pranesimai 774, SLA 897, nevalidus 774, auditas 774, duomenys 774, patvirtinimas 774. Cause: table/grid min-content enlarges grid items instead of scrolling inside their wrappers (`.admin-main` 362px but surface 760/883px wide). Location hints: `demo/css/sections.css:199-205, 212-214, 282-283`.
Fix: grid/surface items `min-width: 0`; ensure each data-table wrapper (the intended horizontal scroll container) is the thing that scrolls — wrapper max-width:100%, `overflow-x: auto` already exists; add `minmax(0, 1fr)` to admin grid templates where 1fr alone causes auto-min blowout. Target: scrollWidth == 390 on ALL authenticated admin routes at 390px (login and nustatymai already pass — the pattern used there may map elsewhere).

## P1-3. Admin manual-entry result not announced
`demo/pages/admin/duomenys.html` → `#manual-message` (updated by `demo/js/pages/admin/duomenys.js:51`): add persistent polite status semantics (`role="status"`), like the adjacent backfill message already has.

## P2-1. Mobile dropdown colliding fixed top offset
`demo/css/theme.css:479` — the dropdown menu's `top: 107px` overlaps the 390px header (header ends 151.3px; trigger ends 134.3px). Replace the fixed viewport offset with header-relative anchoring (menu top below the measured actual header bottom at every width: e.g. `top: calc(100% + padding)` relative to the header, or position the menu relative to `.header-inner`/`.main-nav details` so it never needs a magic number). Verify at 390 and 1440: menu starts below the header with a small, consistent gap, no overlap.

## P2-2. Three remaining clause references in public copy
`demo/pages/oro.html:30,43` (`3.6.1`, `3.6.3.1`) and `demo/pages/prenumerata.html:4` (`3.7.4`). Remove the clause tags from visible copy while keeping the sentences grammatical Lithuanian. If the mapping matters, it already lives in evaluator materials (`docs/`, README) — do not duplicate it on-screen.

## P2-3. 17 raw hex colors remaining outside defaults.js (2 in analysis.js threshold highlighting, 15 in map.js Leaflet/status styling)
Create a small shared palette export — either inside `demo/js/charts/defaults.js` or a sibling `demo/js/charts/palette.js` (your choice; only ONE new module) — carrying chart palette + map/threshold/status colors as named constants matching the CSS token values. Consume it in `demo/js/pages/analysis.js` and `demo/js/pages/map.js` (marker colors, polyline/AQI band fills, exceedance highlight). Zero behavior change — colors must remain the same hex values, just sourced from one module. Note: `map.js` also colors by status for admin — if those constants live in admin JS too, export and reuse rather than a third copy.

## P2-4. Admin pages lack meta descriptions
Add one concise, route-specific Lithuanian `<meta name="description">` to each of the 10 pages under `demo/pages/admin/` (differential wording per page: dashboard/KPI, prenumeratos, pranešimai, SLA, nevalidūs, auditas, duomenys, nustatymai, patvirtinimas, login — login gets the login page's own wording).

## P3-1. vadovas.html heading skip + analysis.js panel self-reference
`demo/pages/vadovas.html:4`: the four step headings jump H1→H3 before any H2. Restructure so steps sit under a single H2 (give the section a visible H2 only if it fits naturally, else aria/heading levels fix without changing visible copy tone). `demo/js/pages/analysis.js:192`: panels redundantly set `aria-controls` pointing to themselves — remove that self-reference from panels (tabs keep their aria-controls).

## Self-verification (before finishing; python playwright, headless chromium, utf-8 stdout wrapper)
1. `oro.html#laboratoriniai`: lab-sites has ≥1 option and ≥1 selected (or first-site auto-selected), all 3 lab canvases have a `_kmsChart`, statistics render, 0 errors.
2. ALL authenticated admin routes at 390×844: scrollWidth == clientWidth == 390. List each measured value.
3. `#manual-message` has role=status.
4. Menu positioning at 390 and 1440: report trigger bottom and menu top per breakpoint (no overlap).
5. grep the repo's public pages for `3\.6\.|3\.7\.|3\.10\.` visible copy → 0 remaining (README/docs excluded).
6. No raw hex left in analysis.js/map.js map/threshold paths (palette module import instead); charts render identically (spot-screenshot oro time chart before/after values equal colors — you can eyeball the hexes match the originals you moved).
7. Headings sequence on vadovas fixed; panels no longer self-reference aria-controls.
8. Full regression sweep: all 14 public routes + all 10 admin routes (login first) at 1440 AND 390: scrollWidth fit at 390, 0 console/page errors everywhere.
Report all measured results in your final summary.