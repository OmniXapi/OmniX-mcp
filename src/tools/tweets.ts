import { z } from "zod";
import type { ToolDef } from "../types.js";

const tweetId = z
  .string()
  .describe("The numeric tweet ID, e.g. \"1899999999999999999\".");

export const tweetTools: ToolDef[] = [
  // ── Reads ────────────────────────────────────────────────────────────────
  {
    name: "advanced_search_tweets",
    title: "Advanced Search Tweets",
    description:
      "Search tweets with X advanced operators (from:, to:, since:, until:, filter:, exact phrases). Returns a page of tweets plus a next_cursor.",
    method: "GET",
    path: "/tweet/advanced_search",
    annotations: { readOnlyHint: true },
    inputSchema: {
      q: z.string().describe("Search query. Supports X operators, e.g. `from:elonmusk filter:media`."),
      product: z
        .enum(["Latest", "Top"])
        .optional()
        .describe("Result ordering: Latest = recency (default), Top = relevance/engagement."),
      count: z.number().int().positive().optional().describe("Page size (1–100, default 20)."),
      cursor: z.string().optional().describe("Pagination cursor from a previous response's next_cursor."),
    },
  },
  {
    name: "get_tweet_detail",
    title: "Get Tweet Detail",
    description: "Fetch a single tweet with its full author, media, entities and engagement counts.",
    method: "GET",
    path: "/tweet/detail",
    annotations: { readOnlyHint: true },
    inputSchema: { id: tweetId },
  },
  {
    name: "get_tweet_thread",
    title: "Get Tweet Thread",
    description:
      "Fetch the ordered self-thread for a tweet — the root author's reply chain, in order, excluding side replies.",
    method: "GET",
    path: "/tweet/thread",
    annotations: { readOnlyHint: true },
    inputSchema: { id: tweetId },
  },
  {
    name: "get_tweet_replies",
    title: "Get Tweet Replies",
    description: "Fetch the replies to a tweet (the conversation below it), with cursor pagination.",
    method: "GET",
    path: "/tweet/replies",
    annotations: { readOnlyHint: true },
    inputSchema: {
      id: tweetId,
      cursor: z.string().optional().describe("Pagination cursor from a previous response's next_cursor."),
    },
  },
  {
    name: "get_tweet_retweeters",
    title: "Get Tweet Retweeters",
    description: "List the users who reposted (retweeted) a tweet, with cursor pagination.",
    method: "GET",
    path: "/tweet/retweeters",
    annotations: { readOnlyHint: true },
    inputSchema: {
      id: tweetId,
      count: z.number().int().positive().optional().describe("Page size (1–100, default 20)."),
      cursor: z.string().optional().describe("Pagination cursor from a previous response's next_cursor."),
    },
  },

  // ── Writes ───────────────────────────────────────────────────────────────
  {
    name: "create_tweet",
    title: "Create Tweet",
    description:
      "Post a tweet as your X account. Optionally reply, quote, or attach media (pre-uploaded ids, URLs, or inline base64).",
    method: "POST",
    path: "/tweet/create",
    annotations: { openWorldHint: true },
    inputSchema: {
      text: z.string().describe("Tweet text."),
      reply_to_tweet_id: z.string().optional().describe("Tweet ID this tweet replies to."),
      quote_tweet_url: z
        .string()
        .optional()
        .describe("Full URL of the tweet to quote, e.g. https://x.com/user/status/123."),
      quote_tweet_id: z
        .string()
        .optional()
        .describe("Tweet ID to quote (use quote_tweet_url for faster requests)."),
      media_ids: z.array(z.string()).optional().describe("Pre-uploaded media ids (from upload_media)."),
      media_urls: z.array(z.string()).optional().describe("Image/video URLs — fetched and uploaded automatically."),
      media: z
        .array(z.object({ data: z.string(), type: z.string() }))
        .optional()
        .describe("Inline base64 media objects: { data, type } where type is a MIME type."),
    },
  },
  {
    name: "delete_tweet",
    title: "Delete Tweet",
    description: "Permanently delete one of your own tweets. Idempotent; returns 403 if the tweet isn't yours.",
    method: "POST",
    path: "/tweet/delete",
    annotations: { destructiveHint: true, idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
  {
    name: "favorite_tweet",
    title: "Like Tweet",
    description: "Like (favorite) a tweet as your X account. Idempotent.",
    method: "POST",
    path: "/tweet/favorite",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
  {
    name: "unlike_tweet",
    title: "Unlike Tweet",
    description: "Remove your like from a tweet. Idempotent.",
    method: "POST",
    path: "/tweet/unlike",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
  {
    name: "retweet_tweet",
    title: "Retweet",
    description: "Retweet (repost) a tweet as your X account. Idempotent.",
    method: "POST",
    path: "/tweet/retweet",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
  {
    name: "unretweet_tweet",
    title: "Undo Retweet",
    description: "Remove your retweet of a tweet. Idempotent.",
    method: "POST",
    path: "/tweet/unretweet",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
  {
    name: "bookmark_tweet",
    title: "Bookmark Tweet",
    description: "Add a tweet to your bookmarks. Idempotent.",
    method: "POST",
    path: "/tweet/bookmark",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
  {
    name: "unbookmark_tweet",
    title: "Remove Bookmark",
    description: "Remove a tweet from your bookmarks. Idempotent.",
    method: "POST",
    path: "/tweet/unbookmark",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: { tweet_id: tweetId },
  },
];
