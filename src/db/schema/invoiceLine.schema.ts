import * as t from 'drizzle-orm/pg-core';
import { ProductVariantTable } from './productVariants.schema';
import { InvoiceTable } from './invoices.schema';
import { timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';

export const InvoiceLineTable = t.pgTable(
  'invoice_lines',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    productId: t
      .uuid('id')
      .references(() => ProductVariantTable.id, { onDelete: 'set null' })
      .notNull(),
    quantity: t.integer().notNull().default(1),
    priceInCentsSnapshot: t.integer('price_in_cents_snapshot').notNull(),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    invoiceId: t
      .uuid('order_id')
      .references(() => InvoiceTable.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamp,
  },
  (table) => [
    t.check('total_check', sql`${table.totalInCentsSnapshot} > 0`),
    t.check('quantity_check', sql`${table.quantity} > 0`),
  ],
);

export const InvoiceLineTableRelations = relations(
  InvoiceLineTable,
  ({ one }) => ({
    invoice: one(InvoiceTable, {
      fields: [InvoiceLineTable.invoiceId],
      references: [InvoiceTable.id],
    }),
    product: one(ProductVariantTable, {
      fields: [InvoiceLineTable.productId],
      references: [ProductVariantTable.id],
    }),
  }),
);
