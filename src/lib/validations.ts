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
  image_url: z.string().startsWith('https://img.clerk.com/'),
  email_addresses: z.array(
    z.object({
      id: z.string(),
      email_address: z.string(),
    }),
  ),
});
