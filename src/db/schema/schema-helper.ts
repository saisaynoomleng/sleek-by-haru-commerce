import * as t from 'drizzle-orm/pg-core';

export const timestamp = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const UserStatus = t.pgEnum('UserStatus', ['admin', 'user']);

export const AddressType = t.pgEnum('AddressType', [
  'billing',
  'shipping',
  'both',
]);

export const TeamMemberStatus = t.pgEnum('TeamMemberStatus', [
  'active',
  'left',
]);

export const ProductVariantStatus = t.pgEnum('ProductVariantStatus', [
  'draft',
  'published',
  'out of stock',
]);

export const ImageResourceType = t.pgEnum('ImageResourceType', [
  'product',
  'review',
]);

export const UtilStatus = t.pgEnum('UtilStatus', ['active', 'deleted']);

export const InvoiceStatus = t.pgEnum('InvoiceStatus', [
  'pending',
  'cancelled',
  'confirmed',
]);

export const ContactStatus = t.pgEnum('ContactStatus', ['new', 'replied']);

export const ProductSizes = t.pgEnum('ProductSize', [
  '30ml',
  '50ml',
  '70ml',
  '100ml',
  '150ml',
  '200ml',
]);

export const CareerStatus = t.pgEnum('CareerStatus', [
  'published',
  'no longer available',
]);

export const ApplicationStatus = t.pgEnum('ApplicationStatus', [
  'new',
  'rejected',
  'accepted',
]);
