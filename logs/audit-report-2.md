# KMS AMIS demo — final re-audit

Date: 2026-10-01 · Mode: measured technical re-audit; no demo fixes applied · Scope: `demo/` — 14 public routes and 10 admin routes including login.

Method: Python Playwright with headless Chromium and UTF-8-wrapped stdout. The pass covered all routes at 1440×900 and 390×844, authenticated admin navigation, computed DOM/accessibility assertions, keyboard interaction, 150% CSS/browser-zoom-equivalent checks, live Chart.js state, computed CSS colors and contrast, and an HTTP request for every internal `href`/`src` discovered in the rendered pages. Static checks were used only for the requested cache limits, marker lifecycle, imports/call sites, literals, and metadata counts.

## Implementation integrity verdict

**CONDITIONAL PASS — the demo is substantially stronger and stable at runtime, but it is not release-ready at 390px and one public analysis path is functionally empty.**

The implementation remains coherent and purpose-built: the municipal/maritime visual language is consistent, the public portal has no horizontal overflow, the five chart modules share one working theme, the public-to-admin subscription contract now works, and every internal rendered reference resolves. No generic template signature was found.

Two material defects prevent an unconditional pass:

1. `oro.html#laboratoriniai` selects the intended tab, but the laboratory panel receives **0 site options**, stays at “Pasirinkite bent vieną monitoringo tašką”, and instantiates **0 of its 3 charts**. The problem is the laboratory site-support filter, not the shared Chart.js configuration.
2. Eight of nine post-login admin pages expand the document to **774–897px** at a 390px viewport because table/grid min-content escapes its intended scroll wrapper.

There were **0 console errors, 0 page errors, and 0 failed internal references** in the complete sweep.

## Audit health score

| # | Dimension | Score | Key finding |
|---|-----------|:-----:|-------------|
| 1 | Accessibility | 3/4 | Names, contrast, tabs, keyboard and focus now pass; the manual-entry result message still is not announced |
| 2 | Performance | 4/4 | Cache/log caps, deferred CDN scripts and Leaflet marker diffing are all present and exercised without runtime failure |
| 3 | Responsive design | 2/4 | All 14 public routes fit 390px, but 8 authenticated admin routes overflow to 774–897px and the mobile dropdown overlaps the header |
| 4 | Theming | 3/4 | The five chart modules share the token-matched theme; 17 real raw color literals remain in analysis/Leaflet paths |
| 5 | Implementation integrity | 3/4 | Runtime and cross-module contracts are stable, but the laboratory-air analysis path is empty |
| **Total** | | **15/20** | **Good (address weak dimensions)** |

This is a **+3 point improvement** from 12/20. The score is not higher because the admin mobile failure is broad and the laboratory-air tab cannot perform its stated job.

## Executive summary

- **Audit Health Score: 15/20 — Good.**
- Current issues: **0 P0, 3 P1, 4 P2, 1 P3**.
- Original P1 disposition: **10 fixed, 1 partially fixed, 0 still open**.
- Original P2 disposition: **4 fixed, 3 partially fixed, 0 still open**.
- Runtime sweep: **24 routes**, **0 console/page errors**, **44 unique internal rendered references**, **0 failed fetches**.
- Strongest improvements: generated-control names, live regions on the originally cited results, tab semantics/keyboard behavior, step focus, contrast, public mobile reflow, cache bounds, CDN defer, marker diffing, shared chart styling, deep-link tab activation, and subscription status normalization.
- Highest-priority remaining work: restore laboratory-air station eligibility; contain admin tables/grids at 390px; announce the manual-entry result; remove the fixed mobile-dropdown top offset.

## Verification highlights

### Runtime and functional paths

