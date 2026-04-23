import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    DATABASE_URL: z.string().startsWith('postgresql://'),
  },
  experimental__runtimeEnv: process.env,
});
