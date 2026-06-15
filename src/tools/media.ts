import { z } from "zod";
import type { ToolDef } from "../types.js";

export const mediaTools: ToolDef[] = [
  {
    name: "upload_media",
    title: "Upload Media",
    description:
      "Upload an image, GIF or video to X and get a media_id you can attach to create_tweet. Provide either a URL or base64 bytes.",
    method: "POST",
    path: "/media/upload",
    annotations: { openWorldHint: true },
    inputSchema: {
      media_url: z.string().optional().describe("Public URL of the media to upload (use this or media_data)."),
      media_data: z.string().optional().describe("Base64-encoded media bytes (optionally a data: URI)."),
      media_type: z
        .string()
        .optional()
        .describe("MIME type, e.g. image/png or video/mp4. Auto-detected from media_url; required with raw media_data."),
    },
  },
];
