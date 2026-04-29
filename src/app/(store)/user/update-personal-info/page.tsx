import UpdateProfilePhotoForm from '@/components/features/UpdateProfilePhotoForm';
import UpdateUserNameForm from '@/components/features/UpdateUserNameForm';
import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

const UpdateUserInfo = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkUserId, userId),
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Bounded isPadded>
      <SectionTitle className="text-center">Update Profile Info</SectionTitle>

      <div className="space-y-2">
        <p className="font-medium">Update Name</p>
        <UpdateUserNameForm />
      </div>

      <div className="divider mx-auto" />

      <div className="space-y-2">
        <p className="font-medium">Update Profile Picture</p>
        <UpdateProfilePhotoForm />
      </div>
    </Bounded>
  );
};

export default UpdateUserInfo;
