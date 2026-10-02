# Klaipėda aplinkos monitoringo portalas — runtime UI audit

- Run: 2026-10-01T18:21:30+03:00
- Scope: existing static `demo/` site served at `http://127.0.0.1:8000`.
- Execution: Python Playwright sync API, headless Chromium; no build step; no source files edited.
- Expected admin behavior: admin pages that redirect to `pages/admin/login.html` are recorded as expected, not failures.

## Executive summary

**Finding count:** 7 total — P0: 0, P1: 7, P2: 0, P3: 0.
**Runtime result:** Critical runtime risk.

Top issues:
- **[P1] Clickable target below 40×40px** — `/index.html`: a — Peržiūrėti pagal taškus žemėlapyje → 201.5×15px; a.button.button--secondary — Atverti žemėlapį 120.2×38px; a — Atverti vadovą → 113.6×18px; a — Valdymo pultas (demonstracija) 183.1×19.1px; a — Privatumo politika 104.3×19.1px; a — Slapukų politika 92×19.1px; a — Naudotojo vadovas 113.9×19.1px; a — Žemėlapis 61×19.1px
- **[P1] Layout/text overflow at 150% root font size** — `/index.html`: section.panel.map-preview — Interaktyvus žemėlapis Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė. Atverti žemėlapį offsetWidth/clientWidth=436/434, scrollHeight/clientHeight=274/230
- **[P1] Horizontal overflow at 390px** — `/pages/ataskaitos.html`: document.scrollingElement.scrollWidth=423 exceeds window.innerWidth=390 by 33px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.surface.surface-pad — 2022–2025 · VIEŠOS SUVESTINĖS Pasirinkite metus Nuorodos pateikiamos atsisiuntimo stiliumi, tačiau š… (409px), section#report-view.report-sheet — KMS AMIS · VIEŠOJI ATASKAITA Aplinkos monitoringo metinė ataskaita 2025 2025-01-01 – 2025-12-31 Suve… (409px).
- **[P1] Horizontal overflow at 390px** — `/pages/gyvoji_gamta.html`: document.scrollingElement.scrollWidth=634 exceeds window.innerWidth=390 by 244px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.surface.surface-pad — 7 POTEMĖS · METINIAI PJŪVIAI Augalijos monitoringas Rūšių skaičius ir augalijos padengimo / gausumo … (620px), div.notice — Periodiškumas. Gyvosios gamtos stebėjimai yra sezoniniai ir periodiniai. Trūkstami metai reiškia, ka… (620px).
- **[P1] Clickable target below 40×40px** — `/pages/oro.html`: a — Valdymo pultas (demonstracija) 183.1×19.1px; a — Privatumo politika 104.3×19.1px; a — Slapukų politika 92×19.1px; a — Naudotojo vadovas 113.9×19.1px; a — Žemėlapis 61×19.1px

## Runtime health score

This is intentionally limited to the requested runtime checks; theming and visual anti-patterns were not scored from source inspection.

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 2/4 | 13 small touch-target findings; 0 focus-ring misses; 0 tab-order flags |
| Responsive design | 2/4 | 4 mobile overflow pages; 1 text-scaling issue groups |
| Console/network stability | 4/4 | 0 console/page/network events at desktop |
| Runtime subtotal | 8/12 | Critical runtime risk |
| Theming | N/A | Outside requested runtime checks |
| Anti-patterns | N/A | Outside requested runtime checks |

## 1. Mobile overflow — 390×844

Columns: requested page, final URL, `scrollWidth`, `innerWidth`, overflow flag, widest elements.

