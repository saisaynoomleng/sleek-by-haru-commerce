import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { AddressTable } from './addresses.schema';
import { InvoiceStatus, timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';
import { InvoiceLineTable } from './invoiceLine.schema';

export const InvoiceTable = t.pgTable(
  'invoices',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' })
      .notNull(),
    shippingId: t
      .uuid('shipping_id')
      .references(() => AddressTable.id, { onDelete: 'set null' })
      .notNull(),
    stripePaymentIntentId: t
      .varchar('stripe_payment_intent_id', { length: 255 })
      .unique(),
    stripeCheckoutSessionId: t
      .varchar('stripe_checkout_session_id', { length: 255 })
      .unique(),
    subtotalInCentsSnapshot: t.integer('subtotal_in_cents_snapshot').notNull(),
    taxInCentsSnapshot: t.integer('tax_in_cents_snapshot').notNull(),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    trackingNumber: t.varchar('tracking_number', { length: 255 }).notNull(),
    status: InvoiceStatus('status').notNull().default('pending'),
    ...timestamp,
  },
  (table) => [
    t.index('user_invoice_idx').on(table.id, table.userId),
    t.check('total_check', sql`${table.totalInCentsSnapshot} > 0`),
  ],
);

export const InvoiceTableRelations = relations(
  InvoiceTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [InvoiceTable.userId],
      references: [UserTable.id],
    }),
    invoiceLines: many(InvoiceLineTable),
    shippingAddress: one(AddressTable, {
      fields: [InvoiceTable.shippingId],
      references: [AddressTable.id],
    }),
  }),
);
