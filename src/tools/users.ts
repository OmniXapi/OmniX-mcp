import { z } from "zod";
import type { ToolDef } from "../types.js";

const userName = z.string().describe("Screen name (without @).");
const count = z.number().int().positive().optional().describe("Page size (default 20).");
const cursor = z.string().optional().describe("Pagination cursor from a previous response's next_cursor.");
// Endpoints that accept either a screen name or a numeric id.
const userNameOpt = z.string().optional().describe("Screen name (without @). Provide this or userId.");
const userIdOpt = z.string().optional().describe("Numeric user ID. Provide this or userName (faster).");

export const userTools: ToolDef[] = [
  // ── Profiles ─────────────────────────────────────────────────────────────
  {
    name: "get_user_info",
    title: "Get User Info",
    description: "Get an X user's profile: bio, counts, verified status, canDm and more, by screen name.",
    method: "GET",
    path: "/user/info",
    annotations: { readOnlyHint: true },
    inputSchema: { userName },
  },
  {
    name: "get_user_info_by_id",
    title: "Get User Info by ID",
    description: "Get an X user's profile by numeric user ID.",
    method: "GET",
    path: "/user/info_by_id",
    annotations: { readOnlyHint: true },
    inputSchema: { userId: z.string().describe("Numeric X user ID.") },
  },
  {
    name: "get_user_about",
    title: "Get User About",
    description:
      "Get account metadata: creation date, account-based-in country, sign-up platform, verification and username-change history.",
    method: "GET",
    path: "/user/user_about",
    annotations: { readOnlyHint: true },
    inputSchema: { userName },
  },
  {
    name: "search_users",
    title: "Search Users",
    description: "Search for X users by keyword, username or topic.",
    method: "GET",
    path: "/user/search",
    annotations: { readOnlyHint: true },
    inputSchema: { q: z.string().describe("Search query (username, keyword or topic)."), count, cursor },
  },
  {
    name: "get_user_affiliates",
    title: "Get User Affiliates",
    description: "Get the affiliated accounts of a verified X organization.",
    method: "GET",
    path: "/user/affiliates",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: z.string().describe("Username of the organization."), count, cursor },
  },
  {
    name: "check_follow_relationship",
    title: "Check Follow Relationship",
    description:
      "Check the follow/DM/block/mute relationship between two X users (whether source follows target and vice-versa).",
    method: "GET",
    path: "/user/check_follow_relationship",
    annotations: { readOnlyHint: true },
    inputSchema: {
      source_user_name: z.string().describe("Source user's screen name (without @)."),
      target_user_name: z.string().describe("Target user's screen name (without @)."),
    },
  },

  // ── Timelines ────────────────────────────────────────────────────────────
  {
    name: "get_user_tweets",
    title: "Get User Tweets",
    description: "Fetch the tweets posted by a user (excludes replies). Provide userName or userId.",
    method: "GET",
    path: "/user/tweets",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: userNameOpt, userId: userIdOpt, count, cursor },
  },
  {
    name: "get_user_tweets_and_replies",
    title: "Get User Tweets & Replies",
    description: "Fetch the tweets and replies posted by a user.",
    method: "GET",
    path: "/user/tweets_and_replies",
    annotations: { readOnlyHint: true },
    inputSchema: { userName, count, cursor },
  },
  {
    name: "get_user_articles_tweets",
    title: "Get User Articles",
    description: "Fetch a user's published X Articles, as their wrapper tweets. Provide userName or userId.",
    method: "GET",
    path: "/user/articles_tweets",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: userNameOpt, userId: userIdOpt, count, cursor },
  },
  {
    name: "get_user_media",
    title: "Get User Media",
    description: "Fetch tweets containing images and videos from a user. Provide userName or userId.",
    method: "GET",
    path: "/user/media",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: userNameOpt, userId: userIdOpt, count, cursor },
  },
  {
    name: "get_user_mentions",
    title: "Get User Mentions",
    description: "Fetch recent tweets that mention a user, authored by other accounts.",
    method: "GET",
    path: "/user/mentions",
    annotations: { readOnlyHint: true },
    inputSchema: { userName, count, cursor },
  },

  // ── Networks ─────────────────────────────────────────────────────────────
  {
    name: "get_user_followers",
    title: "Get User Followers",
    description: "Get a user's followers, with cursor pagination. Provide userName or userId.",
    method: "GET",
    path: "/user/followers",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: userNameOpt, userId: userIdOpt, count, cursor },
  },
  {
    name: "get_verified_followers",
    title: "Get Verified Followers",
    description: "Get a user's verified (blue check) followers. Provide userName or userId.",
    method: "GET",
    path: "/user/verified_followers",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: userNameOpt, userId: userIdOpt, count, cursor },
  },
  {
    name: "get_user_following",
    title: "Get User Following",
    description: "Get the accounts a user follows, with cursor pagination. Provide userName or userId.",
    method: "GET",
    path: "/user/following",
    annotations: { readOnlyHint: true },
    inputSchema: { userName: userNameOpt, userId: userIdOpt, count, cursor },
  },
  {
    name: "get_followers_you_know",
    title: "Get Followers You Know",
    description:
      "Get a target user's followers that YOUR account also follows (mutual context). Provide user_id or user_name.",
    method: "POST",
    path: "/user/followers_you_know",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: {
      user_id: z.string().optional().describe("Target user ID. Provide this or user_name."),
      user_name: z.string().optional().describe("Target screen name. Provide this or user_id."),
      count,
      cursor,
    },
  },

  // ── Your own account (auth-user) ─────────────────────────────────────────
  {
    name: "get_user_likes",
    title: "Get Your Liked Tweets",
    description: "Fetch the tweets your authenticated account has liked.",
    method: "POST",
    path: "/user/likes",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { count, cursor },
  },
  {
    name: "get_home_timeline",
    title: "Get Home Timeline",
    description: "Fetch your authenticated account's home timeline feed.",
    method: "POST",
    path: "/user/home_timeline",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { count, cursor },
  },
  {
    name: "list_bookmarks",
    title: "List Bookmarks",
    description: "List your authenticated account's bookmarked tweets, newest first.",
    method: "POST",
    path: "/user/bookmarks",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { count, cursor },
  },
  {
    name: "search_bookmarks",
    title: "Search Bookmarks",
    description:
      "Search inside your bookmarks by text or author. Pass next_cursor to keep scanning further pages.",
    method: "POST",
    path: "/user/bookmark_search",
    annotations: { readOnlyHint: true, openWorldHint: true },
    inputSchema: { q: z.string().describe("Query matched against bookmark text and author."), count, cursor },
  },

  // ── Profile actions (writes) ─────────────────────────────────────────────
  {
    name: "update_profile",
    title: "Update Profile",
    description:
      "Update one or more profile fields (name, bio, location, URL, link color, birthdate). Only the fields you pass change.",
    method: "POST",
    path: "/user/update_profile",
    annotations: { openWorldHint: true },
    inputSchema: {
      name: z.string().optional().describe("Display name (cannot be blank)."),
      description: z.string().optional().describe("Bio text."),
      location: z.string().optional().describe("Location text."),
      url: z.string().optional().describe("Website URL shown on the profile."),
      profile_link_color: z.string().optional().describe("Hex color, e.g. 1DA1F2."),
      birthdate_year: z.number().int().optional(),
      birthdate_month: z.number().int().optional(),
      birthdate_day: z.number().int().optional(),
      birthdate_visibility: z
        .string()
        .optional()
        .describe("self, mutualfollow, followers, following, or public."),
    },
  },
  {
    name: "update_avatar",
    title: "Update Avatar",
    description: "Update your profile picture. Provide image_url or image_base64.",
    method: "POST",
    path: "/user/update_avatar",
    annotations: { openWorldHint: true },
    inputSchema: {
      image_url: z.string().optional().describe("Public image URL (use this or image_base64)."),
      image_base64: z.string().optional().describe("Base64 image (optionally a data: URI)."),
    },
  },
  {
    name: "update_banner",
    title: "Update Banner",
    description: "Update your profile banner. Provide image_url or image_base64.",
    method: "POST",
    path: "/user/update_banner",
    annotations: { openWorldHint: true },
    inputSchema: {
      image_url: z.string().optional().describe("Public image URL (use this or image_base64)."),
      image_base64: z.string().optional().describe("Base64 image (optionally a data: URI)."),
    },
  },
  {
    name: "follow_user",
    title: "Follow User",
    description: "Follow a user as your X account. Provide user_id or username. Idempotent.",
    method: "POST",
    path: "/user/follow",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: {
      user_id: z.string().optional().describe("Target user ID. Provide this or username."),
      username: z.string().optional().describe("Target screen name. Provide this or user_id."),
    },
  },
  {
    name: "unfollow_user",
    title: "Unfollow User",
    description: "Unfollow a user as your X account. Provide user_id or username. Idempotent.",
    method: "POST",
    path: "/user/unfollow",
    annotations: { idempotentHint: true, openWorldHint: true },
    inputSchema: {
      user_id: z.string().optional().describe("Target user ID. Provide this or username."),
      username: z.string().optional().describe("Target screen name. Provide this or user_id."),
    },
  },
];
