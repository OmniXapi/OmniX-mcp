import {
  OMNIX_KEY,
  OMNIX_BASE_URL,
  X_AUTH_TOKEN,
  X_PROXY,
  X_ENCRYPTION_CODE,
} from "./config.js";
import type { ToolDef } from "./types.js";

export type OmnixResult = { ok: boolean; status: number; text: string };

/**
 * Execute one OmniX endpoint.
 *
 * Credentials go in headers (the backend reads `x-account-token` / `x-proxy` on
 * any method), so user params map cleanly to the query string (GET) or JSON body
 * (POST) — exactly as documented at docs.omnixapi.com.
 */
export async function callOmnix(
  def: ToolDef,
  args: Record<string, unknown>
): Promise<OmnixResult> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${OMNIX_KEY}`,
    "Content-Type": "application/json",
  };
  if (def.requiresXAuth !== false && X_AUTH_TOKEN) {
    headers["x-account-token"] = X_AUTH_TOKEN;
  }
  if (X_PROXY) headers["x-proxy"] = X_PROXY;

  // Keep only meaningful params.
  const params: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(args || {})) {
    if (v === undefined || v === null || v === "") continue;
    params[k] = v;
  }
  // For encrypted DM tools, fall back to the env PIN when none was passed inline.
  if (def.usesEncryptionCode && params.encryption_code == null && X_ENCRYPTION_CODE) {
    params.encryption_code = X_ENCRYPTION_CODE;
  }

  let url = `${OMNIX_BASE_URL}${def.path}`;
  let body: string | undefined;

  if (def.method === "GET") {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) qs.set(k, String(v));
    const s = qs.toString();
    if (s) url += `?${s}`;
  } else {
    body = JSON.stringify(params);
  }

  const res = await fetch(url, { method: def.method, headers, body });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}
