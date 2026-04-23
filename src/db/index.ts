import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '@/lib/env/server';
import * as schema from './schema/schema';

const sql = neon(env.DATABASE_URL);
const db = drizzle({ client: sql, schema, logger: true });
export default db;