- Login passed with `administratorius` / `admin`; the displayed `#totp-code` was accepted, focus moved to `#totp-input`, and the flow landed on `pages/admin/index.html`.
- A newly completed public subscription stored `status: "active"`; the admin table rendered it as **“Patvirtinta”**, and the dashboard subscriber KPI became **1**. The shared normalizer is working.
- Home rendered **42 / “Vidutinė oro kokybė”**. The footer admin link resolved to `pages/admin/index.html` and returned a successful response.
- Both deep links selected the intended tabs: `oro.html#laboratoriniai` → `tab-laboratory-air`; `gyvoji_gamta.html#pauksciai` → `pauksciai`, with the panel labelled by that tab.
- The laboratory deep link nevertheless exposed a separate functional failure: `#lab-sites` had 0 options and 0 selected options, and all three visible laboratory canvases lacked Chart instances.

### Accessibility

- Computed-name sweep found **0 unnamed rendered form controls** across all public and authenticated admin routes. Hidden/inert native multiselect mirrors were correctly excluded from the accessibility tree.
- Oro and gyvoji gamta tabs had `role=tab`, `aria-selected`, `aria-controls`, roving `tabindex`, labelled `role=tabpanel`, and working Arrow Left/Right, Home and End behavior.
- From the vanduo multiselect’s “Valyti” action, one Tab moved to a native checkbox; Space changed it from checked to unchecked and synchronized the matching hidden native `<option>` to `selected=false`.
- Subscription focus moved to the revealed `confirm`, `verify`, and `done` panels. Login focus moved into the TOTP step.
- The originally cited public result regions and admin feed use `role=status`; login errors use `role=alert`. The remaining exception is `#manual-message` on the admin data-entry page.

### Contrast

Computed from live custom properties and computed element colors:

| Pair | Ratio |
|------|------:|
| `--ink-500` `#5b7383` on `--surface` | 4.97:1 |
| `--ink-500` on `--surface-muted` | 4.55:1 |
| Public status chips | 4.55:1–10.16:1 |
| Admin status/protocol chips | 4.79:1–10.07:1 |
| Footer link on `--sea-950` | 12.75:1 |
| Footer hover on `--sea-950` | 14.49:1 |

All measured normal-text pairs meet the 4.5:1 WCAG AA threshold. The closest pair is the poor-status chip at 4.55:1.

### Responsive and regression checks

- Every public route, including both policy pages, measured `scrollWidth = clientWidth = 390px`.
- Admin login and nustatymai also measured 390px. The other admin routes measured: dashboard 774px, prenumeratos 774px, pranesimai 774px, SLA 897px, nevalidus 774px, auditas 774px, duomenys 774px, patvirtinimas 774px.
- On the dashboard, `.admin-main` was 362px wide but its KPI/grid surface expanded to 760px; on SLA, the surface expanded to 883px. The 720px table minimum is enlarging the grid item instead of remaining inside a 362px horizontal scroll container.
- Footer links, top-level navigation, small buttons, and clickable switch labels measured at least 40px high. Switch glyphs remain 35×20px, but each is wrapped by an 80×40px clickable label.
- At 150% zoom, all home map-preview text/link rectangles remained within the preview. Decorative pseudo-elements still extend inside the intentionally clipped map artwork; user content did not clip.
- Vanduo had 5/5 multiselect rows and oro’s active panel had 15/15 rows with no horizontal or text overflow at 150% zoom.
- Monitoring dropdown contained exactly **6 links**. `aria-expanded` changed false→true, Escape returned it to false and restored focus to the summary, and outside click closed it. However, at 390px the menu top was fixed at 107px while the trigger occupied 88.3–134.3px and the header ended at 151.3px, so the menu overlaps both.
- Home’s two bottom columns ended at the same y-coordinate (1203px). The report chart had no y-axis title, and its explanation remained in prose.

### Performance and theming

