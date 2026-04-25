import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { env } from '@/lib/env/server';
import * as schema from './schema/schema';

neonConfig.webSocketConstructor = ws;

const globalForDb = globalThis as unknown as {
  pool: Pool | undefined;
};

const pool =
  globalForDb.pool ??
  new Pool({
    connectionString: env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

const db = drizzle(pool, {
  schema,
  logger: process.env.NODE_ENV === 'development',
});

export default db;
