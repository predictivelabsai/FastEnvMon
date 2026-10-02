# KMS AMIS demo — /impeccable audit (consolidated)

Date: 2026-10-01 · Mode: code-level technical audit (no fixes applied) · Scope: `demo/` — 15 public pages, 10 admin pages, theme/sections CSS, data & page JS modules.
Inputs: impeccable detector (377 raw findings → verified), `logs/audit-static.md` (Codex static scan), `logs/audit-runtime.md` (Codex Playwright runtime scan), plus manual screenshot review of all admin pages.

## Implementation integrity verdict

**PASS-ish — coherent, intentional, with two functional bugs on the demo's own happy path.**
The implementation reads as a purpose-built municipal operations portal, not generic AI UI: maritime/municipal palette on tokens, meaningful tabular/analysis layouts, restrained type system, demo-simulated behavior disclosed in visible copy. Detector's slop verdict was clean, with false positives filtered out (Plus Jakarta Sans is the mandated Klaipėda brand font; all-caps kickers and side-tab accents are deliberate brand-motif choices — although 22 repeated side-tab accent borders deserve one variation pass). Two real integrity defects break the demo's own demo-flow: the footer link to the admin backoffice 404s from the home page, and a completed public subscription is stored as `active` while the admin module only recognizes `patvirtinta` — so the core "portal → valdymo pultas" story shows wrong state. Both verified.

## Audit health score

| # | Dimension | Score | Key finding |
|---|-----------|:-----:|-------------|
| 1 | Accessibility | 2/4 | Generated admin controls lack accessible names; tab pattern incomplete; hover text 1.76:1; muted text 3.39–3.79:1 |
| 2 | Performance | 3/4 | Solid Chart/animation hygiene; unbounded query caches + sync CDN scripts remain |
| 3 | Responsive design | 2/4 | 4 pages overflow horizontally at 390px (worst +244px); text-scale clipping on map preview |
| 4 | Theming | 2/4 | Token system good where used; chart/Leaflet/status colors carry raw hex literals; no dark variant (documented, not requested for demo) |
| 5 | Implementation integrity | 3/4 | Slop signature clean; broken admin footer link + subscription status enum mismatch |
| **Total** | | **12/20** | **Acceptable (significant work needed)** |

## Executive summary

- **Score: 12/20 — Acceptable.** All ten desktop routes ran with zero console errors and zero HTTP failures; charts/Leaflet render; the login TOTP flow works end-to-end.
- Issues found: **~19 distinct issues — 11 P1, 7 P2, 2 P3.**
- Top critical cluster: **accessibility of dynamically generated UI** (labels, live regions, tabs, login errors, focus management) — static hand-authored UI is far better than the JS-generated parts.
- Top visual defects: **mobile horizontal overflow on 4 pages**, sub-40px touch targets (worst: 19px-tall footer links), failing contrast token pairs, dashboard audit-table clipping.
- Credibility-of-demo defects (bid audience would see them): wrong AQI number vs its band on the home hero, spec clause tags like „3.6.1–3.6.3" in user-visible kickers, „KD2,5" vs spec wording „KD 2,5".

## Detailed findings by severity

### P1 (11)

1. **Wrong AQI headline value** — `demo/js/pages/…` home hero card shows band "Vidutinė (yellow)" with „2 INDEKSAS" (index 2, band yellow). EEA AQI value should be a 0–100 score (~42 for „Vidutinė") or the number must be labeled as the band level. A factually wrong number on the hero card.
2. **Broken admin footer link** — `demo/index.html:104`: `href="admin/index.html"` → 404; correct is `pages/admin/index.html`. (Verified via HTTP 404.)
3. **Subscription status enum mismatch** — `subscription.js:33` saves `status: "active"`; `admin/index.js:35` + `prenumeratos.js:17` recognize only `"patvirtinta"`. Completed subscription shows "Prenumerata aktyvi" publicly but is missing in admin KPIs and flagged wrong in the subscriber table.
4. **Generated controls lack accessible names** — `admin/pranesimai.js:10-11`, `sla.js:17`, `nevalidus.js:35` selects/inputs have no label/aria-label (screen readers read unnamed controls).
5. **Dynamic results not announced** — result/status regions on oro, truksmas, dirvožemis, vanduo, gyvosios gamtos, želdynai pages (`analysis.js:118`, `periodic.js:45`, `wildlife.js:38`, `greenery.js:18`) and the admin live feed/KPIs (`admin/index.js:40`, refreshed every 4 s) have no `role=status`/`aria-live`.
6. **Login errors not announced** — `admin/login.html:15,21,26` error paragraphs have no `role=alert`/live region/`aria-describedby`.
7. **Incomplete tab pattern** — `oro.html` analysis tabs (`analysis.js:176`) and gyvoji_gamta tabs (`wildlife.js:48`) lack `aria-controls`, `role=tabpanel`, tab→panel labeling and Arrow/Home/End keyboard navigation.
8. **Focus stranded on hidden panels** — subscription wizard (`subscription.js:15-18`) and login steps (`login.js:10,31,48`) hide the focused step without moving focus to the revealed step.
9. **Touch targets under 40px** — footer links rendered at 19.1px height on every page; nav sub-links 34px; small buttons 38px; inline admin buttons 31px; switches 35×20px (`theme.css:135,247,388`; `sections.css:234-242`).
10. **Failing contrast (verified)** — muted text `--ink-500` `#718897`: 3.7:1 on white and 3.39:1 on muted surfaces; poor/no-data status chips 3.79:1/4.48:1; **hover on dark footer links `--land-900` on `--sea-950` = 1.76:1** (`theme.css:69`) — effectively invisible.
11. **Mobile breakage** — horizontal overflow at 390px on `oro.html`, `gyvoji_gamta.html`, `truksmas.html` (+244px), `ataskaitos.html` (+33px); at 150% text zoom the home map-preview clips content (fixed-height container). Admin dashboard audit-preview table clips horizontally on desktop.

