import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { env } from '@/lib/env/server';
import * as schema from './schema/schema';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
const db = drizzle({ client: pool, schema, logger: true });
export default db;
