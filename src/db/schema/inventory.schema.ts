import * as t from 'drizzle-orm/pg-core';
import { StoreTable } from './stores.schema';
import { ProductVariantTable } from './productVariants.schema';
import { timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';

export const InventoryTable = t.pgTable(
  'inventories',
  {
    id: t.uuid('id').primaryKey().notNull(),
    storeId: t
      .uuid('store_id')
      .references(() => StoreTable.id, { onDelete: 'cascade' })
      .notNull(),
    variantId: t
      .uuid('variant_id')
      .references(() => ProductVariantTable.id, { onDelete: 'cascade' })
      .notNull(),
    quantity: t.integer('quantity').notNull(),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('store_variant_idx').on(table.storeId, table.variantId),
  ],
);

export const InventoryTableRelations = relations(InventoryTable, ({ one }) => ({
  store: one(StoreTable, {
    fields: [InventoryTable.storeId],
    references: [StoreTable.id],
  }),
  product: one(ProductVariantTable, {
    fields: [InventoryTable.variantId],
    references: [ProductVariantTable.id],
  }),
}));
