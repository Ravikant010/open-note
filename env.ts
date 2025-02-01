import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Define Zod schema for environment variables
const serverSchema = z.object({
  API_URL: z.string().url(),
  DB_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),

  SESSION_SECRET: z.string().min(1),
});

const clientSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_AUTH_PROVIDER: z.string().min(1),
});

const runtimeEnvSchema = z.object({
  API_URL: z.string().url(),
  DB_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  SESSION_SECRET: z.string().min(1),

  NEXT_RUNTIME: z.string().min(1),
  NEXT_PUBLIC_VERCEL_URL: z.string().url(),
  // NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_BUILD_ID: z.string().min(1),
});

// Mapping the Zod schemas to the expected types
export const env = createEnv({
  server: serverSchema.shape,
  client: clientSchema.shape,
  runtimeEnv: {
    DB_URL: process.env.DATABASE_URL,
    API_URL: process.env.API_URL || "http://localhost:3000",
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    NEXT_PUBLIC_AUTH_PROVIDER: process.env.NEXT_PUBLIC_AUTH_PROVIDER || "http://localhost:3000",

    // NEXT_PUBLIC_BUILD_ID: process.env.NEXT_PUBLIC_BUILD_ID,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    // NODE_ENV: runtimeEnvSchema.shape.NODE_ENV.default("development"),
  },
});
