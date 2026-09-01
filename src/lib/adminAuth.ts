/*
  Lightweight cookie-based admin auth.

  The session cookie value is an HMAC-SHA256 of a fixed message keyed by the
  admin passcode, so it cannot be forged without knowing the passcode and no
  server-side session store is needed. Uses Web Crypto only, so it runs in both
  the Edge middleware and Node route handlers.
*/

/** Configure via the ADMIN_PASSCODE environment variable; this is the dev default. */
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "adelyn2026";

const SESSION_MESSAGE = "adelyn-admin-session-v1";

export const ADMIN_COOKIE = "admin_session";
/** Session lifetime in seconds (8 hours). */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

async function hmacHex(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(message),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** True when the submitted passcode matches the configured one. */
export function verifyPasscode(input: unknown): boolean {
  return typeof input === "string" && input.length > 0 && input === ADMIN_PASSCODE;
}

/** The expected value of the `admin_session` cookie for an authenticated user. */
export function expectedSessionToken(): Promise<string> {
  return hmacHex(ADMIN_PASSCODE, SESSION_MESSAGE);
}

/** True when the given cookie value is a valid session token. */
export async function isValidSessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  if (!token) return false;
  return token === (await expectedSessionToken());
}
