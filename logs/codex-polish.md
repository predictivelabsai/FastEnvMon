# Task: /impeccable polish — contrast + content credibility fixes

You are working in the repo `C:\Users\Joosep\tenders\klaipeda-environment` (static demo site under `demo/`, served at http://localhost:8000 — the server is already running; use it for checks, do not start another one). Read `logs/audit-report.md` first (findings #1, #2, #10 of P1 and P2 items 1–2). Brand: Klaipėda identity — do NOT redesign, keep tokens and visual language; these are precise surgical fixes.

## Fix these, measured from a prior UI audit

1. **Failing text contrast** (WCAG 2.2 AA ≥4.5:1 for normal text):
   - Token `--ink-500: #718897` in `demo/css/theme.css` measures 3.7:1 on white and 3.39:1 on muted surfaces. Replace its value with a darker gray-blue that reaches ≥4.5:1 on BOTH white and the muted surface backgrounds it appears on (compute the ratio; you may keep the hue). Check usages to confirm none are meant as decorative-only before darkening.
   - Two status-chip color pairs fail: ~3.79:1 and ~4.48:1 (find the chip text/bg pairs producing these, likely `status-chip` warning/info variants in `demo/css/theme.css` or `demo/css/sections.css`:43-270). Adjust chip text colors (keep chip background hues) so every chip text/bg pair reaches ≥4.5:1.
   - Footer link hover: global `a:hover { color: var(--land-900) }` (`demo/css/theme.css` ~line 69) is effectively invisible on the dark footer (#10544b on #071f5b = 1.76:1). Add a scoped override for footer links (`.site-footer a:hover` and any footer-adjacent contexts) that lightens on dark background (e.g. `--shore-100` / white), ≥4.5:1. Leave the global hover intact for light backgrounds.

2. **AQI hero inconsistency on the home page**: the hero air-quality card shows band „Vidutinė" (yellow) next to the number „2 · INDEKSAS". The demo uses the EEA AQI (0–100 score with bands). Make the big number consistent with the band: for „Vidutinė" the displayed EEA AQI score should be in the ~40–49 range. Find where the number is produced (grep `INDEKSAS` in `demo/js` / `demo/index.html` — likely home page AQI computation in `demo/js/data/generator.js` or `demo/js/pages/home.js`) and fix the generation so score and band always agree. Do not invent a new scale — the EEA AQI score is the value to show.

3. **Spec clause tags must not appear in user-facing kickers** — internal procurement numbering („3.6.1–3.6.3 ·", „3.6.6–3.6.11 ·", „3.10.1.1.2.5 ·", „3.7.2 · 3.7.4 · 3.8.6 ·" etc.) appears in `section-kicker`/eyebrow elements on: `zemelapis.html`, `oro.html`, `ataskaitos.html`, `dirvezemis.html`, `gyvoji_gamta.html`, `bendra-info.html`, `truksmas.html`, `zeldynai.html`, `prenumerata.html`, `vanduo.html`, `vadovas.html` (all under `demo/pages/`). Rewrite each kicker to a short plain Lithuanian description (fitting the sentence style of the existing ones — e.g. „Triukšmo rodikliai", „Periodinio monitoringo dalys"). Preserve Lithuanian grammar. If `demo/README.md` or a similar dev-facing file exists, ensure the clause mapping lives there (e.g. „oro.html → 3.6.x"); do not create new documents.

4. **„KD2,5" → „KD 2,5"** (spec wording): `demo/js/data/catalog.js` lines ~8 and ~23. While there, normalize other such labels for consistency (e.g. „KD10" in `demo/js/pages/admin/pranesimai.js` and any other display strings → „KD 10"; do NOT touch internal ids like `pm25`).

## Rules
- No redesign, no new visual language; token-based fixes only where possible.
- No git commits, no AI attribution anywhere.
- Everything user-visible stays in correct Lithuanian.

## Deliverable
Concise markdown summary at the end: token values before→after, the measured contrast ratios of every pair you touched (before/after), list of kickers rewritten (page → new kicker text), AQI fix location, and any strings normalized.