| Page | Final URL / note | scrollWidth | innerWidth | Overflow | Widest elements |
|---|---|---:|---:|---|---|
| `/index.html` | /index.html | 390 | 390 | pass | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px |
| `/pages/oro.html` | /pages/oro.html | 634 | 390 | FLAG | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px; section.analysis-panel.surface — AUTOMATINIAI IR ISTORINIAI ĮRAŠAI Stotelių duomenų analizė Filtrai taiko… |
| `/pages/zemelapis.html` | /pages/zemelapis.html | 390 | 390 | pass | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px; canvas.leaflet-zoom-animated 442px |
| `/pages/ataskaitos.html` | /pages/ataskaitos.html | 423 | 390 | FLAG | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px; section.surface.surface-pad — 2022–2025 · VIEŠOS SUVESTINĖS Pasirinkite metus Nuorodos pateikiamos atsisi… |
| `/pages/prenumerata.html` | /pages/prenumerata.html | 390 | 390 | pass | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px |
| `/pages/gyvoji_gamta.html` | /pages/gyvoji_gamta.html | 634 | 390 | FLAG | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px; section.surface.surface-pad — 7 POTEMĖS · METINIAI PJŪVIAI Augalijos monitoringas Rūšių skaičius ir augal… |
| `/pages/truksmas.html` | /pages/truksmas.html | 634 | 390 | FLAG | ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… 1086px; section.analysis-panel.surface — 7 RODIKLIAI · DBA Triukšmo duomenų analizė Filtruokite pagal laikotarpį,… |
| `/pages/admin/index.html` | redirected to login (expected) | 390 | 390 | — | — |
| `/pages/admin/duomenys.html` | redirected to login (expected) | 390 | 390 | — | — |
| `/pages/admin/sla.html` | redirected to login (expected) | 390 | 390 | — | — |

## 2. Console/network — 1440×950

Zero-tolerance rule: any console error/warning, uncaught page exception, HTTP status ≥400, or failed request is a finding.

### `/index.html`

- Final URL: `/index.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/oro.html`

- Final URL: `/pages/oro.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/zemelapis.html`

- Final URL: `/pages/zemelapis.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/ataskaitos.html`

- Final URL: `/pages/ataskaitos.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/prenumerata.html`

- Final URL: `/pages/prenumerata.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/gyvoji_gamta.html`

- Final URL: `/pages/gyvoji_gamta.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/truksmas.html`

- Final URL: `/pages/truksmas.html`.
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/admin/index.html`

- Final URL: `/pages/admin/login.html` — redirected to login (expected).
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/admin/duomenys.html`

- Final URL: `/pages/admin/login.html` — redirected to login (expected).
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

### `/pages/admin/sla.html`

- Final URL: `/pages/admin/login.html` — redirected to login (expected).
- Console messages: 0; page exceptions: 0; HTTP ≥400: 0; failed requests: 0.
- **PASS** — no console warnings/errors or HTTP/request failures recorded.

## 3. Touch targets — 390px

### `/index.html`

Below 40×40px:
- `a — Peržiūrėti pagal taškus žemėlapyje →` — 201.5×15px
- `a.button.button--secondary — Atverti žemėlapį` — 120.2×38px
- `a — Atverti vadovą →` — 113.6×18px
- `a — Valdymo pultas (demonstracija)` — 183.1×19.1px
- `a — Privatumo politika` — 104.3×19.1px
- `a — Slapukų politika` — 92×19.1px
- `a — Naudotojo vadovas` — 113.9×19.1px
- `a — Žemėlapis` — 61×19.1px

### `/pages/oro.html`

Below 40×40px:
- `a — Valdymo pultas (demonstracija)` — 183.1×19.1px
- `a — Privatumo politika` — 104.3×19.1px
- `a — Slapukų politika` — 92×19.1px
- `a — Naudotojo vadovas` — 113.9×19.1px
- `a — Žemėlapis` — 61×19.1px

## 4. Keyboard focus and order — first 15 Tab stops

### `/index.html`

