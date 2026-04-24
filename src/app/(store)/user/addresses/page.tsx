import AddressCard from '@/components/shared/AddressCard';
import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';
import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

const UserAddresses = async () => {
  const { isAuthenticated, userId, redirectToSignIn } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkUserId, userId),
    with: {
      addresses: true,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <Bounded isPadded>
      <SectionTitle>Addresses</SectionTitle>

      {user.addresses.map((address) => (
        <AddressCard key={address.id} {...address} />
      ))}

      <Button variant="link" asChild className="self-end">
        <Link href="/user/manage-addresses">Add New Addresses</Link>
      </Button>
    </Bounded>
  );
};

export default UserAddresses;
