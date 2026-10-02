# Task: shared chart polish + ataskaitos chart fix + home whitespace balance + page-wide symmetry sweep

Working directory: this repo. Static demo under `demo/` (plain HTML/CSS/JS ES modules, no build step) served at http://localhost:8000 (server already running). Do NOT create a git commit. Your final message is the deliverable: a short markdown summary of what changed, with measured results.

This is batch B of a two-batch final pass. Batch A (deep links, header dropdown, multi-select component in `demo/js/ui/multiselect.js` + `.multiselect` CSS) is DONE — do not modify multiselect.js, the header nav markup, or the dropdown logic. Do not touch page padding globals that batch work already set. Lithuanian copy for anything new; keep correct Lithuanian grammar. Never add AI attribution (no "Co-Authored-By", no "Generated with...") anywhere, including comments.

## 1. Shared Chart.js theme defaults (professional, consistent look)

Today every page has its own chart config; tick colors are default grey, fonts are default sans, axis titles are default size. Create `demo/js/charts/defaults.js` exporting:

- `CHART_PALETTE` — the brand palette already used across pages: `#0b2f8b` (sea-800 primary), then `#4768c7`, `#197067`, `#d19a00`, `#7c4f9e`, `#a13e00`, `#537083`. Export it so pages stop hard-coding their own partial copies (wildlife.js currently hardcodes two; greenery.js hardcodes four — import from here and delete the local copies).
- `chartDefaults(overrides = {})` — a deep-merged default options object replacing the per-page `chartDefaults()` in `demo/js/pages/analysis.js` (and `options()` in periodic.js if that is the same thing — check, they may be duplicates). Defaults:
  - `plugins.legend.labels`: `usePointStyle: true, boxWidth: 10, boxHeight: 10, padding: 14, color: var ink-600 equivalent (#334e5c — read the CSS custom properties in demo/css/theme.css and use matching hex), font: { family: PLUS_JAKARTA_SANS_STACK, size: 12, weight: 500 }`. Keep `legend.pointStyle` on each dataset implicit via usePointStyle.
  - `plugins.tooltip`: polished — `backgroundColor: "#0f2830"(ink-900-ish from tokens), padding: 10, cornerRadius: 8, titleFont: { size: 12, weight: 600 }, bodyFont: { size: 12 }, titleColor/bodyColor: near-white, boxPadding: 6`, keep `mode:"index", intersect:false` and `interaction` equivalents.
  - `scales` common: tick `color` = ink-500 equivalent (#5b7383), `font: { family, size: 11 }`, grid `color` = the --line value from theme.css (light grey, e.g. #d7e2e0), `drawBorder`/border display false, y grid `borderDash` plain (no dash), ticks `maxTicksLimit` 7 on y, `padding: 6`.
  - axis titles (when a page's scales define `title`): `color` = ink-600, `font: { family, size: 11, weight: 600 }`, `padding` 6.
  - `Chart.defaults.font.family` — simplest robust approach: on import, if `window.Chart` exists, set global defaults (font family + tick colors) once so even legacy configs render right. Read the actual font stack/theme tokens from `:root` in demo/css/theme.css — do not guess names; match the site's body font exactly.
- Apply it in all five chart page modules: `demo/js/pages/analysis.js` (three charts), `demo/js/pages/periodic.js` (bar + line), `demo/js/pages/wildlife.js`, `demo/js/pages/greenery.js`, `demo/js/pages/reports.js`. Keep each page adding only its page-specific scales (beginAtZero, titles, per-chart limits) on top of the shared defaults.
- Data-dataset colors: line/bar datasets should use CHART_PALETTE order with borders matching fills; keep existing semantic colors where a page intentionally maps meaning to color (e.g. wildlife's #0b2f8b/#197067 axis pair is fine — but then use the palette values by import).

## 2. Ataskaitos summary chart (demo/js/pages/reports.js line ~21 — the flagged overlap)

The y-axis title „Katalogo vienetais; skirtingų parametrų masteliai nėra tiesiogiai lyginami" renders as a huge rotated vertical string that collides with tick labels and eats the canvas. Fix:
- Delete the long y-axis title from the scales config. The caveat belongs to prose, not an axis: put it as a small `.muted` note directly under the chart canvas (new line in the DOM next to #report-chart's container; keep the existing sentence text so the disclaimer is not lost).
- Replace the y-axis title with nothing (values + unit are already labelled in the section tables above the chart).
- X labels: section names currently `maxRotation: 45, minRotation: 25` and get clipped. Use `ticks: { autoSkip: false, maxRotation: 45, minRotation: 0 }` plus `layout: { padding: { bottom: 8 } }`... then VERIFY at 1440: if two-line labels overlap, instead shorten tick callback (Abbreviate long section names via a small dictionary, e.g. „Automatinis aplinkos oras" → „Autom. oras") — do NOT shorten the full section names elsewhere. At 390 the same logic must hold (canvas responsive).
- Ensure the chart container's fixed height (find it in CSS) leaves room for the rotated labels — bump container height a touch only if labels clip.

## 3. Home page hero + grid-home whitespace („odd amount of white space and empty areas")

`demo/index.html` hero + `.grid-home` (theme.css ~301: 2 columns, weather panel spans 2 rows in col 1, AQI + map-preview stack in col 2). Measured problem: the weather card ends far above the right column, leaving dead space inside the grid cell.
- Measure the three panels' rendered bottom edges at 1440 and 390 (evaluate bounding rects).
- Restructure so bottoms align within ~16px at 1440: cleanest is to put the map-preview under the weather card in the left column and let the AQI panel own the right column — i.e. drop the `grid-row: span 2` rule and use an explicit 2-col layout where each column's items fill (`grid-auto-rows: 1fr` or flex column stretch). The map-preview visually works well as a slim wide card; if full-stretch makes it look stretched, give the left column a flex column with the map-preview flex-taking the leftover, its decorative background absorbs it (it already bleeds pseudoelements).
- Kill the inline style hack on `demo/index.html` line 74 (`style="max-width: 30ch; margin-top: 42px; ..."` on the map-preview paragraph) — move that into a proper CSS class (e.g. `.map-preview .lede` rules in the map-preview CSS block) and set a sane spacing so the paragraph distributes instead of a fixed 42px gap.
- At 390 single column: no new dead spaces introduced.

## 4. Page-wide symmetry sweep

Across all 12 main public routes (index, oro, truksmas, dirvezemis, vanduo, gyvoji_gamta, zeldynai, zemelapis, ataskaitos, prenumerata, vadovas, bendra-info):
- `.monitoring-grid` cards („Duomenų sričių …" grid on index): equal heights within each row; make the `.monitoring-link` cards `display:flex; flex-direction:column; gap` with consistent internal spacing.
- Section rhythm: identical vertical spacing pattern between section blocks on every page (one --space token consistently, no page where two sections nearly touch or giant double gaps exist).
- Spacing immediately before `.site-footer`: same on all pages (the page container bottom padding), no cramped or oversized gap.
- Scan for any remaining overlapping text anywhere at 1440 and 390: for each route, assert `document.documentElement.scrollWidth <= 396` at 390, and spot-check element bounding boxes for overlaps (e.g. status chips vs card headings, stat cards, map controls vs attribution).

## 5. Self-verification (before finishing; python playwright, headless chromium, stdout wrapped `io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")`, raw strings for Windows paths)

At 1440×900 and 390×844, server at http://localhost:8000:
1. All routes with charts (oro, truksmas, vanduo/dirvezemis via periodic module, gyvoji_gamta, zeldynai, ataskaitos, index if any): switch a couple of parameters/tabs on each; 0 console/page errors; screenshots of each chart saved to `logs/fixb-<page>.png`.
2. Ataskaitos: screenshot the summary chart; assert no y-axis title, x labels fully visible (no ellipsis/clipping — read canvas pixel width usage is hard, so verify visually from the screenshot you take and report), and the moved caveat note is present below the chart.
3. Home: measure the three grid-home panel bottoms at 1440; report the max bottom-to-bottom delta (target ≤ 16px, accept ≤ 32px when justified); screenshot `logs/fixb-home.png` (full page) and `logs/fixb-home-390.png`.
4. Multiselect pages (vanduo, oro): confirm the custom component still renders fine (no CSS conflicts from the sweep), count text updates.
5. 390px: scrollWidth ≤ 396 on all 12 routes.
6. Console error total across the sweep: 0.
Report the measured results in your final summary.