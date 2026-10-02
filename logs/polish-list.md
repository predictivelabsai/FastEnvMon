# KMS AMIS demo — polish list

Collected during phase-1 review; to be applied in the final QA pass.

1. Home AQI card: shows index value "2 INDEKSAS" with the yellow (moderate) band. Index value must match its band (e.g. ~42 for „Vidutinė") — make band and number consistent.
2. Map page heading exposes spec-internal clause tags: „3.6.6–3.6.11 · geoerdvinis atvaizdavimas". Remove clause numbers from user-visible headings; clause mapping belongs in README/evaluator materials only.
3. "KD2,5" → per spec wording "KD 2,5" (space) everywhere, incl. catalog display names.
4. Home noise card subtitle "Paros, vakaro ir nakties rodikliai" → "Dienos, vakaro ir nakties rodikliai" (spec: dienos/vakaro/nakties).
5. Wind direction on home shows "PR · 149°" — add plain-language qualifier, e.g. „iš pietryčių (149°)", or note the convention used.
6. Check remaining new pages for: Lithuanian typo quality, consistent terminology (stotelė vs taškas), consistent „mikrorajonas" spelling, no English leaks in UI.
7. Spec-clause tags appear in user-visible kickers on many phase-2 pages („3.6.1–3.6.3 · aplinkos oro analizė" on oro.html, dirvezemis.html, vanduo.html; „3.10.1.1.2.5 · gyvosios gamtos dalys" on gyvoji_gamta.html; „3.7.2 · 3.7.4 · 3.8.6 · viešojo naudotojo pranešimai" on prenumerata.html; truksmas.html etc.). Remove clause numbers from ALL user-visible section kickers; keep clause mapping only in README/evaluator materials.
8. Nav dropdown in pages/*.html renders permanently expanded (`<details open>` in nav markup) and overlaps content — must be closed by default.
9. Soil/water/wildlife/greenery pages previously used AQ stations (KA-*) as sampling points — fixed via periodic point sets (DT/VT/GS/ZG series) in phase-2b; verify resulting pages show credible point names and data.
10. Check home hero + analysis tab navigation for the same stuck-dropdown pattern as item 8 if any `<details>`/`<summary>` markup is used.