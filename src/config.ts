/**
 * Config resolved from the MCP client's `env` block (Claude Desktop, Cursor, …).
 *
 * The OmniX API key bills usage; the X-account credentials are the *actor* the
 * call runs as. Credentials are injected into requests as HTTP headers by the
 * client layer — they are never exposed to the model as tool arguments.
 */

// Billing identity. Sent as `Authorization: Bearer` on every call.
export const OMNIX_KEY = process.env.OMNIX_KEY || process.env.OMNIX_API_KEY || "";

// API base. Defaults to production; override for staging/local.
export const OMNIX_BASE_URL = (
  process.env.OMNIX_BASE_URL || "https://api.omnixapi.com/api/v1/twitter"
).replace(/\/+$/, "");

// The X account `auth_token` cookie. Required by every X tool (everything except
// the two free account tools). Injected as the `x-account-token` header.
export const X_AUTH_TOKEN = process.env.X_AUTH_TOKEN || "";

// Optional outbound proxy for the X traffic (http/https only). Injected as `x-proxy`.
export const X_PROXY = process.env.X_PROXY || "";

// Optional XChat PIN for encrypted DM tools. When set, it's injected so the PIN
// never has to transit the model's context; otherwise pass `encryption_code` inline.
export const X_ENCRYPTION_CODE = process.env.X_ENCRYPTION_CODE || "";
