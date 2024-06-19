'use server';

import { PrismaUsers } from '@api/cesieats';
import { getErrorMessage, patch } from '../utils';
import { Cookies, defaultWebRoutes, Tags } from '../constants';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export const editUser = async (_: any, data: FormData) => {
  const { res, parsedRes } = await patch<PrismaUsers.User>(
    `/auth/users`,
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

export const editUserDatagrid = async (id: string, data: FormData) => {
  console.log('Editing user:', data);

  const { res, parsedRes } = await patch<PrismaUsers.User>(
    `/auth/users/${id}`,
    {
      body: data,
    },
    true,
  );

  revalidateTag(Tags.USERS);

  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }

  cookies().set({
    name: Cookies.User,
    value: JSON.stringify(parsedRes),
    secure: true,
    httpOnly: false,
  });
};
