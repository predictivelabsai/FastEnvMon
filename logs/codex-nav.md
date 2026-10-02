# Task: Fix the header navigation (it currently renders as two misaligned wrapped rows)

Working directory: this repo. The site is the static demo under `demo/` served at http://localhost:8000 (a server is already running on port 8000). No build step — plain HTML/CSS/JS ES modules. Do NOT create a git commit. Print a short markdown summary of what you changed at the end (your final message is the deliverable).

## Problem

The desktop header nav wraps onto two rows and looks broken (see below). Cause: `.main-nav > ul` is `display: flex; flex-wrap: wrap; justify-content: flex-end` and one top-level label is a full sentence: „Klaipėdos miesto savivaldybės aplinkos monitoringas" (`demo/css/theme.css` lines ~150–196; header markup is duplicated inline in every page under `demo/` and `demo/pages/`, each with `<details>` dropdowns).

Requirements:

1. **Single nav row at desktop** (≥ 1024px). Shorten the five top-level labels to short Lithuanian words and move the long full title into the dropdown panel as a group heading:
   - „KMS AMIS" stays.
   - „Klaipėdos miesto savivaldybės aplinkos monitoringas" → „Monitoringas" with the full sentence as the panel's heading above its link list.
   - „Monitoringo metinės ataskaitos" → „Ataskaitos".
   - „Automatinių pranešimų prenumerata" → „Prenumerata".
   - „Interaktyvus žemėlapis" → „Žemėlapis".
   Apply the same shortened labels in the header on EVERY page (index, all pages/*.html, pages/admin/*.html — admin pages may have their own header; only change the public nav if they share it).
   Keep `aria-current="page"` where it is.
2. **Design quality.** Nav items vertically centered on the header's bottom edge in ONE row, right-aligned; hover/current state stays the shore-100 pill. Replace the letter „⌄" caret (`summary::after`) with a proper chevron: a small rotated CSS border (`.chevron` style: 6px border box rotated 45°, top-right borders only) that rotates 180° when the details is open, with `transition: transform`. Nothing else in the visual language changes (fonts, colors, stripe motif, brand lockup all stay).
3. **Dropdown polish.** The `details` panel keeps its current card look, but:
   - add `padding: 10px 12px` top spacing for the group heading style (small caps kicker, `--ink-600`, then a thin `--line` divider),
   - opening one dropdown should not push layout; keep `position: absolute`.
   - Close dropdowns when clicking outside and on Escape: small delegated script in `demo/js/main.js` (create it if missing and make sure every page already loads it or add `<script type="module" src="../js/main.js">` / correct relative path) — document click closes any open `details`, Escape closes the open one and returns focus to its summary. Also set `aria-expanded` on each `summary` in the delegated script (update on toggle).
4. **Mobile unchanged in behavior.** Below 1024px the nav still works as today (scrollable single line) but with the new short labels. Do not add a hamburger.
5. **Verification (do it yourself before finishing):** with Playwright (python, headless chromium; wrap stdout `sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")`) at 1440×900 and 1280×800 confirm on `index.html`, `pages/oro.html`, `pages/zemelapis.html` that the nav occupies exactly one visual row (measure: all top-level `li` top edges within 2px of each other), no page overflow at 390px (scrollWidth ≤ 396), dropdown opens on click and closes on Escape and outside click, and 0 console/page errors on those pages plus `pages/truksmas.html`.

Lithuanian copy rules: keep correct Lithuanian grammar in anything new you write (panel heading: „Klaipėdos miesto savivaldybės aplinkos monitoringas"). Never add AI attribution or comments about AI anywhere.