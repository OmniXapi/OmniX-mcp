import type { ZodRawShape } from "zod";

/** MCP tool behaviour hints surfaced to clients (for gating write/destructive tools). */
export type ToolAnnotations = {
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
  idempotentHint?: boolean;
  openWorldHint?: boolean;
};

/**
 * One OmniX endpoint, described declaratively. `register.ts` turns each of these
 * into a real `server.registerTool(...)` call; `client.ts` executes it.
 *
 * Note: `auth_token` and `proxy` are intentionally NOT part of `inputSchema` —
 * they're credentials, injected as headers, never seen by the model.
 */
export type ToolDef = {
  /** Tool id exposed to the MCP client (snake_case). */
  name: string;
  /** Short human title shown in tool listings. */
  title: string;
  /** What the tool does — the model reads this to decide when to call it. */
  description: string;
  method: "GET" | "POST";
  /** Path relative to OMNIX_BASE_URL, e.g. "/user/info". */
  path: string;
  /** User-facing input params only (zod raw shape). */
  inputSchema: ZodRawShape;
  annotations?: ToolAnnotations;
  /** Needs the X account auth_token? Default true; the account tools set false. */
  requiresXAuth?: boolean;
  /** DM tools that take an XChat PIN — enables env injection of X_ENCRYPTION_CODE. */
  usesEncryptionCode?: boolean;
};