- Focusable controls found: 40; focus-ring misses: 0; tab-order flags: no.
- Sequence:
  - Tab 1: `a.brand-lockup — KMS AMIS pagrindinis puslapis` at (40,32) 485×83px; `:focus-visible`=True; computed ring=True
  - Tab 2: `summary — KMS AMIS` at (725,18) 96×46px; `:focus-visible`=True; computed ring=True
  - Tab 3: `summary — Klaipėdos miesto savivaldybės aplinkos monitoringas` at (827,18) 357×46px; `:focus-visible`=True; computed ring=True
  - Tab 4: `a — Monitoringo metinės ataskaitos` at (1188,18) 212×46px; `:focus-visible`=True; computed ring=True
  - Tab 5: `a — Automatinių pranešimų prenumerata` at (994,69) 241×46px; `:focus-visible`=True; computed ring=True
  - Tab 6: `a — Interaktyvus žemėlapis` at (1240,69) 160×46px; `:focus-visible`=True; computed ring=True
  - Tab 7: `a.button.button--primary — Atverti interaktyvų žemėlapį →` at (40,541) 235×46px; `:focus-visible`=True; computed ring=True
  - Tab 8: `a — Peržiūrėti pagal taškus žemėlapyje →` at (995,997) 202×15px; `:focus-visible`=True; computed ring=True
  - Tab 9: `a.button.button--secondary — Atverti žemėlapį` at (1261,1239) 120×38px; `:focus-visible`=True; computed ring=True
  - Tab 10: `a.monitoring-link — Aplinkos oro monitoringas Automatinės stotelės · laboratoriniai duomenys` at (40,1426) 331×126px; `:focus-visible`=True; computed ring=True
  - Tab 11: `a.monitoring-link — Aplinkos triukšmas Septyni rodikliai · logaritminis vidurkis` at (383,1426) 331×126px; `:focus-visible`=True; computed ring=True
  - Tab 12: `a.monitoring-link — Dirvožemis Metalai · naftos produktai · periodiniai mėginiai` at (726,1426) 331×126px; `:focus-visible`=True; computed ring=True
  - Tab 13: `a.monitoring-link — Paviršinis vanduo Maistinės medžiagos · biologija` at (1069,1426) 331×126px; `:focus-visible`=True; computed ring=True
  - Tab 14: `a.monitoring-link — Gyvoji gamta Septynios potemės · rūšių skaičius ir gausumas` at (40,1564) 331×126px; `:focus-visible`=True; computed ring=True
  - Tab 15: `a.monitoring-link — Želdynai ir želdiniai Būklės balai · mechaniniai pažeidimai` at (383,1564) 331×126px; `:focus-visible`=True; computed ring=True

### `/pages/admin/login.html`

- Focusable controls found: 4; focus-ring misses: 0; tab-order flags: no; tab sequence cycles after all focusable controls (expected).
- Sequence:
  - Tab 1: `a.admin-login-brand — KMS KMS AMIS VALDYMO PULTAS` at (513,118) 414×45px; `:focus-visible`=True; computed ring=True
  - Tab 2: `input#login-username.field — administratorius` at (513,531) 414×43px; `:focus-visible`=True; computed ring=True
  - Tab 3: `input#login-password.field — ••••••••` at (513,611) 414×43px; `:focus-visible`=True; computed ring=True
  - Tab 4: `button.button.button--primary — Tęsti` at (513,674) 65×46px; `:focus-visible`=True; computed ring=True
  - None
  - Tab 6: `a.admin-login-brand — KMS KMS AMIS VALDYMO PULTAS` at (513,118) 414×45px; `:focus-visible`=True; computed ring=True
  - Tab 7: `input#login-username.field — administratorius` at (513,531) 414×43px; `:focus-visible`=True; computed ring=True
  - Tab 8: `input#login-password.field — ••••••••` at (513,611) 414×43px; `:focus-visible`=True; computed ring=True
  - Tab 9: `button.button.button--primary — Tęsti` at (513,674) 65×46px; `:focus-visible`=True; computed ring=True
  - None
  - Tab 11: `a.admin-login-brand — KMS KMS AMIS VALDYMO PULTAS` at (513,118) 414×45px; `:focus-visible`=True; computed ring=True
  - Tab 12: `input#login-username.field — administratorius` at (513,531) 414×43px; `:focus-visible`=True; computed ring=True
  - Tab 13: `input#login-password.field — ••••••••` at (513,611) 414×43px; `:focus-visible`=True; computed ring=True
  - Tab 14: `button.button.button--primary — Tęsti` at (513,674) 65×46px; `:focus-visible`=True; computed ring=True
  - None

## 5. Text scaling — index.html at 150% root font size

Screenshot: `logs\audit_textscale_index.png`

Potential overflow/clipping in main landmarks:
- `section.panel.map-preview — Interaktyvus žemėlapis Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė. Atverti žemėlapį` — offsetWidth/clientWidth=436/434; scrollHeight/clientHeight=274/230; overflow=hidden/hidden

## 6. Interaction sanity

### Home page

```json
{
  "goto_error": null,
  "dropdown": {
    "found": true,
    "label": "KMS AMIS",
    "open": true
  },
  "analysis_tabs": {
    "count": 0,
    "tabs": [],
    "note": "No role=tab elements exist on index.html; tab-switch check skipped as requested."
  },
  "map_link": {
    "found": true,
    "final_url": "http://127.0.0.1:8000/pages/zemelapis.html",
    "map": {
      "containerCount": 1,
      "tileCount": 25,
      "loadedTileCount": 25,
      "mapSize": {
        "width": 1107,
        "height": 906
      }
    }
  }
}
```

