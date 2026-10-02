# Task: Compact targeted re-score of the KMS AMIS demo audit (delta verification only)

Working directory: this repo. Static demo under `demo/` served at http://localhost:8000. Do NOT fix anything. Do not write a full report — update the score section and disposition of `logs/audit-report-2.md` findings in a NEW file `logs/audit-report-final.md`: verdict sentence, the 5-dimension score table with a one-line justification per dimension (updated, honest), and a short closing disposition note stating which of the 3 P1 / 4 P2 / 1 P3 from `logs/audit-report-2.md` are now fixed with one line of evidence each. Never add AI attribution.

All fixes were just applied and self-verified by a prior batch; your job is to CONFIRM the deltas that move the score, not re-run the whole audit. python playwright headless chromium, utf-8 stdout wrapper.

Checks (scoped to what changed since the re-audit):
1. `pages/oro.html#laboratoriniai` at 1440: `#lab-sites` ≥1 option, ≥1 selected, all 3 `#panel-laboratory-air` canvases have `_kmsChart`, ≥1 `.stat-card` in that panel. (Integrity + confirms audit P1-1 closed.)
2. All authenticated admin routes (login `administratorius`/`admin`, TOTP from `#totp-code`, use form submit buttons via Enter since buttons lack ids) at 390×844: scrollWidth == 390 each (dashboard, prenumeratos, pranesimai, sla, nevalidus, auditas, duomenys, nustatymai, patvirtinimas). (Responsives P1 closed.)
3. `#manual-message` on `pages/admin/duomenys.html` has `role="status"`. (A11y P1 closed; also re-confirm the five tab/keyboard paths still pass with a quick keyboard walk on oro tabs: Arrow navigation toggles aria-selected.)
4. At 390 and 1440 open the Monitoringas dropdown: menu top must be below header bottom (report both).
5. Visible copy clause grep: `grep -E "3\.[0-9]+\." demo/pages/*.html` → 0 matches in body copy (head-only references excluded); admin `meta name="description"` count == 10 of 10 admin pages.
6. Theming: confirm `analysis.js` and `map.js` import palette from `demo/js/charts/` and contain no raw hex color literals except html-entity escapes; charts still render (one chart route instantiated, colors equal to `#0b2f8b` ticks `#5b7383` grid `#d6e2e6`).
7. vadovas.html heading sequence H1→H2→H3 and analysis panels without self-referencing aria-controls.
8. One full public sweep at 390 + console/page errors on 6 spot routes at 1440 (index, oro incl. lab tab, vanduo, ataskaitos, gyvoji_gamta, zemelapis) → 0 errors expected.

Then score honestly. The dark-mode absence remains a documented product decision, not deducted.