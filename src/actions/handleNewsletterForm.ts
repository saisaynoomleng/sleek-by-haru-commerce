'use server';

import { NewsletterEmailTemplate } from '@/components/email/NewsletterEmailTemplate';
import db from '@/db';
import { NewsletterTable } from '@/db/schema/newsletters.schema';
import { env } from '@/lib/env/server';
import { PrevFormStateProps } from '@/lib/types';
import { NewsletterFormSchema } from '@/lib/validations';
import { Resend } from 'resend';

const resend = new Resend(env.RESEND_ACCESS_TOKEN);

export const handleNewsletterForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const data = Object.fromEntries(formData.entries());

    const result = NewsletterFormSchema.safeParse(data);

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
        field: result.error.issues[0].path.join('.'),
      };
    }

    const { email } = result.data;

    const resendEmail = await resend.emails.send({
      from: env.RESEND_EMAIL_FROM,
      to: [email],
      subject: 'Subcription Successful',
      react: NewsletterEmailTemplate(
        email,
        'Sleek By Haru Commerce Subscription!',
      ),
    });

    if (resendEmail.error) {
      console.error('Email Error', resendEmail.error);
      return {
        success: false,
        message: 'Email Error!',
      };
    }

    await db
      .insert(NewsletterTable)
      .values({
        email,
      })
      .onConflictDoNothing({ target: NewsletterTable.email });

    return {
      success: true,
      message: 'Thank you for your subscription!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
};
