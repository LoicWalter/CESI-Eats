'use server';

import { PrismaUsers } from '@api/cesieats';
import { getErrorMessage, patch } from '../utils';
import { defaultWebRoutes, Tags } from '../constants';
import { redirect } from 'next/navigation';
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
  revalidateTag(Tags.ME);
  redirect(defaultWebRoutes.HOME);
};

export const editUserDatagrid = async (id: string, data: FormData) => {
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
};
