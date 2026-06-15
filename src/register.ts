import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { allTools } from "./tools/index.js";
import { callOmnix } from "./client.js";
import { X_AUTH_TOKEN } from "./config.js";
import type { ToolDef } from "./types.js";

// Friendly message when an X tool is invoked without an account token configured.
function setupError(name: string): CallToolResult {
  return {
    isError: true,
    content: [
      {
        type: "text",
        text:
          `${name} acts on an X account, so it needs that account's auth_token. ` +
          `Set X_AUTH_TOKEN (and optionally X_PROXY) in this MCP server's env config, then retry. ` +
          `See https://docs.omnixapi.com/authentication for how to copy your auth_token.`,
      },
    ],
  };
}

// Register every tool definition as a real MCP tool. Returns the count registered.
export function registerAll(server: McpServer): number {
  for (const def of allTools as ToolDef[]) {
    server.registerTool(
      def.name,
      {
        title: def.title,
        description: def.description,
        inputSchema: def.inputSchema,
        annotations: { title: def.title, ...(def.annotations || {}) },
      },
      async (args: Record<string, unknown>): Promise<CallToolResult> => {
        if (def.requiresXAuth !== false && !X_AUTH_TOKEN) return setupError(def.name);
        try {
          const { ok, text } = await callOmnix(def, args ?? {});
          return { isError: !ok, content: [{ type: "text", text }] };
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          return { isError: true, content: [{ type: "text", text: `Error: ${message}` }] };
        }
      }
    );
  }
  return allTools.length;
}