### P2 (7)

1. **Spec clause tags in user-visible kickers** — „3.6.1–3.6.3 ·", „3.6.6–3.6.11 ·", „3.10.1.1.2.5 ·", „3.7.2 · 3.7.4 · 3.8.6 ·" etc. on zemelapis/oro/ataskaitos/dirvezemis/gyvoji_gamta/bendra-info/truksmas/zeldynai/prenumerata/vanduo/vadovas. Internal procurement numbering must not reach public UI; keep clause mapping in README/evaluator materials.
2. **„KD2,5" spacing** — `catalog.js:8,23` display name „Kietosios dalelės KD2,5"; spec wording „KD 2,5".
3. **Unbounded storage growth** — `query.js` rawCache/seriesCache/dayAggregateCache have no eviction cap; `subscriptions.js:66-75` erase-event log grows unbounded (feed/audit stores are capped — inconsistent discipline).
4. **Synchronous CDN scripts** — Chart.js/Leaflet tags in ~9 pages without `defer` (end-of-body placement limits impact; slow CDN still blocks init).
5. **Leaflet full marker rebuilds on each filter change** — `map.js:107-118,212-217` recreates all markers incl. popups and latest-value lookups.
6. **Colors bypass tokens** — chart palettes, Leaflet styles, status/protocol colors as raw hex in analysis/periodic/greenery/wildlife/reports/map JS + several CSS blocks (`sections.css:43-270` etc.).
7. **Shared chrome drift** — policy-page navs have 11 links vs 19 on standard pages and no aria-current; fixed 107px mobile dropdown offset can collide with a wrapped header; admin topbar cannot wrap at 360px; admin pages missing meta descriptions.

### P3 (2)

1. **No dark-mode variant** — `color-scheme: light` only. Documented as a product decision for the demo (municipal public portal, brand-approved light world).
2. Micro-typography — display headings at `letter-spacing: -0.06em` (mild; brand-taste question), one `h1→h3` heading skip on `vadovas.html`, nested card on `zemelapis.html`.

## Patterns & systemic issues

1. **Generated UI is less accessible than static UI** — every hand-authored control has labels; every JS-generated control mostly doesn't. Any code generating controls should default to generating accessible ones.
2. **Token system stops at the CSS boundary** — charts, Leaflet markers and inline styles re-scope colors as literals; no shared JS palette module.
3. **Copied chrome instead of a shared partial** — nav/footer markup per page has already drifted (policy pages, `aria-current`, footer link bug comes exactly from that copying).
4. **No contract at the public↔admin boundary** — subscription status enums, localStorage keys are shared by convention but not by one normalizer.

## Positive findings

- **Zero console/runtime failures** across all ten routes at desktop, including map (25/25 tiles), analysis, reports and admin redirect flow.
- Skip links, semantic landmarks, `lang=lt`, meta descriptions on public pages, global `:focus-visible` styling (0 focus-ring misses in tab sweep), no keyboard traps.
- Charts: responsive config + `destroy()` before rebuild everywhere; CSS animates only transform/opacity; `prefers-reduced-motion` handled (but check the alternative preserves hierarchy).
- Tables wrapped for horizontal scroll; grids collapse at 720–980px.
- Bounded collections where it counts most (admin feed, audit log); all JS passes syntax checks; local links resolve except the one P1.

## Recommended actions (priority order)

1. **[P1] `/impeccable harden`** — accessible names for generated controls, live result/status regions (incl. admin feed), login error announcements, complete tab pattern, focus management on step transitions, fix broken footer link + subscription status normalizer.
2. **[P1] `/impeccable adapt`** — fix 390px overflow on oro/gyvoji_gamta/truksmas/ataskaitos, raise all touch targets ≥40px (footer links especially), make admin dashboard audit table scroll/wrap, text-scale-safe map preview.
3. **[P1] `/impeccable polish` (contrast subset)** — darken `--ink-500`, fix status chip pairs, remove the `--land-900`-on-`--sea-950` hover (footer links should lighten on dark bg, e.g. `--shore-100`), fix AQI number/band, remove clause tags from kickers, „KD 2,5".
4. **[P2] `/impeccable optimize`** — cache eviction caps, bounded erase-event log, `defer` CDN scripts, Leaflet marker diffing.
5. **[P2] `/impeccable polish` (tokens subset)** — shared JS palette module for chart/Leaflet colors, sync policy-page navs + aria-current, admin meta descriptions.
6. End with a re-run of `/impeccable audit` to confirm the score.

Realistic target after one batched fix: **17–18/20**.

---

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/impeccable audit` after fixes to see your score improve.