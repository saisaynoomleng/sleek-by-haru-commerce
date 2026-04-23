import * as t from 'drizzle-orm/pg-core';
import { timestamp } from './schema-helper';

export const NewsletterTable = t.pgTable('newsletter', {
  id: t.uuid('id').primaryKey().notNull(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  ...timestamp,
});
