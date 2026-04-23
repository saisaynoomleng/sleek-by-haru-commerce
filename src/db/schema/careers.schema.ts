import * as t from 'drizzle-orm/pg-core';
import { CareerStatus, timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';
import { ApplicationTable } from './applications.schema';

export const CareerTable = t.pgTable('careers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  role: t.varchar('role', { length: 255 }).notNull(),
  body: t.text('body').notNull(),
  status: CareerStatus('status').notNull().default('published'),
  ...timestamp,
});

export const CareerTableRelations = relations(CareerTable, ({ many }) => ({
  applications: many(ApplicationTable),
}));
