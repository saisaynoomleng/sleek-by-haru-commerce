'use server';

import db from '@/db';
import { AddressTable } from '@/db/schema/addresses.schema';
import { UserTable } from '@/db/schema/users.schema';
import { PrevFormStateProps } from '@/lib/types';
import { AddressSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { NeonDbError } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';

export const handleUserAddressForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const { isAuthenticated, redirectToSignIn, userId } = await auth();

    if (!isAuthenticated) return redirectToSignIn();

    const rawData = Object.fromEntries(formData.entries());

    const result = AddressSchema.safeParse(rawData);

    if (!result.success) {
      const error = result.error.issues[0];

      return {
        success: false,
        message: error.message,
        field: error.path.join('.'),
      };
    }

    const { address1, address2, zip, country, city, isDefault, type, state } =
      result.data;

    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.clerkUserId, userId),
      columns: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Something went wrong! user not found',
      };
    }

    await db.transaction(async (tx) => {
      if (isDefault) {
        await tx
          .update(AddressTable)
          .set({ isDefault: false })
          .where(eq(AddressTable.userId, user.id));
      }

      await tx.insert(AddressTable).values({
        userId: user.id,
        address1,
        address2,
        city,
        state,
        country,
        zip,
        isDefault,
        type,
      });
    });

    return {
      success: true,
      message: 'Address Added!',
    };
  } catch (error) {
    if (error instanceof NeonDbError) {
      if (error.code === '23505') {
        return {
          success: false,
          message: 'Default address already exists',
        };
      }
    }

    console.error('not db error', error);
    return {
      success: false,
      message: 'Something went wrong! Try again later!',
    };
  }
};
