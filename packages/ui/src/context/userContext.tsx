'use client';

import React, { createContext, useEffect, useState } from 'react';
import { PrismaUsers } from '@api/cesieats';
import { usePathname } from 'next/navigation';
import { getUserInfosFromCookie } from '../utils/api-requests';

const UserContext = createContext<
  Partial<
    PrismaUsers.Prisma.UserGetPayload<{
      include: { filleuls: true; parrain: true };
    }>
  >
>({});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<
    Partial<
      PrismaUsers.Prisma.UserGetPayload<{
        include: { filleuls: true; parrain: true };
      }>
    >
  >({});

  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserInfosFromCookie();
      if (!user?.id) {
        setUser({});
        return;
      }
      setUser(user);
    };
    getUser();
  }, [pathname]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
