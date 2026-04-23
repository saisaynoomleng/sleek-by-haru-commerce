import * as t from 'drizzle-orm/pg-core';
import { timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';
import { InventoryTable } from './inventory.schema';
import { StoreHourTable } from './storeHours.schema';

export const StoreTable = t.pgTable('stores', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  street: t.varchar('street', { length: 255 }).notNull(),
  city: t.varchar('city', { length: 255 }).notNull(),
  state: t.varchar('state', { length: 255 }).notNull(),
  zip: t.varchar('zip', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  country: t.varchar('country', { length: 255 }).notNull(),
  latitude: t.varchar('latitude', { length: 255 }).notNull(),
  longitude: t.varchar('longitude', { length: 255 }).notNull(),
  ...timestamp,
});

export const StoreTableRelations = relations(StoreTable, ({ one, many }) => ({
  inventory: one(InventoryTable),
  storeHours: many(StoreHourTable),
}));
