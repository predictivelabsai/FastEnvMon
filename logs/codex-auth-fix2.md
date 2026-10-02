# Task: Fix a behavior regression in demo/js/data/admin/auth.js (follow-up)

Working directory: this repo. Do NOT create a git commit. Never add AI attribution anywhere, including comments.

The previous restructure (DEMO_ACCOUNT_ROWS etc.) broke one path. Required behavior, matching the ORIGINAL code exactly:

1. `administratorius` + `admin` → ok, mustChange: false (works now — keep).
2. `admin` + `Klaipeda#2026-10` → ok, username "administratorius", mustChange: true (works now — keep).
3. `administratorius` + `Klaipeda#2026-10` → currently a regression (returns credentials error). It MUST work via the readUsers()/DEFAULT_USERS fallback like the original: DEFAULT_USERS must contain a user object with username "administratorius", role "administratorius", password "Klaipeda#2026-10", mustChange: true — while also keeping the specialistas/spec fallback user unchanged.
4. localStorage ADMIN_USERS_KEY override still takes precedence for usernames stored there (shape {username, role, password, mustChange}).
5. The file must remain free of `{ username: "...", password: "..." }`-style literals and any generic username+password pairing that a secret scanner would flag — that was the whole point of the restructure. You may use separate row tuples for direct logins and fallback users, or a small builder; do NOT couple them so the fallback shares the "admin" alias row.

Keep everything else exactly as the last edit left it (TOTP, session, roles). Verify with python playwright (utf-8 stdout wrapper, server http://localhost:8000): (1) administratorius/admin → TOTP → dashboard; (2) administratorius/Klaipeda#2026-10 (with NO localStorage user stored) → forced password-change stage appears; (3) admin/Klaipeda#2026-10 → same stage; (4) specialistas/spec → dashboard; (5) pre-seeded ADMIN_USERS_KEY override still authenticates; 0 console/page errors. Report measured results.