import type { ToolDef } from "../types.js";

// Account tools are free and need only the OmniX API key — no X account token,
// no credits deducted. So requiresXAuth is false.
export const accountTools: ToolDef[] = [
  {
    name: "get_account_info",
    title: "Get Account Info",
    description: "Get your OmniX account details: email, credit balance, credits used and total request count.",
    method: "GET",
    path: "/account/me",
    annotations: { readOnlyHint: true },
    requiresXAuth: false,
    inputSchema: {},
  },
  {
    name: "get_payment_history",
    title: "Get Payment History",
    description: "Get your OmniX payment / top-up history, newest first.",
    method: "GET",
    path: "/account/payments",
    annotations: { readOnlyHint: true },
    requiresXAuth: false,
    inputSchema: {},
  },
];
