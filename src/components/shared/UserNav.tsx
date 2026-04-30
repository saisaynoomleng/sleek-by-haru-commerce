'use client';

import { usePathname } from 'next/navigation';
import NavLinkButton from './NavLinkButton';
import { SignOutButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

const USER_NAV_LINKS = [
  { name: 'Personal Information', url: '/user' },
  { name: 'Update Info', url: '/user/update-personal-info' },
  { name: 'Order History', url: '/user/purchase-history' },
  { name: 'Addresses', url: '/user/addresses' },
  { name: 'Reset Password', url: '/user/password-manager' },
];

const UserNav = () => {
  const pathname = usePathname();

  return (
    <header className="flex md:flex-col gap-y-2 p-2 max-md:overflow-auto max-md:gap-x-3">
      {USER_NAV_LINKS.map((link) => (
        <NavLinkButton
          key={link.url}
          href={link.url}
          linkName={link.name}
          pathname={pathname}
        />
      ))}
      <SignOutButton>
        <Button className="rounded-sm bg-brand-red-600 hover:bg-brand-red-500">
          Sign Out
        </Button>
      </SignOutButton>
    </header>
  );
};

export default UserNav;
