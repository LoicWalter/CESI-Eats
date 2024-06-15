'use server';
import { redirect } from 'next/navigation';
import { defaultWebRoutes, Tags } from '../constants';
import { getErrorMessage, _delete } from '@repo/ui';
import { PrismaUsers } from '@api/cesieats';
import { revalidateTag } from 'next/cache';

export async function deleteUser() {
  const { res, parsedRes } = await _delete<PrismaUsers.User>(`/auth/users/`, {});
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  console.log('User deleted:', parsedRes);
  redirect(defaultWebRoutes.LOGOUT);
}

export async function deleteUserAsAdmin(id: string) {
  console.log('deleteUserAsAdmin', id);
  const { res, parsedRes } = await _delete<PrismaUsers.User>(`/auth/users/${id}`, {});
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  revalidateTag(Tags.USERS);
}
