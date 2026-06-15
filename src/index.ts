#!/usr/bin/env node
/**
 * OmniX MCP server.
 *
 * A thin stdio MCP server that exposes the OmniX X (Twitter) API as tools for
 * Claude, Cursor, and any MCP client. Each tool forwards to api.omnixapi.com;
 * billing and X-account auth are handled by the API exactly like a direct call.
 *
 * stdio rule: never write to stdout (it carries the JSON-RPC stream). All
 * diagnostics go to stderr via console.error.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OMNIX_KEY } from "./config.js";
import { registerAll } from "./register.js";

if (!OMNIX_KEY) {
  console.error(
    "[omnix-mcp] Missing OMNIX_KEY. Set it in your MCP client config:\n" +
      '  "env": { "OMNIX_KEY": "omnix_live_..." }\n' +
      "Get a key at https://omnixapi.com/dashboard"
  );
  process.exit(1);
}

async function main() {
  const server = new McpServer({ name: "omnix", version: "0.1.0" });
  const count = registerAll(server);
  await server.connect(new StdioServerTransport());
  console.error(`[omnix-mcp] ready — ${count} tools`);
}

main().catch((err) => {
  console.error("[omnix-mcp] fatal:", err);
  process.exit(1);
});
