import * as t from 'drizzle-orm/pg-core';
import { BrandTable } from './brands.shcema';
import { CategoryTable } from './categories.schema';
import { timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';
import { ProductVariantTable } from './productVariants.schema';
import { ReviewTable } from './reviews.schema';

export const ProductTable = t.pgTable(
  'products',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    basePriceInCents: t.integer('base_price_in_cents').notNull(),
    body: t.text().notNull(),
    discountInPercent: t.integer('discount_in_percent').notNull().default(0),
    brandId: t
      .uuid('brand_id')
      .references(() => BrandTable.id, { onDelete: 'set null' })
      .notNull(),
    categoryId: t
      .uuid('category_id')
      .references(() => CategoryTable.id, { onDelete: 'set null' })
      .notNull(),
    isFeatured: t.boolean().notNull().default(false),
    ...timestamp,
  },
  (table) => [
    t.check('price_check', sql`${table.basePriceInCents} > 0`),
    t.check('discount_check', sql`${table.discountInPercent} >= 0`),
  ],
);

export const ProductTableRelations = relations(
  ProductTable,
  ({ one, many }) => ({
    variants: many(ProductVariantTable),
    brand: one(BrandTable, {
      fields: [ProductTable.brandId],
      references: [BrandTable.id],
    }),
    category: one(CategoryTable, {
      fields: [ProductTable.categoryId],
      references: [CategoryTable.id],
    }),
    reviews: many(ReviewTable),
  }),
);
