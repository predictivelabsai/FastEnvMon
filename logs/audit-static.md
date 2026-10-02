# KMS AMIS demo — static technical audit

Date: 2026-10-01  
Scope: demo/index.html, demo/css/*.css, demo/js/**/*.js, demo/pages/*.html, demo/pages/admin/*.html, and demo/js/pages/**  
Mode: read-only audit of the demo source. No demo source file was changed.

## Method and verification

- Inspected all HTML, CSS, and JavaScript files in the requested scope with line-numbered source evidence.
- Checked local links against the demo file tree and verified the root footer 404 through the local server.
- Ran node --check over every JavaScript file; all files passed.
- Calculated WCAG relative luminance contrast ratios from the token values in demo/css/theme.css.
- Checked responsive media queries, table overflow handling, Chart.js lifecycle/configuration, Leaflet redraw paths, storage/cache growth, and script loading.
- No internet sources were used.

## Audit health score

| Dimension | Score | Key finding |
| --- | ---: | --- |
| Accessibility | 1/4 | Multiple P1 gaps: unlabeled generated controls, missing live announcements, incomplete tab semantics, focus loss in multi-step flows, small targets, and five low-contrast token pairs. |
| Performance | 3/4 | Charts are responsive and destroyed correctly; remaining risks are unbounded query/storage caches, synchronous CDN scripts, and full Leaflet marker rebuilds. |
| Responsive design | 3/4 | Media queries and horizontal table scrolling are present; touch targets and the fixed mobile dropdown position remain weak points. |
| Theming | 2/4 | A useful light token system exists, but many CSS/JS colors bypass it and no dark variant exists. |
| Anti-patterns | 4/4 | No material AI-slop signature found; the administrative/card treatment is purposeful and the map preview gradient is contextual rather than decorative UI chrome. |
| **Total** | **13/20** | **Acceptable — significant accessibility and integration work is needed before release.** |

P0 findings: none.  
Issue count: 9 P1, 8 P2, 1 P3/documented opportunity.

## Executive summary

The demo has a solid structural baseline: Lithuanian language metadata is present, public pages use header/nav/main/footer landmarks, skip links and global focus-visible styling exist, static form fields are generally labeled, tables scroll horizontally, charts are responsive and lifecycle-safe, animations use transform/opacity, and the feed/audit/measurement collections have explicit caps.

The release risks are concentrated in accessibility and cross-page integrity:

1. The root page footer points to a nonexistent admin URL.
2. A verified public subscription is stored as active, while the admin dashboard only counts patvirtinta, so the core subscription hand-off displays the wrong state.
3. Generated admin selects and inline inputs have no accessible names.
4. Dynamic analysis/admin data changes are not announced to assistive technology.
5. The custom tab implementations omit tabpanel relationships and keyboard tab behavior.
6. Multi-step login/subscription transitions hide the element that still owns focus.
7. Several controls are explicitly under the requested 40 px touch-target threshold.
8. Five text/status token pairs fail the requested contrast thresholds.

## Detailed findings by severity

### P1 — major / WCAG or broken task

#### A11Y-01 — Contrast failures in actual theme token pairs

- Location: demo/css/theme.css:304, 325, 363, 392, 400, 403-404; token declarations at demo/css/theme.css:20-28 and 30-37.
- What is wrong: computed normal-text contrast is below 4.5:1 for these actual foreground/background pairs:

  | Use | Pair | Ratio | Threshold |
  | --- | --- | ---: | ---: |
  | Weather secondary text | --ink-500 on --surface-muted | 3.39:1 | 4.5:1 |
  | AQI/legend endpoint labels | --ink-500 on --paper | 3.60:1 | 4.5:1 |
  | Map helper text | --ink-500 on --surface-muted | 3.39:1 | 4.5:1 |
  | Popup table headers | --ink-500 on --surface | 3.70:1 | 4.5:1 |
  | Poor status chip | --status-ink on --poor | 3.79:1 | 4.5:1 |
  | No-data status chip | --status-ink on --no-data | 4.48:1 | 4.5:1 |

- Why it matters: small supporting text and status chips are harder to read for low-vision users; the status failures are especially risky because they communicate environmental state.
- One-line fix: darken --ink-500 and/or adjust the status foreground/background pairs until every normal-text pair is at least 4.5:1, then re-run contrast checks.

#### A11Y-02 — Generated form controls lack accessible names

- Location: demo/js/pages/admin/pranesimai.js:10-11; demo/js/pages/admin/sla.js:17; demo/js/pages/admin/nevalidus.js:35.
- What is wrong: dynamically generated selects for gap-rule site/parameter, notification mode, and SLA status have no label or aria-label; the inline invalid-record number input also has no label.
- Why it matters: screen readers expose these as unnamed controls, so users cannot tell what each select/input changes.
- One-line fix: generate a unique id and label for every control, or add aria-label/aria-labelledby tied to the row heading and target.

#### A11Y-03 — Dynamic results and live feed are not announced

- Location: public result/status containers at demo/pages/oro.html:29, 41, 47-49; demo/pages/truksmas.html:4; demo/pages/dirvezemis.html:4; demo/pages/vanduo.html:4; demo/pages/gyvoji_gamta.html:4; demo/pages/zeldynai.html:4; update code at demo/js/pages/analysis.js:118-131, demo/js/pages/periodic.js:45-49, demo/js/pages/wildlife.js:38-43, and demo/js/pages/greenery.js:18-22. Admin live table at demo/pages/admin/index.html:24 and demo/js/pages/admin/index.js:40-42.
- What is wrong: filter-driven status text, summaries, tables, and charts are replaced after interaction, but the result/status regions do not consistently have role=status or aria-live. The admin feed/KPI values update every four seconds without a live region.
- Why it matters: assistive-technology users can change a filter and receive no confirmation that the result changed or how many records were returned.
- One-line fix: add a polite live status summary per result region, update it after each render, and keep the rapidly changing feed at a restrained announcement rate.

#### A11Y-04 — Login validation errors are not programmatically announced

- Location: demo/pages/admin/login.html:15, 21, 26; demo/js/pages/admin/login.js:11, 24-27, 40-48, 51-57.
- What is wrong: credentials, password, and TOTP error paragraphs are only hidden/shown and have no role=status, role=alert, or aria-live.
- Why it matters: a keyboard/screen-reader user can submit invalid credentials and not hear the error that explains how to recover.
- One-line fix: add role=alert to error containers (or a polite live region for non-urgent validation) and associate each error with its form field using aria-describedby.

#### A11Y-05 — Custom tab widgets are incomplete

- Location: air tabs at demo/pages/oro.html:27 and demo/js/pages/analysis.js:176-181; wildlife tabs at demo/pages/gyvoji_gamta.html:4 and demo/js/pages/wildlife.js:48-50.
- What is wrong: buttons expose role=tab and aria-selected, but tabs lack aria-controls, panels lack role=tabpanel/aria-labelledby, and there is no Arrow/Home/End keyboard handling.
- Why it matters: screen readers cannot reliably associate the selected tab with its content, and keyboard users must tab through every tab instead of using expected tablist navigation.
- One-line fix: implement the complete tabs pattern with tab-to-panel ids, roving tabindex, arrow/Home/End handling, and explicit tabpanel labeling.

#### A11Y-06 — Multi-step transitions leave focus inside hidden content

- Location: demo/js/pages/subscription.js:15-18 and demo/pages/prenumerata.html:4; demo/js/pages/admin/login.js:10, 31, 48 and demo/pages/admin/login.html:13, 19, 23.
- What is wrong: the current wizard/login panel is hidden immediately after its submit button receives focus; focus is not moved to the newly revealed panel or heading.
- Why it matters: keyboard users can be left focused on a hidden control, creating confusing tab order and apparent keyboard dead ends.
- One-line fix: after each transition, move focus to a visible panel heading with tabindex=-1 and ensure the newly active step is exposed before focusing it.

#### A11Y-07 — Explicit interactive touch targets are below 40 px

- Location: demo/css/theme.css:135, 247, 388; demo/css/sections.css:234-235, 242.
- What is wrong: nested public nav links use min-height 34 px, small buttons use min-height 38 px, popup selects use min-height 34 px, inline admin buttons use min-height 31 px, and custom switches render at 35x20 px.
- Why it matters: these controls are difficult to activate accurately on touch devices and do not meet the requested 40 px minimum.
- One-line fix: set interactive controls to at least 40 px high (preferably 44 px), and enlarge the switch hit area through its label rather than only enlarging the visual thumb.

#### INTEGRITY-01 — Root footer admin link is broken

- Location: demo/index.html:104.
- What is wrong: href=admin/index.html resolves from the demo root to /admin/index.html, which does not exist; the actual file is demo/pages/admin/index.html.
- Why it matters: the visible “Valdymo pultas (demonstracija)” link produces a 404 from the home page.
- Verification: local HTTP check returned 404 for http://localhost:8000/admin/index.html and 200 for http://localhost:8000/pages/admin/index.html.
- One-line fix: change the root-page target to pages/admin/index.html.

#### INTEGRITY-02 — Subscription status vocabulary breaks the public-to-admin hand-off

- Location: demo/js/pages/subscription.js:33; demo/js/pages/admin/index.js:35; demo/js/pages/admin/prenumeratos.js:17.
- What is wrong: public verification saves status=active, while the dashboard count and admin status styling only recognize status=patvirtinta.
- Why it matters: a completed subscription can show “Prenumerata aktyvi” publicly but remain absent from “Aktyvūs prenumeratoriai” and appear as a warning in the admin subscriber table.
- One-line fix: define one shared status enum/normalizer and use it for save, KPI counting, pending filtering, and styling.

### P2 — annoyance, scaling risk, or maintainability

#### THEME-01 — Hard-coded colors bypass the token system

- Location: non-token CSS colors in demo/css/theme.css:83, 243-244, 327, 345, 347-350, 405; demo/css/sections.css:43, 68, 87-88, 159, 168-182, 214-218, 224, 245-246, 270. JavaScript palettes and inline map styles at demo/js/pages/analysis.js:6, 139, 142, 154; demo/js/pages/periodic.js:7; demo/js/pages/greenery.js:21; demo/js/pages/wildlife.js:16, 41; demo/js/pages/reports.js:21; demo/js/pages/map.js:7, 94-95, 127, 185, 190, 192.
- What is wrong: white/gray/status/error/protocol colors and chart/map palettes are repeated as raw hex/RGBA values instead of using the existing semantic tokens.
- Why it matters: changing the palette or adding another theme requires editing many unrelated selectors and can leave CSS, charts, and Leaflet markers visually inconsistent.
- One-line fix: add semantic status/chart/map tokens to theme.css and consume them from CSS plus a shared JS palette exported from one module.

#### PERF-01 — Query caches have no eviction or size limit

- Location: demo/js/data/query.js:7-9, 60-76, 146-149.
- What is wrong: rawCache, seriesCache, and dayAggregateCache grow for every unique parameter/site/date-range/resolution key and are only cleared when a manual-record event occurs.
- Why it matters: long-lived sessions or future date-range/filter combinations can retain generated arrays indefinitely and increase memory usage.
- One-line fix: cap the caches with an LRU/TTL policy or clear by date-range/section when the cache exceeds a defined size.

#### PERF-02 — CDN dependencies are synchronous

- Location: demo/pages/oro.html:54; demo/pages/zemelapis.html:50-51; the same pattern appears in demo/pages/ataskaitos.html:3, truksmas.html:4, dirvezemis.html:4, vanduo.html:4, gyvoji_gamta.html:4, and zeldynai.html:4.
- What is wrong: Chart.js and Leaflet CDN script tags have no defer/async attribute. They are placed at the end of body, which limits the impact, but the browser still blocks on the CDN fetch before module initialization.
- Why it matters: a slow third-party response delays interactive charts/maps and increases dependence on external availability.
- One-line fix: add defer to the classic CDN scripts, or load the dependency as an explicit module/feature chunk with an unavailable-library fallback.

#### PERF-03 — Leaflet rebuilds every visible marker on each filter toggle

- Location: marker rebuild at demo/js/pages/map.js:107-118; calls from every section/district/site/parameter/norm/layer interaction at demo/js/pages/map.js:212-217.
- What is wrong: each interaction clears the active layer and recreates all visible markers, including popup/tooltip objects and fresh latest-value queries.
- Why it matters: the 15-site demo is small, but a municipal deployment with hundreds or thousands of points can produce interaction jank and unnecessary garbage collection.
- One-line fix: diff marker state and update only changed markers, debounce filter bursts, and consider viewport/cluster-based rendering.

#### RESPONSIVE-01 — Mobile dropdown positioning is hard-coded and the admin topbar cannot wrap

- Location: demo/css/theme.css:419-423 fixes public dropdown top at 107 px; demo/css/sections.css:184-186 defines a single-row topbar and demo/css/sections.css:275-276 changes spacing but does not enable topbar wrapping.
- What is wrong: a taller wrapped mobile header can place the fixed dropdown over the header/content, while a narrow admin header must fit title, role chip, and logout in one flex row.
- Why it matters: at 360–414 px, long Lithuanian labels and localization can cause overlap or a partially obscured menu/action.
- One-line fix: anchor the mobile dropdown to the actual header/details container and allow the admin topbar/actions to wrap or stack below a narrow breakpoint.

#### INTEGRITY-03 — Shared public navigation has drifted on policy pages

- Location: standard navigation at demo/pages/ataskaitos.html:3 has 19 links and two group labels; demo/pages/privatumo-politika.html:3 and demo/pages/slapuku-politika.html:3 have 11 links, no group labels, and no aria-current marker for the current policy page.
- What is wrong: duplicated header markup has diverged between ordinary public pages and policy pages.
- Why it matters: users see different information architecture depending on entry page, and later navigation changes must be made in multiple copies.
- One-line fix: render the shared navigation from one partial/template or at least synchronize the policy-page nav and current-page state.

#### INTEGRITY-04 — Admin pages lack meta descriptions

- Location: missing description on demo/pages/admin/auditas.html:2, duomenys.html:2, index.html:6, login.html:6, nevalidus.html:2, nustatymai.html:2, patvirtinimas.html:2, pranesimai.html:2, prenumeratos.html:2, and sla.html:2.
- What is wrong: admin documents include charset, viewport, and title but no meta name=description.
- Why it matters: the pages are less self-describing for indexing, previews, and document tooling; it is a consistency gap versus the public pages.
- One-line fix: add a concise Lithuanian description per admin page; viewport tags are present and do not need correction.

#### PERF-04 — BDSR erase-event storage grows without a cap

- Location: demo/js/data/subscriptions.js:66, 68-75.
- What is wrong: every erase request appends to SUBSCRIPTION_ERASE_EVENTS_KEY without slicing, retention, or a maximum length.
- Why it matters: repeated demo use can eventually consume unnecessary localStorage and make CSV exports larger.
- One-line fix: retain a bounded recent window (for example, the latest 300 events) or document and enforce a retention policy.

### P3 — documented opportunity, not a release blocker

#### THEME-02 — No dark mode variant

- Location: demo/css/theme.css:4 sets color-scheme: light; there is no prefers-color-scheme: dark block (the only media feature at demo/css/theme.css:452 is prefers-reduced-motion).
- What is wrong: the portal has no dark-theme token values or user/system theme variant.
- Why it matters: municipal users working in low-light contexts cannot switch to a lower-luminance presentation.
- One-line fix: document this as a product decision for the demo, then add a semantic dark token layer if dark mode is required for production.
- Classification note: this is documented as requested and is not treated as a release defect for the static demo.

## Requested dimension checks with no defect

### Accessibility positives

- Public pages use lang=lt; the root page has a viewport and meta description at demo/index.html:2-6, and the public detail pages likewise include viewport/description metadata.
- The public shell has semantic header/nav/main/footer landmarks, and admin pages provide aside/header/main shells; for example demo/index.html:14-36, 99-106 and demo/pages/admin/index.html:12-16.
- Skip links exist, for example demo/index.html:13 and demo/pages/zemelapis.html:14.
- Global focus-visible styling exists at demo/css/theme.css:71-75.
- Static login, subscription, report-adjacent, map, and manual-entry fields have associated labels or aria-labels; examples include demo/pages/admin/login.html:15, 21, 26; demo/pages/prenumerata.html:4; demo/pages/admin/duomenys.html:6; and demo/pages/zemelapis.html:33-40.
- No img elements were found, so there is no missing-alt finding and no image lazy-loading finding.
- No href="#" button substitutes were found; report year links use a real in-page target at demo/pages/ataskaitos.html:4.
- No keyboard trap was found in the static controls; the P1 issue is focus loss after hiding a step, not a modal-style trap.

### Responsive positives

- Both CSS files contain mobile breakpoints: demo/css/theme.css:408-450 and demo/css/sections.css:138-156, 275-276.
- Data tables are wrapped for horizontal scrolling at demo/css/sections.css:61-66; admin tables add larger minimum widths but retain the wrapper at demo/css/sections.css:207-209.
- Major grids collapse at 720–980 px, and the map switches to a stacked layout at demo/css/theme.css:419-440.

### Performance positives

- The ES modules are placed at the end of body and module scripts are deferred by browser semantics; examples: demo/index.html:107 and demo/pages/zemelapis.html:50-51.
- Chart.js is configured responsive with maintainAspectRatio:false in demo/js/pages/analysis.js:47-48, demo/js/pages/periodic.js:16, demo/js/pages/greenery.js:21, demo/js/pages/wildlife.js:41, and demo/js/pages/reports.js:21.
- Existing Chart instances are destroyed before replacement in demo/js/pages/analysis.js:51-58, demo/js/pages/periodic.js:10-15, demo/js/pages/greenery.js:8-10, demo/js/pages/wildlife.js:18-19, and demo/js/pages/reports.js:19-21.
- CSS animations use opacity/transform rather than layout properties at demo/css/sections.css:211-212, 265-267, and reduced motion is handled at demo/css/theme.css:452-453.
- The admin feed and audit log are bounded at demo/js/data/admin/feed.js:18-20 and demo/js/data/admin/audit.js:27-30; map measurements are capped at demo/js/pages/map.js:193-195.

### Integrity positives

- All JavaScript files pass node --check.
- Apart from the root admin footer link reported above, local static href targets resolve to existing files.
- Demo-only simulated behavior is generally disclosed in visible copy; for example import simulation at demo/pages/admin/duomenys.html:7 and report export limitations at demo/pages/ataskaitos.html:4.

## Patterns and systemic issues

1. Dynamic UI is less accessible than static UI: generated controls lack labels and generated result regions lack announcements, while hand-authored controls are mostly labeled.
2. Design tokens stop at the CSS boundary: charts, Leaflet markers, inline styles, and status variants carry their own raw color literals.
3. Shared public chrome is copied into each HTML page, allowing nav structure and current-page state to drift.
4. The public/admin boundary has no shared contract for subscription status values.
5. The demo has good bounded collections in feed/audit/map measurements, but query and erase-event stores do not share the same retention discipline.

## Anti-patterns verdict

PASS — the implementation does not read as generic AI-generated UI. It uses an intentional maritime/municipal palette, a restrained type system, meaningful tabular/analysis layouts, and purposeful status hierarchy. The repeated surfaces are appropriate for an operations portal; the decorative map preview gradient is localized to a map affordance. The remaining concern is consistency/maintenance, not aesthetic slop.

## Recommended actions

1. [P1] /harden — add accessible names, live result summaries, login error announcements, tab relationships, and focus restoration across generated and multi-step UI.
2. [P1] /adapt — raise all sub-40 px targets and fix the mobile dropdown/topbar behavior at 360–414 px.
3. [P1] /normalize — centralize subscription status enums and shared navigation markup/current-page state.
4. [P2] /normalize — replace CSS/JS raw color literals with semantic theme tokens and re-run the contrast matrix.
5. [P2] /optimize — add cache eviction, bound erase-event storage, defer CDN scripts, and reduce Leaflet full-layer rebuilds.
6. [P2] /polish — add admin meta descriptions and complete the final consistency pass.

## Condensed top 15 issues

1. [P1] demo/index.html:104 — root footer admin link resolves to a 404.
2. [P1] demo/js/pages/subscription.js:33 vs demo/js/pages/admin/index.js:35 — active subscription status is not counted by admin.
3. [P1] demo/js/pages/admin/pranesimai.js:10-11, sla.js:17, nevalidus.js:35 — generated selects/inline input lack accessible names.
4. [P1] demo/js/pages/analysis.js:118-131 and demo/js/pages/periodic.js:45-49 — filter-driven result changes are not announced.
5. [P1] demo/pages/admin/index.html:24 and demo/js/pages/admin/index.js:40-42 — live ingestion feed/KPIs are not in a live region.
6. [P1] demo/pages/admin/login.html:15, 21, 26 and demo/js/pages/admin/login.js:11 — login errors are not announced.
7. [P1] demo/pages/oro.html:27 / demo/js/pages/analysis.js:176-181 — air tabs lack tabpanel relationships and arrow-key behavior.
8. [P1] demo/pages/gyvoji_gamta.html:4 / demo/js/pages/wildlife.js:48-50 — wildlife tabs have the same incomplete ARIA pattern.
9. [P1] demo/js/pages/subscription.js:15-18 and demo/js/pages/admin/login.js:10 — transitions hide the focused step without moving focus.
10. [P1] demo/css/theme.css:135, 247, 388 and demo/css/sections.css:234-235, 242 — multiple touch targets are under 40 px.
11. [P1] demo/css/theme.css:304, 325, 363, 392, 400, 403-404 — five actual token pairs fail contrast; worst ratio is 3.39:1.
12. [P2] demo/js/data/query.js:7-9, 60-76, 146-149 — query caches have no eviction/size cap.
13. [P2] demo/pages/oro.html:54 and demo/pages/zemelapis.html:50-51 — CDN scripts are synchronous.
14. [P2] demo/js/pages/map.js:107-118, 212-217 — every map filter rebuilds all visible markers.
15. [P2] demo/css/theme.css:419-423, demo/pages/privatumo-politika.html:3, and admin metadata listed in INTEGRITY-04 — mobile/menu and shared-document consistency gaps remain.

Re-run /audit after fixes to update the score.
