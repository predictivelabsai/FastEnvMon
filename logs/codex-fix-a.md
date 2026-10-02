# Task: Fix navigation deep links, simplify the header dropdown, and replace the multi-selects

Working directory: this repo. Static demo under `demo/` (plain HTML/CSS/JS ES modules, no build step) served at http://localhost:8000 (server already running). Do NOT create a git commit. Your final message is the deliverable: a short markdown summary of what changed.

This is batch A of a two-batch final pass. Focus ONLY on the items below. Do not touch chart rendering, page padding, or hero layout (batch B handles those). Lithuanian copy anything new you write; keep correct Lithuanian grammar. Never add AI attribution (no "Co-Authored-By", no "Generated with...") anywhere, including comments.

## 1. Deep links must activate the right tab (currently dead)

The header/footer link `oro.html#laboratoriniai` („Monitoringo (laboratoriniai) duomenys") and the wildlife links `gyvoji_gamta.html#<tema>` (themes: augalija, invazines, pauksciai, varniniai, siksnosparniai, varliagyviai, zuvys) currently do nothing on arrival because the pages' tab scripts never read `location.hash` (note the harden pass renamed panel ids: oro now has `tab-automatic-air`/`tab-laboratory-air` + `panel-*`; gyvoji_gamta has `demo/js/pages/wildlife.js` building tab buttons with `anchorIds[item[0]]` as ids inside `#wildlife-tabs`).

Fix in `demo/js/pages/analysis.js` (oro tabs) and `demo/js/pages/wildlife.js`:
- On module init AND on `hashchange`: read `location.hash` (with leading `#` stripped); map it to a tab button:
  - oro: `laboratoriniai` → the laboratory tab (`tab-laboratory-air`). Unknown/empty hashes → keep default tab.
  - gyvoji_gamta: the hash equals the wildlife tab button ids; unknown → first tab.
- Activate the mapped tab via the existing selectTab logic (same aria-selected/tabindex path), then `scrollIntoView` the tab section (block: start) if the hash pointed at it — respecting `prefers-reduced-motion`.
- Also update `analysis.js` so the two oro tabs keep working with keyboard (already implemented; do not regress).
- Add an invisible anchor `<span id="laboratoriniai"></span>` (aria-hidden) just before the oro tabs section so the hash also has a valid scroll target for `scrollIntoView`/`scroll-margin-top`.

## 2. Header dropdown: only real page links (remove same-page tab switches)

In the „Monitoringas" dropdown in EVERY page header (14 public pages under `demo/` and `demo/pages/`), remove these links — they only change a tab on a page the visitor is already reaching:
- all `gyvoji_gamta.html#augalija`, `#invazines`, `#pauksciai`, `#varniniai`, `#siksnosparniai`, `#varliagyviai`, `#zuvys`
- the `oro.html#laboratoriniai` link

KEEP the six page-level monitoring links with their existing texts and hrefs: `oro.html` („Automatinių stotelių duomenys"), `truksmas.html` („Aplinkos triukšmo monitoringas"), `dirvezemis.html` („Dirvožemio monitoringas"), `vanduo.html` („Paviršinio vandens monitoringas"), `gyvoji_gamta.html` („Gyvosios gamtos monitoringas"), `zeldynai.html` („Želdynų ir želdinių monitoringas"). Keep whatever `nav-group-label` dividers exist (Aplinkos oro / Gyvosios gamtos groups). The dropdown heading (full sentence title) stays. Footer and in-page links (e.g. `#turinys`, skip-link, `#report-view`) are out of scope — leave them. Do not change the other four top-level nav items.

## 3. Replace the raw native multi-selects with a polished checkbox-list component

Every filter uses a raw `select[multiple]` (`select.select-field[multiple]`): oro (stations), truksmas, dirvezemis, vanduo, zeldynai (greenery-sites), gyvoji_gamta (wildlife-sites). Both the users and you agree they look unfinished: OS-drawn grey selection, no padding, `Ctrl/Cmd` hint text.

Create `demo/js/ui/multiselect.js` exporting `initMultiSelects(root = document)` and a small CSS block in `demo/css/theme.css` (`.multiselect` classes). Design target (matches the existing visual language: shore-100 hover, sea-800 accent, 1px --line borders, same radius as .select-field):

- Keep the native `select[multiple]` in the DOM but visually hidden (absolute, 1px clip) so form values and any existing logic still work. The custom list mirrors it.
- Render directly after the select inside its `.field-group`: a bordered rounded container with:
  - a slim toolbar row: left = selected count in the style „5 iš 15 pasirinkta" (fine print, --ink-600), right = two small text buttons „Visi" (select all) / „Valyti" (clear) — min-height 32px, hover shore-100 pill.
  - a scrollable list (max-height 236px, overflow-y auto) of label+checkbox rows: each row `min-height: 40px; padding: 8px 10px; display: flex; gap: 10px; align-items: center;` with the option's text; hover background var(--shore-100); the checkbox is 18px, `accent-color: var(--sea-800)`.
- Behavior: each checkbox row reflects/sets `option.selected`; on any change dispatch a `change` event on the native select so the page's existing listeners handle it; no keyboard trap — checkbox rows are native inputs (fully keyboard accessible).
- Dynamic repopulation: page modules rebuild the options on district/filter changes. Use a MutationObserver on each select (attributes/childList) to re-render the list; keep the checked-state mapping by option value.
- Call `initMultiSelects()` from `demo/js/main.js` (it already loads on every page AFTER the page init modules — verify the load order; if main.js loads before the page populates options, the MutationObserver covers it, but confirm the toolbar count updates when options are repopulated).
- Remove/replace the now-wrong helper texts: „Ctrl / Cmd klavišu pasirinkite kelis taškus." → „Pažymėkite norimus taškus sąraše."

## 4. Self-verification (do this before finishing; headless chromium via python playwright, stdout wrapped in io.TextIOWrapper with encoding utf-8)

At 1440×900 and 390×844:
1. `pages/oro.html#laboratoriniai`: laboratory tab has aria-selected=true and its panel visible; 0 console/page errors.
2. `pages/gyvoji_gamta.html#pauksciai`: the Paukščių tab active and visible.
3. Header dropdown on `pages/oro.html` contains exactly 6 page-level monitoring links and none of the removed tab-switch links; `pages/prenumerata.html` same.
4. `pages/vanduo.html`: checkbox list renders with one row per option; checking/unchecking updates the chart+table (wait for status chip); changing „Mikrorajonas" re-renders the list; „Visi"/„Valyti" work; native select's selected values stay in sync (read via evaluate).
5. Same spot-check on `pages/oro.html` (stations list) and `pages/zeldynai.html`.
6. All 14 public pages: 390px scrollWidth ≤ 396; 0 console/page errors at 1440.
Report the measured results in your final summary.