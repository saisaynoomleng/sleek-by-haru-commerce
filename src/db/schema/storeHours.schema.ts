import * as t from 'drizzle-orm/pg-core';
import { StoreTable } from './stores.schema';
import { timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';

export const StoreHourTable = t.pgTable('store_hours', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  storeId: t
    .uuid('store_id')
    .references(() => StoreTable.id, { onDelete: 'cascade' })
    .notNull(),
  dayOfWeek: t.integer('day_of_week').notNull(),
  openTime: t.time('open_time').notNull(),
  closeTime: t.time('close_time').notNull(),
  isClosed: t.boolean('is_closed').notNull().default(false),
  ...timestamp,
});

export const StoreHourTableRelations = relations(StoreHourTable, ({ one }) => ({
  store: one(StoreTable, {
    fields: [StoreHourTable.storeId],
    references: [StoreTable.id],
  }),
}));
