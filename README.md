# OmniX MCP — X (Twitter) API for Claude, Cursor & any MCP client

The official **[OmniX](https://omnixapi.com)** MCP server. Give your AI assistant
direct access to the X (Twitter) API — **search tweets, look up users, read
replies and followers, post tweets, send DMs, manage articles, and more** —
through one [Model Context Protocol](https://modelcontextprotocol.io) server.

Unlike read-only Twitter MCP servers, OmniX MCP can **act**: post, reply, like,
retweet, follow, send DMs, and publish articles — not just read. **55 tools** in all.

→ **[Get an API key](https://omnixapi.com/dashboard)** · **[API docs](https://docs.omnixapi.com)** · Flat **$0.001 / call**.

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

Or via the Claude Code CLI:

```bash
claude mcp add omnix \
  -e OMNIX_KEY=omnix_live_... \
  -e X_AUTH_TOKEN=your_x_auth_token \
  -- npx -y omnix-mcp@latest
```

---

## Configuration (env)

| Var | Required | What it does |
|---|---|---|
| `OMNIX_KEY` | ✅ | Your OmniX API key (`omnix_live_...`). Bills usage. Sent as `Authorization: Bearer`. |
| `X_AUTH_TOKEN` | ✅ for X tools | The X account `auth_token` cookie the actions run **as**. Sent as the `x-account-token` header. The two account tools work without it. |
| `X_PROXY` | optional | Outbound proxy for the X traffic (`http://` or `https://`, optionally `user:pass@host:port`). SOCKS not supported. |
| `X_ENCRYPTION_CODE` | optional | Your XChat PIN for encrypted **DM** tools. When set, it's injected server-side so the PIN never enters the model's context. |

Your credentials (`X_AUTH_TOKEN`, `X_PROXY`, `X_ENCRYPTION_CODE`) are **never exposed
to the model** as tool arguments — the server injects them as headers on the calls
that need them.

### Getting your `auth_token`

It's the cookie `x.com` sets after you log in. The easiest way to copy it is the
free **Cookie-Editor** extension, or your browser dev tools:
**Application → Cookies → `https://x.com` → `auth_token`**.
Full guide: [docs.omnixapi.com/authentication](https://docs.omnixapi.com/authentication).

---

## What you can do

> "Find Elon Musk's latest tweets"
> "Search tweets about OpenAI from the last week"
> "Who are @vercel's verified followers?"
> "Post 'shipping 🚀' to my X account"
> "Send a DM to @jack saying hi"

### Tools (55)

| Group | Tools |
|---|---|
| **Tweets** (13) | `advanced_search_tweets`, `get_tweet_detail`, `get_tweet_thread`, `get_tweet_replies`, `get_tweet_retweeters`, `create_tweet`, `delete_tweet`, `favorite_tweet`, `unlike_tweet`, `retweet_tweet`, `unretweet_tweet`, `bookmark_tweet`, `unbookmark_tweet` |
| **Users** (24) | `get_user_info`, `get_user_info_by_id`, `get_user_about`, `search_users`, `get_user_affiliates`, `check_follow_relationship`, `get_user_tweets`, `get_user_tweets_and_replies`, `get_user_articles_tweets`, `get_user_media`, `get_user_mentions`, `get_user_followers`, `get_verified_followers`, `get_user_following`, `get_followers_you_know`, `get_user_likes`, `get_home_timeline`, `list_bookmarks`, `search_bookmarks`, `update_profile`, `update_avatar`, `update_banner`, `follow_user`, `unfollow_user` |
| **Articles** (7) | `get_article`, `create_article`, `update_article`, `list_articles`, `publish_article`, `unpublish_article`, `delete_article` |
| **Lists** (1) | `get_list_members` |
| **Media** (1) | `upload_media` |
| **Direct Messages** (7) | `list_direct_messages`, `get_dm_conversation`, `send_direct_message`, `send_dm_media`, `delete_dm`, `react_dm`, `edit_dm` |
| **Account** (2) | `get_account_info`, `get_payment_history` |

Read tools are marked `readOnlyHint`; `delete_tweet`, `unpublish_article`,
`delete_article` and `delete_dm` are marked `destructiveHint` so clients can gate them.

---

## How billing works

Every tool call is a normal OmniX API call authenticated with your `OMNIX_KEY`,
metered exactly like direct API usage — a flat **$0.001** per successful call. The
two account tools are free. No separate MCP billing. See
[pricing](https://omnixapi.com/pricing).

---

## Develop

```bash
npm install
npm run build      # tsc → dist/
npm start          # run the built server over stdio
```

Tools live in `src/tools/*.ts`, one declarative `ToolDef` per endpoint; `src/register.ts`
turns each into a `registerTool` call and `src/client.ts` forwards it to the API.

OmniX is an independent third-party API for developers and researchers. Not
affiliated with, endorsed by, or sponsored by X Corp.

## License

MIT
