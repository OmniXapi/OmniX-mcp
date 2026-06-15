import { z } from "zod";
import type { ToolDef } from "../types.js";

// XChat PIN. Optional on every DM tool because it can be injected from the
// X_ENCRYPTION_CODE env var instead of transiting the model's context.
const encryptionCode = z
  .string()
  .optional()
  .describe(
    "Your XChat PIN (encryption code). Needed for encrypted reads/writes. Can instead be set as X_ENCRYPTION_CODE in env so it never enters the model context."
  );
const conversationId = z.string().describe("Conversation ID from list_direct_messages.");

export const dmTools: ToolDef[] = [
  {
    name: "list_direct_messages",
    title: "List Direct Messages",
    description:
      "List your DM conversations (inbox), newest first. Supply encryption_code to include a decrypted preview of each conversation's latest message; without it you still get metadata and participants.",
    method: "GET",
    path: "/dm/list",
    annotations: { readOnlyHint: true, openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      count: z.number().int().positive().optional().describe("Number of conversations to fetch (default 20, max 50)."),
      cursor_id: z.string().optional().describe("From a previous response's next_cursor.cursor_id."),
      graph_snapshot_id: z
        .string()
        .optional()
        .describe("From a previous response's next_cursor.graph_snapshot_id (paired with cursor_id)."),
      encryption_code: encryptionCode,
    },
  },
  {
    name: "get_dm_conversation",
    title: "Get DM Conversation",
    description:
      "Read and decrypt one XChat conversation's message history, newest first. Requires encryption_code (or X_ENCRYPTION_CODE env). Pass cursor (a seq_id) to page to older messages.",
    method: "POST",
    path: "/dm/conversation",
    annotations: { readOnlyHint: true, openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      conversation_id: conversationId,
      encryption_code: encryptionCode,
      cursor: z.string().optional().describe("A seq_id from a previous response — pages to older messages."),
      count: z.number().int().positive().optional().describe("Messages per page (default 50, max 200)."),
    },
  },
  {
    name: "send_direct_message",
    title: "Send Direct Message",
    description:
      "Send a DM. Target an existing conversation_id, or a user_id to start/reuse a 1-to-1. Pass encryption_code with a conversation_id to send end-to-end encrypted (deletable for everyone); otherwise the reliable legacy path is used.",
    method: "POST",
    path: "/dm/send",
    annotations: { openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      text: z.string().describe("Message text."),
      conversation_id: z.string().optional().describe("Existing conversation ID. Provide this or user_id."),
      user_id: z.string().optional().describe("Recipient numeric user ID (starts/reuses a 1-to-1). Provide this or conversation_id."),
      encryption_code: encryptionCode,
    },
  },
  {
    name: "send_dm_media",
    title: "Send DM Media",
    description:
      "Send an end-to-end encrypted media attachment (image/gif/video/file) into an existing XChat conversation. Requires encryption_code (or X_ENCRYPTION_CODE env).",
    method: "POST",
    path: "/dm/send_media",
    annotations: { openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      conversation_id: conversationId,
      encryption_code: encryptionCode,
      image_url: z.string().optional().describe("Public URL of the media (use this or image_base64)."),
      image_base64: z.string().optional().describe("Base64-encoded media (optionally a data: URI)."),
      text: z.string().optional().describe("Optional caption text."),
      filename: z.string().optional().describe("Optional file name."),
    },
  },
  {
    name: "delete_dm",
    title: "Delete DM",
    description:
      "Delete one or more messages by seq_id (from get_dm_conversation). delete_for_all removes for everyone (your own messages only); otherwise removes from your view. Requires encryption_code.",
    method: "POST",
    path: "/dm/delete",
    annotations: { destructiveHint: true, openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      conversation_id: conversationId,
      encryption_code: encryptionCode,
      seq_ids: z.array(z.string()).describe("One or more message seq_ids to delete."),
      delete_for_all: z.boolean().optional().describe("Remove for everyone (your own XChat-sent messages only)."),
    },
  },
  {
    name: "react_dm",
    title: "React to DM",
    description:
      "Add or remove an emoji reaction on a message, identified by its seq_id (from get_dm_conversation). Requires encryption_code.",
    method: "POST",
    path: "/dm/react",
    annotations: { openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      conversation_id: conversationId,
      encryption_code: encryptionCode,
      seq_id: z.string().describe("The message seq_id to react to."),
      emoji: z.string().describe("The emoji to add (or remove)."),
      remove: z.boolean().optional().describe("If true, remove the reaction instead of adding it."),
    },
  },
  {
    name: "edit_dm",
    title: "Edit DM",
    description:
      "Edit the text of a message you sent, identified by its seq_id (from get_dm_conversation). Requires encryption_code.",
    method: "POST",
    path: "/dm/edit",
    annotations: { openWorldHint: true },
    usesEncryptionCode: true,
    inputSchema: {
      conversation_id: conversationId,
      encryption_code: encryptionCode,
      seq_id: z.string().describe("The message seq_id to edit."),
      text: z.string().describe("The new message text."),
    },
  },
];
