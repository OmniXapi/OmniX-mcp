import { z } from "zod";
import type { ToolDef } from "../types.js";

const articleId = z.string().describe("The article entity rest_id (from list_articles or create_article).");

export const articleTools: ToolDef[] = [
  {
    name: "get_article",
    title: "Get Article",
    description:
      "Fetch a full X Article's content. Provide `id` (the wrapper tweet ID, public) OR `article_id` (the entity rest_id, owner-only).",
    method: "GET",
    path: "/article/get",
    annotations: { readOnlyHint: true },
    inputSchema: {
      id: z.string().optional().describe("Wrapper tweet ID of the article (public read). Provide id OR article_id."),
      article_id: z
        .string()
        .optional()
        .describe("Article entity rest_id (owner-only read). Provide id OR article_id."),
    },
  },
  {
    name: "create_article",
    title: "Create Article",
    description:
      "Create a long-form X Article in one call: draft → set title + markdown content → optional cover → optional publish. Publishing requires X Premium.",
    method: "POST",
    path: "/article/create",
    annotations: { openWorldHint: true },
    inputSchema: {
      title: z.string().describe("Article title."),
      content: z.string().describe("Article body in Markdown (H1/H2 headings; no code blocks or inline links)."),
      publish: z.boolean().optional().describe("If true, publish immediately; otherwise save as draft (default)."),
      cover_media_id: z.string().optional().describe("Pre-uploaded media id for the cover."),
      cover_image_url: z.string().optional().describe("URL to fetch and upload as the cover."),
      cover_image_base64: z.string().optional().describe("Base64-encoded cover image."),
    },
  },
  {
    name: "update_article",
    title: "Update Article",
    description:
      "Partial-update an article — only the fields you pass change. Published articles are unpublished, edited, then republished automatically.",
    method: "POST",
    path: "/article/update",
    annotations: { openWorldHint: true },
    inputSchema: {
      article_id: articleId,
      title: z.string().optional().describe("New title."),
      content: z.string().optional().describe("New Markdown body (replaces the existing body wholesale)."),
      cover_media_id: z.string().optional().describe("Pre-uploaded media id for a new cover."),
      cover_image_url: z.string().optional().describe("URL to fetch and upload as a new cover."),
      cover_image_base64: z.string().optional().describe("Base64-encoded new cover image."),
    },
  },
  {
    name: "list_articles",
    title: "List Articles",
    description: "Paginated list of your own X Articles (drafts by default, or published).",
    method: "POST",
    path: "/article/list",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      lifecycle: z.enum(["Draft", "Published"]).optional().describe("Which set to list (default Draft)."),
      count: z.number().int().positive().optional().describe("Page size (default 20)."),
      cursor: z.string().optional().describe("Pagination cursor from a previous response's next_cursor."),
    },
  },
  {
    name: "publish_article",
    title: "Publish Article",
    description: "Publish an existing draft article to your timeline. Requires X Premium (403 otherwise).",
    method: "POST",
    path: "/article/publish",
    annotations: { openWorldHint: true },
    inputSchema: { article_id: articleId },
  },
  {
    name: "unpublish_article",
    title: "Unpublish Article",
    description: "Move a published article back to draft and remove its wrapper tweet.",
    method: "POST",
    path: "/article/unpublish",
    annotations: { destructiveHint: true, openWorldHint: true },
    inputSchema: { article_id: articleId },
  },
  {
    name: "delete_article",
    title: "Delete Article",
    description: "Permanently delete an article entity (draft or published).",
    method: "POST",
    path: "/article/delete",
    annotations: { destructiveHint: true, openWorldHint: true },
    inputSchema: { article_id: articleId },
  },
];
