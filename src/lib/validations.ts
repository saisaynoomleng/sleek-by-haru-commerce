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
