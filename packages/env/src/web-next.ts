import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const webEnv = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3100"),
    NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4100"),
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default("919876501234"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
