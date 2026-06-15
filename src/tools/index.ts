import type { ToolDef } from "../types.js";
import { tweetTools } from "./tweets.js";
import { userTools } from "./users.js";
import { articleTools } from "./articles.js";
import { listTools } from "./lists.js";
import { mediaTools } from "./media.js";
import { dmTools } from "./dm.js";
import { accountTools } from "./account.js";

// The full OmniX tool catalog — 55 tools across 7 domains.
export const allTools: ToolDef[] = [
  ...tweetTools, // 13
  ...userTools, // 24
  ...articleTools, // 7
  ...listTools, // 1
  ...mediaTools, // 1
  ...dmTools, // 7
  ...accountTools, // 2
];
