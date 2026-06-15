# OmniX MCP — Free X (Twitter) API for Claude, Cursor & any MCP client

[![npm version](https://img.shields.io/npm/v/omnix-mcp.svg)](https://www.npmjs.com/package/omnix-mcp)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Model Context Protocol](https://img.shields.io/badge/MCP-compatible-blue.svg)](https://modelcontextprotocol.io)

The official **[OmniX](https://omnixapi.com)** MCP server — give Claude, Cursor, and any
[Model Context Protocol](https://modelcontextprotocol.io) client **direct access to the
X (Twitter) API**. Search tweets, look up users, read followers and replies, **post
tweets, send DMs, follow users, and publish articles** — all from your AI assistant.

Unlike read-only Twitter MCP servers, OmniX MCP can **act**: post, reply, like, retweet,
bookmark, follow, send DMs, and publish long-form articles — not just read. **55 tools** in all.

> ⚡ **Start free** — [get a free API key](https://omnixapi.com/dashboard) and **free trial credits**.
> No X developer account, no OAuth app, no approval wait. Flat **$0.001 per call** after your free credits.

→ **[Get your free API key](https://omnixapi.com/dashboard)** · **[Docs](https://docs.omnixapi.com)** · **[Pricing](https://omnixapi.com/pricing)**

---

## Why OmniX MCP?

- 🆓 **Free to start** — a free API key and free trial credits, no credit card to try it.
- ✍️ **Read *and* write** — post tweets, send DMs, follow, like, retweet, publish articles.
- 🧩 **Works everywhere** — Claude Desktop, Claude Code, Cursor, Windsurf, and any MCP client.
- 🚀 **No X developer account needed** — use your normal X login (`auth_token` cookie).
- 💸 **Simple pricing** — flat **$0.001** per successful call; account tools are free.
- 🛠️ **55 tools** across tweets, users, articles, lists, media, and direct messages.

---

## Install

Add it to your MCP client config (Claude Desktop, Cursor, Windsurf, …):

```json
{
  "mcpServers": {
    "omnix": {
      "command": "npx",
      "args": ["-y", "omnix-mcp@latest"],
      "env": {
        "OMNIX_KEY": "omnix_live_...",
        "X_AUTH_TOKEN": "your_x_auth_token"
      }
    }
  }
}
```

Or with the Claude Code CLI:

```bash
claude mcp add omnix \
  -e OMNIX_KEY=omnix_live_... \
  -e X_AUTH_TOKEN=your_x_auth_token \
  -- npx -y omnix-mcp@latest
```

Get your **free** `OMNIX_KEY` from the [OmniX dashboard](https://omnixapi.com/dashboard).

---

## Configuration (env)

| Var | Required | What it does |
|---|---|---|
| `OMNIX_KEY` | ✅ | Your OmniX API key (`omnix_live_...`). [Get one free.](https://omnixapi.com/dashboard) Sent as `Authorization: Bearer`. |
| `X_AUTH_TOKEN` | ✅ for X tools | The X account `auth_token` cookie the actions run **as**. Sent as the `x-account-token` header. The two account tools work without it. |
| `X_PROXY` | optional | Outbound proxy for the X traffic (`http://` or `https://`). SOCKS not supported. |
| `X_ENCRYPTION_CODE` | optional | Your XChat PIN for encrypted **DM** tools. When set, it's injected so the PIN never enters the model's context. |

Your credentials are **never exposed to the model** as tool arguments — the server injects
them as headers only on the calls that need them.

### Getting your `auth_token`

It's the cookie `x.com` sets after you log in — copy it with the free **Cookie-Editor**
extension, or from dev tools: **Application → Cookies → `https://x.com` → `auth_token`**.
Full guide: [docs.omnixapi.com/authentication](https://docs.omnixapi.com/authentication).

---

## What you can ask your assistant

> "Find Elon Musk's latest tweets"
> "Search X for posts about OpenAI from the last week"
> "Who are @vercel's verified followers?"
> "Post 'shipping 🚀' to my X account"
> "Send a DM to @jack saying hi"
> "Publish this markdown as an X Article"

## Tools (55)

| Group | Tools |
|---|---|
| **Tweets** (13) | `advanced_search_tweets`, `get_tweet_detail`, `get_tweet_thread`, `get_tweet_replies`, `get_tweet_retweeters`, `create_tweet`, `delete_tweet`, `favorite_tweet`, `unlike_tweet`, `retweet_tweet`, `unretweet_tweet`, `bookmark_tweet`, `unbookmark_tweet` |
| **Users** (24) | `get_user_info`, `get_user_info_by_id`, `get_user_about`, `search_users`, `get_user_affiliates`, `check_follow_relationship`, `get_user_tweets`, `get_user_tweets_and_replies`, `get_user_articles_tweets`, `get_user_media`, `get_user_mentions`, `get_user_followers`, `get_verified_followers`, `get_user_following`, `get_followers_you_know`, `get_user_likes`, `get_home_timeline`, `list_bookmarks`, `search_bookmarks`, `update_profile`, `update_avatar`, `update_banner`, `follow_user`, `unfollow_user` |
| **Articles** (7) | `get_article`, `create_article`, `update_article`, `list_articles`, `publish_article`, `unpublish_article`, `delete_article` |
| **Lists** (1) | `get_list_members` |
| **Media** (1) | `upload_media` |
| **Direct Messages** (7) | `list_direct_messages`, `get_dm_conversation`, `send_direct_message`, `send_dm_media`, `delete_dm`, `react_dm`, `edit_dm` |
| **Account** (2) | `get_account_info`, `get_payment_history` |

Read tools are marked `readOnlyHint`; `delete_tweet`, `unpublish_article`, `delete_article`
and `delete_dm` are marked `destructiveHint` so clients can confirm before running them.

---

## Pricing

- **Free API key + free trial credits** to start — [sign up](https://omnixapi.com/dashboard).
- Flat **$0.001** per successful call (no per-endpoint pricing).
- The two **account** tools (`get_account_info`, `get_payment_history`) are **free**.

See [omnixapi.com/pricing](https://omnixapi.com/pricing).

---

## FAQ

### Is there a free X (Twitter) API?
Yes. OmniX gives you a **free API key and free trial credits** so you can start without a
credit card. After the free credits, it's a flat **$0.001** per successful call.

### How do I use the X / Twitter API inside Claude or Cursor?
Install this MCP server (see [Install](#install)) with your free `OMNIX_KEY`. Your assistant
can then search tweets, read users, post, and send DMs through natural language.

### Do I need an X developer account or API keys from X?
No. You don't need X's official developer program or an OAuth app. You authenticate with your
normal X login cookie (`auth_token`) plus a free OmniX key.

### Can it post tweets and send DMs, or is it read-only?
It can **act** — post tweets, reply, like, retweet, bookmark, follow/unfollow, send and react
to DMs, and publish X Articles — as well as read.

### Which MCP clients are supported?
Any Model Context Protocol client — **Claude Desktop, Claude Code, Cursor, Windsurf**, and more.

### Is this the official X API?
No. OmniX is an independent third-party X (Twitter) API for developers and researchers. It is
not affiliated with, endorsed by, or sponsored by X Corp.

---

## Develop

```bash
npm install
npm run build      # tsc → dist/
npm start          # run the built server over stdio
```

Tools live in `src/tools/*.ts`, one declarative `ToolDef` per endpoint; `src/register.ts`
turns each into a `registerTool` call and `src/client.ts` forwards it to the API.

## Links

- 🌐 **Website:** [omnixapi.com](https://omnixapi.com)
- 📚 **Docs:** [docs.omnixapi.com](https://docs.omnixapi.com)
- 💳 **Pricing:** [omnixapi.com/pricing](https://omnixapi.com/pricing)
- 🔑 **Free API key:** [omnixapi.com/dashboard](https://omnixapi.com/dashboard)

## License

MIT
