import * as t from 'drizzle-orm/pg-core';
import { timestamp, UserStatus } from './schema-helper';
import { relations } from 'drizzle-orm';
import { AddressTable } from './addresses.schema';
import { ReviewTable } from './reviews.schema';
import { InvoiceTable } from './invoices.schema';

export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    firstName: t.varchar('first_name', { length: 255 }).notNull(),
    lastName: t.varchar('last_name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    status: UserStatus('status').notNull().default('user'),
    isDeleted: t.boolean('is_deleted').notNull().default(false),
    ...timestamp,
  },
  (table) => [t.uniqueIndex('user_clerk_idx').on(table.id, table.clerkUserId)],
);

export const UserTableRelations = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  reviews: many(ReviewTable),
  invoices: many(InvoiceTable),
}));
