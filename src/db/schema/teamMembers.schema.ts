import * as t from 'drizzle-orm/pg-core';
import { TeamMemberStatus } from './schema-helper';
import { timestamp } from './schema-helper';

export const TeamMemberTable = t.pgTable('team_members', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  fullName: t.varchar('full_name', { length: 255 }).notNull(),
  role: t.varchar('role', { length: 255 }).notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
  body: t.text('body').notNull(),
  status: TeamMemberStatus('status').notNull().default('active'),
  ...timestamp,
});
