import * as z from 'zod';

export const ContactFormSchema = z.object({
  fullName: z.string().min(1, 'Full name must have at least one character'),
  email: z.email('must be a valid email address'),
  phone: z.string().min(1, 'Phone number must have at least one character'),
  subject: z.string().min(1, 'Subject must have at least one character'),
  message: z
    .string()
    .min(100, 'Message must have at least 100 characters')
    .max(3000, 'Message cannot be over 3000 characters'),
});

export const ClerkPayloadSchema = z.object({
  first_name: z.string().min(1, 'First name must have at least 1 character'),
  last_name: z.string().min(1, 'Last name must have at least 1 character'),
  id: z.string().min(1, 'Clerk ID must have at least 1 charcter'),
  image_url: z.string(),
  email_addresses: z.array(
    z.object({
      email_address: z.string(),
    }),
  ),
});

export const AddressSchema = z.object({
  address1: z.string().min(1, 'Address must have at least one character'),
  address2: z.string().nullable().optional(),
  zip: z.string().min(1, 'zip code must have at least one character'),
  city: z.string().min(1, 'city must have at least one character'),
  country: z.string().min(1, 'country must have at least one character'),
  state: z.string().min(1, 'state must have at least one character'),
  isDefault: z.preprocess((val) => val === 'true', z.boolean()),
  type: z.enum(['billing', 'shipping', 'both']).default('billing'),
});

export type UserAddress = z.infer<typeof AddressSchema>;

export const UpdateUserNameSchema = z.object({
  firstName: z.string().min(1, 'First name must have at least 1 character'),
  lastName: z.string().min(1, 'Last name must have at least 1 character'),
});
