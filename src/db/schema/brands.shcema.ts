import * as t from 'drizzle-orm/pg-core';
import { timestamp, UtilStatus } from './schema-helper';
import { relations } from 'drizzle-orm';
import { ProductTable } from './products.schema';

export const BrandTable = t.pgTable('brands', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull().unique(),
  imageUrl: t.varchar('image_url', { length: 255 }),
  status: UtilStatus('status').notNull().default('active'),
  ...timestamp,
});

export const BrandTableRelations = relations(BrandTable, ({ many }) => ({
  products: many(ProductTable),
}));