### Reports page

```json
{
  "goto_error": null,
  "generate_button": {
    "found": false,
    "used_year_link": "2022 Metinė suvestinė · atverti"
  },
  "generated": {
    "sectionsTextLength": 1240,
    "canvasCount": 1,
    "reportTitle": "Aplinkos monitoringo metinė ataskaita 2022"
  },
  "runtime_messages": {
    "console": [],
    "pageerrors": [],
    "responses": [],
    "failed": []
  }
}
```

## 7. Screenshots

- `mobile_index`: `logs\audit_mob_index.png` — PASS
- `mobile_map`: `logs\audit_mob_zemelapis.png` — PASS
- `desktop_reports`: `logs\audit_desk_ataskaitos.png` — PASS
- Text scaling screenshot: `logs\audit_textscale_index.png`

## Detailed findings

### 1. [P1] Clickable target below 40×40px

- Page/URL: `/index.html`
- Category: Accessibility
- What happened: a — Peržiūrėti pagal taškus žemėlapyje → 201.5×15px; a.button.button--secondary — Atverti žemėlapį 120.2×38px; a — Atverti vadovą → 113.6×18px; a — Valdymo pultas (demonstracija) 183.1×19.1px; a — Privatumo politika 104.3×19.1px; a — Slapukų politika 92×19.1px; a — Naudotojo vadovas 113.9×19.1px; a — Žemėlapis 61×19.1px
- Impact: Small touch targets are harder to activate accurately, especially on mobile.
- Recommendation: Increase the interactive hit area to at least 40×40px while preserving visible spacing and label clarity.

### 2. [P1] Layout/text overflow at 150% root font size

- Page/URL: `/index.html`
- Category: Responsive
- What happened: section.panel.map-preview — Interaktyvus žemėlapis Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė. Atverti žemėlapį offsetWidth/clientWidth=436/434, scrollHeight/clientHeight=274/230
- Impact: Users who enlarge text can encounter clipped content or controls that no longer fit their containers.
- Recommendation: Allow text containers and controls to grow, wrap, or reflow at increased text size; avoid fixed heights and widths around content.

### 3. [P1] Horizontal overflow at 390px

- Page/URL: `/pages/ataskaitos.html`
- Category: Responsive
- What happened: document.scrollingElement.scrollWidth=423 exceeds window.innerWidth=390 by 33px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.surface.surface-pad — 2022–2025 · VIEŠOS SUVESTINĖS Pasirinkite metus Nuorodos pateikiamos atsisiuntimo stiliumi, tačiau š… (409px), section#report-view.report-sheet — KMS AMIS · VIEŠOJI ATASKAITA Aplinkos monitoringo metinė ataskaita 2025 2025-01-01 – 2025-12-31 Suve… (409px).
- Impact: Users must pan horizontally to reach or read content on a narrow screen.
- Recommendation: Find the overflowing container/child and make the layout fluid or constrain the offending width at the mobile breakpoint.

### 4. [P1] Horizontal overflow at 390px

- Page/URL: `/pages/gyvoji_gamta.html`
- Category: Responsive
- What happened: document.scrollingElement.scrollWidth=634 exceeds window.innerWidth=390 by 244px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.surface.surface-pad — 7 POTEMĖS · METINIAI PJŪVIAI Augalijos monitoringas Rūšių skaičius ir augalijos padengimo / gausumo … (620px), div.notice — Periodiškumas. Gyvosios gamtos stebėjimai yra sezoniniai ir periodiniai. Trūkstami metai reiškia, ka… (620px).
- Impact: Users must pan horizontally to reach or read content on a narrow screen.
- Recommendation: Find the overflowing container/child and make the layout fluid or constrain the offending width at the mobile breakpoint.

### 5. [P1] Clickable target below 40×40px

- Page/URL: `/pages/oro.html`
- Category: Accessibility
- What happened: a — Valdymo pultas (demonstracija) 183.1×19.1px; a — Privatumo politika 104.3×19.1px; a — Slapukų politika 92×19.1px; a — Naudotojo vadovas 113.9×19.1px; a — Žemėlapis 61×19.1px
- Impact: Small touch targets are harder to activate accurately, especially on mobile.
- Recommendation: Increase the interactive hit area to at least 40×40px while preserving visible spacing and label clarity.

