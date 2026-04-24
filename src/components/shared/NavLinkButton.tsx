import Link from 'next/link';
import { Button } from '../ui/button';
import { NavLinkButtonProps } from '@/lib/types';
import clsx from 'clsx';

const NavLinkButton = ({
  pathname,
  className,
  href,
  linkName,
}: NavLinkButtonProps) => {
  return (
    <Button className="text-brand-black-200 rounded-sm" asChild>
      <Link
        href={href}
        className={clsx(
          pathname === href
            ? 'bg-brand-teal-300 font-semibold text-brand-white-100'
            : 'bg-brand-white-100',
          className,
        )}
      >
        {linkName}
      </Link>
    </Button>
  );
};

export default NavLinkButton;
