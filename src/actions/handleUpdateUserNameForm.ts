'use server';

import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { PrevFormStateProps } from '@/lib/types';
import { UpdateUserNameSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const handleUpdateUserNameForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'Log in to edit',
      };
    }

    const data = Object.fromEntries(formData.entries());

    const result = UpdateUserNameSchema.safeParse(data);

    if (!result.success) {
      const error = result.error.issues[0];

      return {
        success: false,
        message: error.message,
        field: error.path.join('.'),
      };
    }

    const { firstName, lastName } = result.data;

    await db
      .update(UserTable)
      .set({
        firstName,
        lastName,
      })
      .where(eq(UserTable.clerkUserId, userId));

    return {
      success: true,
      message: 'Name updated!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
