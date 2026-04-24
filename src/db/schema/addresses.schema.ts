import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { AddressType, timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';
import { InvoiceTable } from './invoices.schema';

export const AddressTable = t.pgTable(
  'addresses',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    address1: t.varchar('address_1', { length: 255 }).notNull(),
    address2: t.varchar('address_2', { length: 255 }),
    city: t.varchar('city', { length: 255 }).notNull(),
    zip: t.varchar('zip', { length: 255 }).notNull(),
    state: t.varchar('state', { length: 255 }).notNull(),
    country: t.varchar('country', { length: 255 }).notNull(),
    isDefault: t.boolean('is_default').notNull().default(false),
    type: AddressType('type').notNull(),
    ...timestamp,
  },
  (table) => [
    t.index('user_address_idx').on(table.userId, table.id),
    t
      .uniqueIndex('one_default_address_per_user')
      .on(table.userId)
      .where(sql`${table.isDefault} IS TRUE`),
  ],
);

export const AddressTableRelations = relations(
  AddressTable,
  ({ one, many }) => ({
    user: one(UserTable, {
      fields: [AddressTable.userId],
      references: [UserTable.id],
    }),
    invoices: many(InvoiceTable),
  }),
);
