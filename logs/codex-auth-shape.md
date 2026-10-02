# Task: Restructure demo auth account data so secret-scanner rules stop matching

Working directory: this repo. Do NOT create a git commit. Never add AI attribution anywhere, including comments.

Target file: `demo/js/data/admin/auth.js`. GitGuardian flagged it as a "hardcoded Username Password" secret (finding id in their report: `demo/js/data/admin/auth.js`). The accounts are NOT real secrets — they are intentionally public synthetic demo accounts whose values are displayed on the login page fine-print (`demo/pages/admin/login.html`: „Demo paskyros: administratorius / admin · admin / Klaipeda#2026-10 · specialistas / spec"). The goal is ONLY to restructure the declaration so username/password secret-detection heuristics (which match object literals like `{ username: ..., password: ... }` and `username = "..."; password = "..."` pairings) no longer classify it as a credential secret, while behavior and values stay EXACTLY the same.

Constraints:
- Preserve the same three login paths' behavior and every existing value byte-for-byte (administratorius/admin, admin/Klaipeda#2026-10 with mustChange, specialistas/spec), and the `DEFAULT_USERS` fallback semantics for readUsers/writeUsers (localStorage-overrideable users with roles, passwords, mustChange, passwordChangedAt on change).
- Allowed shapes (pick the one you judge least likely to trip a generic username+password detector while staying clean):
  - an ordered array of pair-arrays with a short comment naming the roles, reconstructing user objects in code; e.g. `const PASTATYTI_VARTOTOJAI = [["administratorius", "admin", "administratorius", false], ...]` — but avoid key names `username`/`password` AND avoid `login`/`password` adjacency in comments directly above the literal values; keep comments short, in English, factual, no Lithuanian needed;
  - or a single string constant per account in the form `id:role:pass` split on ":" at runtime.
- Keep `TOTP_CODES` as-is (it is a synthetic one-time-code generator, not a stored secret).
- Do NOT change any other file. Do NOT change demo/pages/admin/login.html fine-print copy (it stays; it is the design's disclosure of demo credentials).

After editing, verify with a python playwright run: login as administratorius/admin (Enter key submit), check TOTP stage appears and completes via the `#totp-code` value, dashboard loads; then log in as admin/Klaipeda#2026-10 expecting the forced password-change stage; then specialistas/spec expecting role especialistas. Also re-run the small check that `localStorage` user override (writeUsers) still works — simulate by pre-setting the ADMIN_USERS_KEY in localStorage before load. stdout wrapped `io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")`, server at http://localhost:8000.

Report: the final shape of the restructured constant, the measured login results, and 0 console errors.