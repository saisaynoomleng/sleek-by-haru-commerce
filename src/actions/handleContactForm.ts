'use server';

import db from '@/db';
import { ContactTable } from '@/db/schema/contacts.schema';
import { PrevFormStateProps } from '@/lib/types';
import { ContactFormSchema } from '@/lib/validations';

export const handleContactForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const rawData = Object.fromEntries(formData.entries());

    const result = ContactFormSchema.safeParse(rawData);

    if (!result.success) {
      const error = result.error.issues[0];

      return {
        success: false,
        message: error.message,
        field: error.path.join('.'),
      };
    }

    const { fullName, email, phone, subject, message } = result.data;

    await db.insert(ContactTable).values({
      fullName,
      email,
      phone,
      subject,
      message,
      status: 'new',
    });

    return {
      success: true,
      message: 'Thank you for contacting us!',
    };
  } catch (e) {
    console.error('Error', e);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
