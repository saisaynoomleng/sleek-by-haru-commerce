import * as t from 'drizzle-orm/pg-core';
import { ProductTable } from './products.schema';
import { UserTable } from './users.schema';
import { timestamp, UtilStatus } from './schema-helper';
import { relations } from 'drizzle-orm';

export const ReviewTable = t.pgTable(
  'reviews',
  {
    id: t.uuid('id').defaultRandom().primaryKey(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: t.text('title').notNull(),
    rating: t.integer('rating').notNull(),
    body: t.text('body').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
    status: UtilStatus('status').notNull().default('active'),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_product_review_idx').on(table.userId, table.productId),
  ],
);

export const ReviewTableRelations = relations(ReviewTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ReviewTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [ReviewTable.productId],
    references: [ProductTable.id],
  }),
}));