### 6. [P1] Horizontal overflow at 390px

- Page/URL: `/pages/oro.html`
- Category: Responsive
- What happened: document.scrollingElement.scrollWidth=634 exceeds window.innerWidth=390 by 244px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.analysis-panel.surface — AUTOMATINIAI IR ISTORINIAI ĮRAŠAI Stotelių duomenų analizė Filtrai taikomi laikotarpiui, mikrorajonu… (620px), div.section-heading — AUTOMATINIAI IR ISTORINIAI ĮRAŠAI Stotelių duomenų analizė Filtrai taikomi laikotarpiui, mikrorajonu… (582px).
- Impact: Users must pan horizontally to reach or read content on a narrow screen.
- Recommendation: Find the overflowing container/child and make the layout fluid or constrain the offending width at the mobile breakpoint.

### 7. [P1] Horizontal overflow at 390px

- Page/URL: `/pages/truksmas.html`
- Category: Responsive
- What happened: document.scrollingElement.scrollWidth=634 exceeds window.innerWidth=390 by 244px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.analysis-panel.surface — 7 RODIKLIAI · DBA Triukšmo duomenų analizė Filtruokite pagal laikotarpį, tašką ir parametrą. Paros, … (620px), div.section-heading — 7 RODIKLIAI · DBA Triukšmo duomenų analizė Filtruokite pagal laikotarpį, tašką ir parametrą. Paros, … (582px).
- Impact: Users must pan horizontally to reach or read content on a narrow screen.
- Recommendation: Find the overflowing container/child and make the layout fluid or constrain the offending width at the mobile breakpoint.

## Positive findings

- All ten desktop routes completed without console warnings/errors, uncaught exceptions, HTTP ≥400 responses, or failed requests.

## Condensed summary

- [P1] `/index.html` — Clickable target below 40×40px: a — Peržiūrėti pagal taškus žemėlapyje → 201.5×15px; a.button.button--secondary — Atverti žemėlapį 120.2×38px; a — Atverti vadovą → 113.6×18px; a — Valdymo pultas (demonstracija) 183.1×19.1px; a — Privatumo politika 104.3×19.1px; a — Slapukų politika 92×19.1px; a — Naudotojo vadovas 113.9×19.1px; a — Žemėlapis 61×19.1px
- [P1] `/index.html` — Layout/text overflow at 150% root font size: section.panel.map-preview — Interaktyvus žemėlapis Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė. Atverti žemėlapį offsetWidth/clientWidth=436/434, scrollHeight/clientHeight=274/230
- [P1] `/pages/ataskaitos.html` — Horizontal overflow at 390px: document.scrollingElement.scrollWidth=423 exceeds window.innerWidth=390 by 33px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.surface.surface-pad — 2022–2025 · VIEŠOS SUVESTINĖS Pasirinkite metus Nuorodos pateikiamos atsisiuntimo stiliumi, tačiau š… (409px), section#report-view.report-sheet — KMS AMIS · VIEŠOJI ATASKAITA Aplinkos monitoringo metinė ataskaita 2025 2025-01-01 – 2025-12-31 Suve… (409px).
- [P1] `/pages/gyvoji_gamta.html` — Horizontal overflow at 390px: document.scrollingElement.scrollWidth=634 exceeds window.innerWidth=390 by 244px. Widest elements: ul — KMS AMIS Klaipėdos miesto savivaldybės aplinkos monitoringas Monitoringo metinės ataskaitos Automati… (1086px), section.surface.surface-pad — 7 POTEMĖS · METINIAI PJŪVIAI Augalijos monitoringas Rūšių skaičius ir augalijos padengimo / gausumo … (620px), div.notice — Periodiškumas. Gyvosios gamtos stebėjimai yra sezoniniai ir periodiniai. Trūkstami metai reiškia, ka… (620px).
- [P1] `/pages/oro.html` — Clickable target below 40×40px: a — Valdymo pultas (demonstracija) 183.1×19.1px; a — Privatumo politika 104.3×19.1px; a — Slapukų politika 92×19.1px; a — Naudotojo vadovas 113.9×19.1px; a — Žemėlapis 61×19.1px

No fixes were applied. Re-run this audit after any changes to verify the findings.
