'use server';

import { ContactUsEmailTemplate } from '@/components/email/ContactUsEmailTemplate';
import db from '@/db';
import { ContactTable } from '@/db/schema/contacts.schema';
import { env } from '@/lib/env/server';
import { PrevFormStateProps } from '@/lib/types';
import { ContactFormSchema } from '@/lib/validations';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_ACCESS_TOKEN);

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

    const resendEmail = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: 'Received Inquiry',
      react: ContactUsEmailTemplate(
        fullName,
        'We are happy that you contacted us!',
      ),
    });

    if (resendEmail.error) {
      console.error('Resend Email Error', resendEmail.error.message);
      return {
        success: false,
        message: resendEmail.error.message,
      };
    }

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
