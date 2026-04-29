'use client';

import { useClerk } from '@clerk/nextjs';
import { useEffect } from 'react';

const UserPasswordManager = () => {
  const { signOut } = useClerk();

  useEffect(() => {
    signOut({ redirectUrl: '/forgot-password' });
  }, [signOut]);
};

export default UserPasswordManager;
