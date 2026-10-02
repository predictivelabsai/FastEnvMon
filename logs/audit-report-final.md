# KMS AMIS demo — targeted final re-score

Date: 2026-10-01 · Scope: delta verification only against `logs/audit-report-2.md`

**PASS — all eight remaining findings (3 P1, 4 P2, 1 P3) are verified fixed; the targeted public/admin sweeps completed with no console or page errors.**

## Audit health score

| # | Dimension | Score | One-line justification |
|---|-----------|:-----:|------------------------|
| 1 | Accessibility | 4/4 | The last live-region gap is closed, the oro tabs preserve selected state through the five-key walk, and the guide/panel semantics now pass. |
| 2 | Performance | 4/4 | Unchanged from the prior measured 4/4; no performance finding was in this delta set, and the scoped runtime sweep exposed no regression. |
| 3 | Responsive design | 4/4 | All 14 public routes and all 9 authenticated admin routes fit exactly within 390px, while the dropdown clears the header at both tested widths. |
| 4 | Theming | 4/4 | `analysis.js` and `map.js` now consume the shared chart palette with no raw hex literals, and live chart colors match the required palette; light-only remains a product decision. |
| 5 | Implementation integrity | 4/4 | Laboratory-air data and charts render, public procurement-clause copy is gone, admin metadata is complete, and the six-route desktop spot sweep is error-free. |
| **Total** | | **20/20** | **Excellent (minor polish)** |

## Closing disposition

All **3 P1 / 4 P2 / 1 P3** findings from the re-audit are now fixed:

- **P1-1 — FIXED:** `#lab-sites` has 3 options and 3 selected; all 3 laboratory canvases have `_kmsChart`, and the panel contains 5 stat cards.
- **P1-2 — FIXED:** dashboard, prenumeratos, pranesimai, SLA, nevalidus, auditas, duomenys, nustatymai, and patvirtinimas each measured `scrollWidth = clientWidth = 390` at 390×844.
- **P1-3 — FIXED:** `#manual-message` on `pages/admin/duomenys.html` has `role="status"`; oro Arrow Right/Left, End, Home, and Arrow Right each moved focus and left exactly one matching `aria-selected="true"` tab.
- **P2-1 — FIXED:** at 390px the menu starts at 156.31px below the 151.31px header bottom; at 1440px it starts at 122.81px below the 117.81px header bottom.
- **P2-2 — FIXED:** body-copy matching for `3\.[0-9]+\.` across `demo/pages/*.html` returned 0 matches after excluding head/script/style content.
- **P2-3 — FIXED:** `analysis.js` imports `defaults.js` and `palette.js`, `map.js` imports `palette.js`, and both contain 0 raw hex literals after excluding HTML-entity escapes; a live laboratory chart used `#0b2f8b`, tick `#5b7383`, and grid `#d6e2e6`.
- **P2-4 — FIXED:** admin `meta name="description"` coverage is 10 of 10 pages.
- **P3-1 — FIXED:** `vadovas.html` follows H1→H2→H3 without a skipped level, and both oro analysis panels have no `aria-controls` or self-reference.

The complete 390px public sweep and the 1440px spot sweep of index, oro (laboratory tab), vanduo, ataskaitos, gyvoji gamta, and zemelapis produced **0 console errors and 0 page errors**.
