import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { ClerkPayloadSchema } from '@/lib/validations';
import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);
    const eventType = event.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const { data } = event;

      const result = ClerkPayloadSchema.safeParse(data);

      if (!result.success) {
        return NextResponse.json({ message: 'Invalid Data' }, { status: 422 });
      }

      const { first_name, last_name, email_addresses, image_url, id } =
        result.data;

      await db
        .insert(UserTable)
        .values({
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0].email_address,
          imageUrl: image_url,
          clerkUserId: id,
          status: 'user',
        })
        .onConflictDoUpdate({
          target: UserTable.clerkUserId,
          set: {
            firstName: first_name,
            lastName: last_name,
            email: email_addresses[0].email_address,
            imageUrl: image_url,
            status: 'user',
            updatedAt: new Date(),
          },
        });

      return NextResponse.json({ ok: true });
    }

    if (eventType === 'user.deleted') {
      if (event.data.id) {
        await db
          .update(UserTable)
          .set({
            isDeleted: true,
          })
          .where(eq(UserTable.clerkUserId, event.data.id));
      }

      return NextResponse.json(
        { message: 'User deletion successful' },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error('Webhook verification failed', error);
    return NextResponse.json(
      { message: 'Webhook verification failed' },
      { status: 400 },
    );
  }
}
