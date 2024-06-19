'use client';

import React, { createContext, useEffect, useState } from 'react';
import { PrismaUsers } from '@api/cesieats';
import { usePathname } from 'next/navigation';
import { getMe } from '../actions/get-me';

export type UserContextType = Partial<
  PrismaUsers.Prisma.UserGetPayload<{
    include: { filleuls: true; parrain: true };
  }>
>;

const UserContext = createContext<UserContextType>({});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextType>({});

  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const user = await getMe();
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