- `document.fonts` was present and reached `status="loaded"`; chart routes resolved the configured `"Plus Jakarta Sans", Arial, sans-serif` family.
- All **8/8** external Chart.js/Leaflet script tags carry `defer`.
- Query caches are capped at **40**; the erase-event log is capped at **50**.
- `map.js` retains markers in `markersBySite`, updates existing markers with `setLatLng`, and removes only stale layers.
- Exactly **5** `new window.Chart(...)` call sites exist, one in each chart module. All five import `demo/js/charts/defaults.js`. After parameter/year/tab changes, active canvases on oro/triukšmas, dirvožemis/vanduo, gyvoji gamta, želdynai and ataskaitos instantiated successfully with the same font, `#5b7383` ticks, `#d6e2e6` grids and `#0f2830` tooltip background.
- Outside `charts/defaults.js`, the chart/Leaflet paths still contain **17 real raw hex color occurrences (12 distinct values)**: 2 threshold highlights in `analysis.js` and 15 Leaflet/status/measurement colors in `map.js`. The `&#039;` entity in the escape helper was excluded from this color count.
- The light-only theme is a documented product decision and is **not penalized**.

## Findings by severity

### P1 (3)

1. **Laboratory-air analysis has no eligible sites or rendered charts**
   - **Location:** `demo/js/pages/analysis.js:10,70-74,112`; `demo/pages/oro.html:48-50`
   - **Category:** Implementation integrity
   - **Measured evidence:** Direct navigation to `oro.html#laboratoriniai` selected the correct tab and panel, but `#lab-sites` contained 0 options/0 selections, the live status requested a site, and all 3 panel canvases had no `_kmsChart` instance.
   - **Impact:** The public laboratory monitoring path cannot display its promised data, statistics, comparisons or charts even though the tab and deep link appear successful.
   - **Recommendation:** Define laboratory-air station eligibility explicitly (or map laboratory parameters to the applicable station set) and exercise the direct deep-link path with at least one real option and rendered chart.
   - **Suggested command:** `/impeccable harden`

2. **Eight authenticated admin pages overflow the 390px viewport**
   - **Location:** `demo/css/sections.css:199-205,212-214,282-283`
   - **Category:** Responsive design
   - **Measured evidence:** Eight routes produced 774–897px document widths at a 390px viewport. Dashboard `.admin-main` was 362px but grid/surface content grew to 760px; SLA grew to 883px. Only login and nustatymai remained at 390px.
   - **Impact:** Operators must pan the whole document horizontally; headers, controls and table context move off-screen. This is not the permitted “wide table scrolls inside its own region” behavior.
   - **WCAG/Standard:** WCAG 2.2 SC 1.4.10 Reflow.
   - **Recommendation:** Give every admin grid/surface item `min-width: 0`, ensure table wrappers size to the available column before applying table `min-width`, and re-run all authenticated routes at 390px.
   - **Suggested command:** `/impeccable adapt`

3. **Manual-entry result is not exposed as a live status message**
   - **Location:** `demo/pages/admin/duomenys.html:6`; updated by `demo/js/pages/admin/duomenys.js:51`
   - **Category:** Accessibility
   - **Measured evidence:** `#manual-message` is the only clearly named action-result element in the audited admin forms with neither `role=status`/`role=alert` nor `aria-live`; the adjacent backfill message does have `role=status`.
   - **Impact:** A screen-reader user can submit a manual record without hearing whether it succeeded or failed.
   - **WCAG/Standard:** WCAG 2.2 SC 4.1.3 Status Messages.
   - **Recommendation:** Make the message a persistent polite status region, using alert semantics only for urgent validation failures.
   - **Suggested command:** `/impeccable harden`

### P2 (4)

1. **Mobile dropdown still uses a colliding fixed top offset**
   - **Location:** `demo/css/theme.css:479`
   - **Category:** Responsive design
   - **Measured evidence:** At 390px, the fixed `top:107px` menu began 27.3px before the trigger ended and 44.3px before the header ended. Toggle state, Escape and outside-close all passed.
   - **Impact:** The opened menu obscures part of its own navigation row/header, making the otherwise-correct interaction feel broken.
   - **Recommendation:** Anchor the menu below the measured header/nav row rather than to a fixed viewport offset.
   - **Suggested command:** `/impeccable adapt`

