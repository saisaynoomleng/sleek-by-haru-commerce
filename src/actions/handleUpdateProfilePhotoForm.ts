'use server';

import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { PrevFormStateProps } from '@/lib/types';
import { UpdateProfilePhotoSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';

export const handleUpdateProfilePhotoForm = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  try {
    const file = formData.get('file');
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'Log in to edit',
      };
    }

    if (file && file instanceof File && file.size > 0) {
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

      if (file.size > MAX_FILE_SIZE) {
        return {
          success: false,
          message: 'File size exceed 10MB',
        };
      }

      if (!ALLOWED.includes(file.type)) {
        return {
          success: false,
          message: 'Invalid file type',
        };
      }

      const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true,
      });

      const result = UpdateProfilePhotoSchema.safeParse({
        imageUrl: blob.url,
      });

      if (!result.success) {
        return {
          success: false,
          message: result.error.issues[0].message,
        };
      }

      const { imageUrl } = result.data;

      await db
        .update(UserTable)
        .set({
          imageUrl,
        })
        .where(eq(UserTable.clerkUserId, userId));
    }

    return {
      success: true,
      message: 'Profile Picture Updated!',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something Went wrong!',
    };
  }
};
