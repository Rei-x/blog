// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONTENT_API_KEY: z.string().min(1),
    API_URL: z.string().url(),
  },

  runtimeEnv: {
    CONTENT_API_KEY: process.env.CONTENT_API_KEY,
    API_URL: process.env.API_URL,
  },
});