2. **Three procurement clause references remain in public copy**
   - **Location:** `demo/pages/oro.html:30,43`; `demo/pages/prenumerata.html:4`
   - **Category:** Implementation integrity / UX writing
   - **Measured evidence:** Visible body copy still includes `3.6.1`, `3.6.3.1` and `3.7.4`. Clause strings were removed from kickers, but not from the public UI as a whole.
   - **Impact:** Evaluator-only procurement mapping leaks into resident-facing content and weakens the portal’s finished-product presentation.
   - **Recommendation:** Move the remaining references to evaluator documentation or non-visible acceptance mapping.
   - **Suggested command:** `/impeccable clarify`

3. **Leaflet/status colors still bypass the shared token layer**
   - **Location:** `demo/js/pages/analysis.js:135`; `demo/js/pages/map.js:7,95,168,224,229,231`
   - **Category:** Theming
   - **Measured evidence:** 17 real raw hex occurrences remain outside `charts/defaults.js`; all five Chart modules otherwise use the shared defaults successfully.
   - **Impact:** Palette changes can leave the map, exceedance highlights and CSS status chips visually inconsistent even though they represent the same states.
   - **Recommendation:** Export a shared JS palette derived from the CSS semantic tokens and consume it in both analysis and Leaflet styling.
   - **Suggested command:** `/impeccable normalize`

4. **Admin metadata remains absent**
   - **Location:** all 10 files in `demo/pages/admin/`
   - **Category:** Implementation integrity
   - **Measured evidence:** 0/10 admin HTML documents contain a meta description. Policy/standard navigation link sets are now synchronized, and the topbar itself stayed within 390px; this metadata part of the original chrome issue remains.
   - **Impact:** Bookmarks, previews and document-level completeness are weaker, especially for the login and major admin sections.
   - **Recommendation:** Add concise, route-specific descriptions when shared head/chrome generation is consolidated.
   - **Suggested command:** `/impeccable normalize`

### P3 (1)

1. **Minor semantic residue**
   - **Location:** `demo/pages/vadovas.html:4`; `demo/js/pages/analysis.js:192`
   - **Category:** Accessibility / polish
   - **Evidence:** The guide still moves from its H1 directly to four H3 step headings before its later H2, and the oro setup redundantly puts `aria-controls` on each panel pointing to itself. Neither blocked the measured tab pattern or navigation.
   - **Recommendation:** Promote or group the guide step headings under an H2 and remove the panel self-reference.
   - **Suggested command:** `/impeccable polish`

## Original P1 regression matrix

| # | Original finding | Status | Measured evidence |
|---|------------------|--------|-------------------|
| 1 | Wrong AQI headline value | **FIXED** | Home rendered `42`, `INDEKSAS`, and “Vidutinė oro kokybė” together |
| 2 | Broken admin footer link | **FIXED** | Home footer resolved to `/pages/admin/index.html`; internal fetch sweep returned no failure |
| 3 | Subscription status enum mismatch | **FIXED** | Public record stored `active`; admin rendered “Patvirtinta” and counted it in KPI = 1 |
| 4 | Generated controls lack accessible names | **FIXED** | 0 unnamed rendered controls across all 24 routes, including generated admin and multiselect controls |
| 5 | Dynamic results not announced | **FIXED** | The originally cited public result regions and admin feed now expose status semantics; the separate manual-entry exception is logged as a new P1 |
| 6 | Login errors not announced | **FIXED** | Credentials, password and TOTP error containers all have `role=alert` |
| 7 | Incomplete tab pattern | **FIXED** | Both tab systems passed structure plus Arrow/Home/End interaction and roving tabindex assertions |
| 8 | Focus stranded on hidden panels | **FIXED** | Subscription focus moved to confirm/verify/done; login focus moved to the TOTP input |
| 9 | Touch targets under 40px | **FIXED** | Footer links 40px, top nav 46px, small buttons 40px, clickable switch labels 80×40px |
| 10 | Failing contrast | **FIXED** | All requested pairs passed; minimum measured ratio was 4.55:1 |
| 11 | Mobile breakage and clipping | **PARTIALLY FIXED** | All public routes fit 390px, map text survived 150% and desktop admin no longer overflowed; 8 authenticated admin routes now overflow 774–897px at 390px |

