'use client';

import { useAuth } from '@clerk/nextjs';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineShopping, AiOutlineUser } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';

const NAV_LINKS = [
  { name: 'Home', url: '/' },
  { name: 'Shop', url: '/shop' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Contact Us', url: '/contact-us' },
  { name: 'Stores', url: '/find-a-store' },
];
const MainNav = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <header className="shadow-sm">
      {/* mobile view */}
      <div className="flex items-center justify-between py-5 md:px-8 max-md:hidden">
        <Link href="/" className="overflow-hidden">
          <Image src="/logo.png" alt="" width={80} height={50} />
        </Link>

        <nav
          role="navigation"
          aria-label="main menu"
          className="flex gap-x-2 items-center"
        >
          {NAV_LINKS.map((link) => (
            <Link
              href={link.url}
              key={link.url}
              className={clsx(
                'hover:text-brand-orange-400',
                link.url === pathname
                  ? 'font-semibold text-brand-orange-600'
                  : 'font-normal text-brand-black-200',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-x-2">
          {isSignedIn ? (
            <Link href="/user">
              <AiOutlineUser />
            </Link>
          ) : (
            <Link href="/sign-in">Sign In</Link>
          )}

          <Link href="/cart">
            <AiOutlineShopping />
          </Link>

          {/* search form */}
        </div>
      </div>

      {/* mobile view */}
      <div className="flex flex-col gap-y-5 md:hidden py-3 px-2">
        <div className="flex justify-between items-center">
          <div className="overflow-hidden">
            <Image src="/logo.png" alt="" width={80} height={50} />
          </div>

          <div className="flex gap-x-2 items-center">
            {isSignedIn ? (
              <Link href="/user">
                <AiOutlineUser />
              </Link>
            ) : (
              <Link href="/sign-in">Sign In</Link>
            )}

            <Link href="/cart">
              <AiOutlineShopping />
            </Link>

            <button
              type="button"
              aria-label="menu toggle button"
              className="cursor-pointer relative z-50"
              onClick={() => setNavOpen((open) => !open)}
            >
              {navOpen ? (
                <span>
                  <IoClose />
                </span>
              ) : (
                <span>
                  <RxHamburgerMenu />
                </span>
              )}
            </button>
          </div>

          <nav
            className={clsx(
              'flex flex-col gap-y-3 items-center justify-center fixed left-[20vw] bg-brand-orange-100 inset-0 z-30 transition-all duration-200 ease-in-out',
              navOpen ? 'translate-x-0' : 'translate-x-full',
            )}
          >
            {NAV_LINKS.map((link) => (
              <Link
                href={link.url}
                key={link.url}
                onClick={() => setNavOpen(false)}
                className={clsx(
                  'hover:text-brand-orange-400',
                  link.url === pathname
                    ? 'font-semibold text-brand-orange-600'
                    : 'font-normal text-brand-black-200',
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
