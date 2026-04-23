import * as t from 'drizzle-orm/pg-core';
import { CareerTable } from './careers.schema';
import { timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';
import { PreviousEmployerTable } from './previousEmployer.schema';

export const ApplicationTable = t.pgTable('applications', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  careerId: t
    .uuid('career_id')
    .references(() => CareerTable.id, { onDelete: 'cascade' })
    .notNull(),
  firstName: t.varchar('first_name', { length: 255 }).notNull(),
  lastName: t.varchar('last_name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  body: t.text('body').notNull(),
  resumeUrl: t.varchar('resume_url', { length: 255 }).notNull(),
  ...timestamp,
});

export const ApplicationTableRelations = relations(
  ApplicationTable,
  ({ one, many }) => ({
    career: one(CareerTable, {
      fields: [ApplicationTable.careerId],
      references: [CareerTable.id],
    }),
    previousEmployers: many(PreviousEmployerTable),
  }),
);