## Original P2 regression matrix

| # | Original finding | Status | Measured evidence |
|---|------------------|--------|-------------------|
| 1 | Spec clause tags in user-visible kickers | **PARTIALLY FIXED** | Kicker prefixes are gone, but 3 clause references remain in visible oro/prenumerata body copy |
| 2 | “KD2,5” spacing | **FIXED** | Catalog and live oro/map status render “KD 2,5”; no `KD2,5` occurrence remains |
| 3 | Unbounded storage growth | **FIXED** | Query caches use limit 40; erase-event history slices to the last 50 records |
| 4 | Synchronous CDN scripts | **FIXED** | 8/8 Chart.js/Leaflet CDN scripts carry `defer` |
| 5 | Leaflet full marker rebuilds | **FIXED** | Existing entries are retained in `markersBySite`, moved with `setLatLng`, and stale entries alone are removed |
| 6 | Colors bypass tokens | **PARTIALLY FIXED** | All five chart modules import the shared defaults; 17 real analysis/Leaflet hex occurrences remain |
| 7 | Shared chrome drift | **PARTIALLY FIXED** | Navigation sets are synchronized, the dropdown has exactly 6 monitoring links, and close/state behavior passes; `top:107px` still collides and 0/10 admin pages have meta descriptions |

## Patterns and systemic issues

1. **Responsive containment is incomplete inside admin grids.** Horizontal table wrappers exist, but their parent grid/surface items retain auto minimum sizing, so table min-content enlarges the document instead of scrolling locally.
2. **Status-message discipline is almost systematic, not fully systematic.** Most action results now use `role=status`; `#manual-message` is the lone clear exception found by the computed sweep.
3. **The token boundary now ends at Leaflet rather than at all JavaScript.** Chart configuration has been centralized successfully; map/status and threshold colors are the remaining parallel palette.
4. **Copied document heads still drift.** Public navigation is synchronized, but all admin documents lack the same basic description metadata.

## Positive findings

- Complete runtime sweep stayed at **0 console errors and 0 page errors** on desktop and mobile.
- All **44** rendered internal `href`/`src` targets returned successful HTTP responses.
- Public reflow is strong: all 14 routes fit exactly within 390px, including map, reports, policies and all analysis pages.
- The custom multiselect preserves a hidden native source of truth while presenting labelled, keyboard-operable native checkboxes; Space toggling synchronized correctly.
- Both tab systems now match the expected ARIA/keyboard model, and hash activation updates selection and panel labelling.
- Contrast remediation is complete for every requested token/pair, including hover states.
- Subscription status is normalized at the public/admin boundary rather than patched separately in each view.
- Query caches and deletion history are bounded; CDN scripts are deferred; Leaflet marker reuse avoids complete rebuilds.
- The shared Chart.js defaults are used by all five call sites and survived parameter/year/tab changes without configuration errors.
- Batch B layout work held: home bottom columns align, chart prose replaced the oversized report-axis title, multiselect text wraps at 150%, and the public section spacing produced no overflow regression.
- The light-only theme is explicitly documented and was not treated as a defect.

## Recommended actions

1. **[P1] `/impeccable harden`** — restore laboratory-air station eligibility and add live status semantics to the manual-entry result.
2. **[P1] `/impeccable adapt`** — contain every admin table/grid at 390px and replace the fixed dropdown top offset with header-relative placement.
3. **[P2] `/impeccable normalize`** — finish the shared JS palette and consolidate admin head/chrome metadata.
4. **[P2] `/impeccable clarify`** — remove the three remaining procurement clause references from public copy.
5. **[P3] `/impeccable polish`** — clean the guide heading sequence and redundant panel ARIA attribute, then re-run the full audit.

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/impeccable audit` after fixes to confirm the score and regression matrix.
