'use server';

import { PrismaUsers } from '@api/cesieats';
import { getErrorMessage, patch } from '../utils';
import { Cookies, defaultWebRoutes } from '../constants';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const editUser = async (_: any, data: FormData) => {
  const { res, parsedRes } = await patch<PrismaUsers.User>(
    `auth/users`,
    {
      body: data,
    },
    true,
  );
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  console.log('User edited:', parsedRes);

  cookies().set({
    name: Cookies.User,
    value: JSON.stringify(parsedRes),
    secure: true,
    httpOnly: false,
  });

  redirect(defaultWebRoutes.HOME);
};
