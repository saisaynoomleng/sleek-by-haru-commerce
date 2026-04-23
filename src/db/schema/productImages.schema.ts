import * as t from 'drizzle-orm/pg-core';
import { ProductVariantTable } from './productVariants.schema';
import { timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';

export const ProductImagesTable = t.pgTable('product_images', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  variantId: t
    .uuid('variant_id')
    .references(() => ProductVariantTable.id, { onDelete: 'cascade' })
    .notNull(),
  altText: t.varchar('alt_text', { length: 255 }).notNull(),
  imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
  isPrimary: t.boolean('is_primary').notNull().default(false),
  order: t.integer('order').default(0),
  ...timestamp,
});

export const ProductImagesTableRelations = relations(
  ProductImagesTable,
  ({ one }) => ({
    product: one(ProductVariantTable, {
      fields: [ProductImagesTable.variantId],
      references: [ProductVariantTable.id],
    }),
  }),
);
