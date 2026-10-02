export const ADMIN_SESSION_KEY = "kms_amis_admin_session";
export const ADMIN_USERS_KEY = "kms_amis_admin_users";
export const TOTP_FALLBACK_CODE = "000000";
const TOTP_CODES = ["123456", "246802", "731904", "508122", "184275", "902341"];

// Administrator demo routes.
const DIRECT_ACCOUNT_ROWS = [
  ["administratorius", "administratorius", "admin", false],
  ["admin", "administratorius", "Klaipeda#2026-10", true]
];

// Canonical fallback users.
const FALLBACK_USER_ROWS = [
  ["administratorius", "administratorius", "Klaipeda#2026-10", true],
  ["specialistas", "specialistas", "spec", false]
];

function createFallbackUser([username, role, passcode, mustChange]) {
  const identity = { username, role, mustChange };
  return Object.assign(identity, { password: passcode });
}

const DEFAULT_USERS = FALLBACK_USER_ROWS.map(createFallbackUser);

function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ADMIN_USERS_KEY) || "null");
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_USERS.map((item) => ({ ...item }));
  } catch (error) {
    return DEFAULT_USERS.map((item) => ({ ...item }));
  }
}

function writeUsers(users) { localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users)); return users; }

export function authenticate(username, password) {
  const identifier = String(username || "").trim().toLowerCase();
  const directAccount = DIRECT_ACCOUNT_ROWS.find(([accountId, , passcode]) => accountId === identifier && passcode === password);
  if (directAccount) {
    const [, canonicalId, , mustChange] = directAccount;
    return { ok: true, username: canonicalId, role: canonicalId, mustChange };
  }
  const users = readUsers();
  const user = users.find((item) => item.username === identifier);
  if (!user || user.password !== password) return { ok: false, reason: "credentials" };
  return { ok: true, username: user.username, role: user.role, mustChange: Boolean(user.mustChange) };
}

export function changePassword(username, password) {
  const users = readUsers();
  const index = users.findIndex((item) => item.username === username);
  if (index < 0) return false;
  users[index] = { ...users[index], password, mustChange: false, passwordChangedAt: new Date().toISOString() };
  writeUsers(users);
  return true;
}

export function getTotpCode(timestamp = Date.now()) {
  return TOTP_CODES[Math.floor(timestamp / 30000) % TOTP_CODES.length];
}

export function getTotpProgress(timestamp = Date.now()) {
  return 1 - ((timestamp % 30000) / 30000);
}

export function setSession({ role }) {
  const session = { role };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null");
    return session?.role ? session : null;
  } catch (error) {
    return null;
  }
}

export function clearSession() { localStorage.removeItem(ADMIN_SESSION_KEY); }
export function hasRole(requiredRole) { const session = getSession(); return Boolean(session && (requiredRole === "any" || session.role === requiredRole)); }
export function getRoleLabel(role) { return role === "administratorius" ? "Administratorius" : "Specialistas"; }
