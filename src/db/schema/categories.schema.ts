import * as t from 'drizzle-orm/pg-core';
import { timestamp, UtilStatus } from './schema-helper';
import { relations } from 'drizzle-orm';
import { ProductTable } from './products.schema';

export const CategoryTable = t.pgTable('categories', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
  status: UtilStatus('status').notNull().default('active'),
  ...timestamp,
});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => ({
  products: many(ProductTable),
}));
