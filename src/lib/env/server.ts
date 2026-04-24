import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string().startsWith('postgresql://'),
    SANITY_STUDIO_DATASET: z.string().min(1),
    SANITY_STUDIO_PROJECT_ID: z.string().min(1),
    SANITY_READ_WRITE_TOKEN: z.string().startsWith('sk'),
    CLERK_SECRET_KEY: z.string().startsWith('sk'),
    CLERK_WEBHOOK_SIGNING_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
