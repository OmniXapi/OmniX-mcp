import { z } from "zod";
import type { ToolDef } from "../types.js";

export const listTools: ToolDef[] = [
  {
    name: "get_list_members",
    title: "Get List Members",
    description: "List the members of a public X List, with cursor pagination.",
    method: "GET",
    path: "/list/members",
    annotations: { readOnlyHint: true },
    inputSchema: {
      listId: z.string().describe("The X List ID."),
      count: z.number().int().positive().optional().describe("Page size (1–100, default 20)."),
      cursor: z.string().optional().describe("Pagination cursor from a previous response's next_cursor."),
    },
  },
];
