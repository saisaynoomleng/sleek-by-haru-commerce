import * as t from 'drizzle-orm/pg-core';
import { ProductTable } from './products.schema';
import { ProductSizes, ProductVariantStatus, timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';
import { InvoiceLineTable } from './invoiceLine.schema';
import { InventoryTable } from './inventory.schema';
import { ProductImagesTable } from './productImages.schema';

export const ProductVariantTable = t.pgTable(
  'product_variants',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    size: ProductSizes('size'),
    color: t.varchar('color', { length: 255 }),
    priceOverrideInCents: t.integer('price_override_in_cents'),
    publishedAt: t.timestamp('published_at').notNull(),
    status: ProductVariantStatus('status').notNull().default('draft'),
    ...timestamp,
  },
  (table) => [t.index('product_variants_idx').on(table.productId, table.id)],
);

export const ProductVariantTableRelations = relations(
  ProductVariantTable,
  ({ one, many }) => ({
    product: one(ProductTable, {
      fields: [ProductVariantTable.productId],
      references: [ProductTable.id],
    }),
    images: many(ProductImagesTable),
    invoiceLines: many(InvoiceLineTable),
    inventory: one(InventoryTable),
  }),
);
