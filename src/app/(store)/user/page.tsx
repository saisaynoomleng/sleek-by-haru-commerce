import Bounded from '@/components/shared/Bounded';
import SectionTitle from '@/components/shared/SectionTitle';
import { Button } from '@/components/ui/button';

import db from '@/db';
import { UserTable } from '@/db/schema/users.schema';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';

const UserPage = async () => {
  const { isAuthenticated, redirectToSignIn, userId } = await auth();

  if (!isAuthenticated) return redirectToSignIn();

  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkUserId, userId),
    with: {
      addresses: true,
      invoices: true,
    },
  });

  return (
    user && (
      <Bounded isPadded>
        <div className="grid grid-cols-[auto_1fr] gap-x-5">
          <div className="overflow-hidden">
            <Image
              src={user.imageUrl || 'https://placehold.co/400'}
              alt={`${user.firstName}'s profile photo` || ''}
              aria-label="user profile photo"
              width={100}
              height={100}
              loading="lazy"
              className="rounded-full"
            />
          </div>

          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex justify-between items-center">
              <p className="font-medium">First Name</p>
              <p>{user.firstName}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium">Last Name</p>
              <p>{user.lastName}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium">Email</p>
              <p>{user.email}</p>
            </div>

            <Button variant="link" asChild className="self-end">
              <Link href="/user/update-personal-info">
                Update Personal Info
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-5 md:space-y-8 bg-brand-orange-100/50 p-2">
          <SectionTitle className="text-fs-500!">Default Address</SectionTitle>

          {user.addresses.length ? (
            <div className="flex flex-col gap-y-3 w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium">Address 1</p>
                <p>{user.addresses[0].address1}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Address 2</p>
                <p>{user.addresses[0].address2}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">City</p>
                <p>{user.addresses[0].city}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Zip/Postal</p>
                <p>{user.addresses[0].zip}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">State</p>
                <p>{user.addresses[0].state}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Country</p>
                <p>{user.addresses[0].country}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Type</p>
                <p>
                  {user.addresses[0].type === 'both'
                    ? 'Billing, Shipping'
                    : user.addresses[0].type}
                </p>
              </div>

              <Button variant="link" asChild className="self-end">
                <Link href="/user/manage-addresses">Add new Address</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center h-40 rounded-2xl">
              <p className="text-fs-500 font-medium text-brand-black-100/50 text-center">
                No Addresses set up
              </p>

              <Button variant="link" asChild className="self-end">
                <Link href="/user/manage-addresses">Add New Addresses</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-5 md:space-y-8 bg-brand-orange-100/50 p-2">
          <SectionTitle className="text-fs-500!">Latest Order</SectionTitle>

          {user.invoices.length ? (
            <div className="flex flex-col gap-y-3 w-full">
              <div className="flex justify-between items-center">
                <p className="font-medium">Address 1</p>
                <p>{user.addresses[0].address1}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Last Name</p>
                <p>{user.lastName}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-medium">Email</p>
                <p>{user.email}</p>
              </div>

              <Button variant="link" asChild className="self-end">
                <Link href="/user/update-personal-info">
                  Update Personal Info
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center h-40 rounded-2xl">
              <p className="text-fs-500 font-medium text-brand-black-100/50 text-center">
                No Orders yet
              </p>

              <Button variant="link" asChild className="self-end">
                <Link href="/shop">Explore</Link>
              </Button>
            </div>
          )}
        </div>
      </Bounded>
    )
  );
};

export default UserPage;
