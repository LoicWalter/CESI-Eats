'use server';

import { cookies } from 'next/headers';
import { Cookies } from '../constants';
import { PrismaUsers } from '@api/cesieats';
import { redirect } from 'next/navigation';

type ResponseWith<T> = { res: Response; parsedRes: T };

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getUrl(path: string): Promise<string> {
  if (path.startsWith('http')) {
    return path;
  }
  return `${BASE_URL}${path}`;
}

async function request<T>(path: string, options: RequestInit): Promise<ResponseWith<T>> {
  return fetch(await getUrl(path), options)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const parsedRes = await res.json();
      return { res, parsedRes };
    })
    .catch((error) => {
      console.error(error);
      return { res: new Response(null), parsedRes: { message: error } } as ResponseWith<T>;
    });
}

async function getHeaders(withFile: boolean = false): Promise<Headers> {
  const headers = new Headers();
  const authCookie = cookies().get(Cookies.Authentication);
  headers.set('Cookie', `${Cookies.Authentication}=${authCookie?.value}`);
  headers.set('x-api-key', process.env.NEXT_PUBLIC_API_KEY || '');
  if (!withFile) {
    headers.set('Content-Type', 'application/json');
  }
  return headers;
}

export async function get<T>(
  path: string,
  options: Omit<RequestInit, 'headers'>,
): Promise<ResponseWith<T>> {
  return await request(path, {
    headers: await getHeaders(),
    ...options,
  });
}

export async function post<T>(
  path: string,
  options: Omit<RequestInit, 'headers'>,
  withFile: boolean = false,
): Promise<ResponseWith<T>> {
  return request(path, {
    method: 'POST',
    headers: await getHeaders(withFile),
    ...options,
  });
}

export async function patch<T>(
  path: string,
  options: Omit<RequestInit, 'headers'>,
  withFile: boolean = false,
): Promise<ResponseWith<T>> {
  return request(path, {
    method: 'PATCH',
    headers: await getHeaders(withFile),
    ...options,
  });
}

export async function _delete<T>(
  path: string,
  options: Omit<RequestInit, 'headers'>,
): Promise<ResponseWith<T>> {
  return request(path, {
    method: 'DELETE',
    headers: await getHeaders(),
    ...options,
  });
}

export async function getUserById(id: string): Promise<PrismaUsers.User | undefined> {
  const { res, parsedRes } = await get<
    PrismaUsers.Prisma.UserGetPayload<{
      include: { filleuls: true; parrain: true };
    }>
  >(`/auth/users/${id}`, {});
  if (!res.ok) {
    return undefined;
  }
  return parsedRes;
}

export async function setUserCookie(user: Partial<PrismaUsers.User>) {
  cookies().set({
    name: Cookies.User,
    value: JSON.stringify(user),
    secure: true,
    httpOnly: false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
}

export async function getUserInfosFromCookie(): Promise<
  | Partial<
      PrismaUsers.Prisma.UserGetPayload<{
        include: { filleuls: true };
      }>
    >
  | undefined
> {
  const userCookie = cookies().get(Cookies.User);
  const parsedCookie = JSON.parse(userCookie?.value || '{}');
  if (!parsedCookie.id) {
    return undefined;
  }

  const refreshedUser = await getUserById(parsedCookie.id);
  if (refreshedUser) {
    setUserCookie(refreshedUser);
  }
  return refreshedUser;
}

export async function redirectWithGetParams(path: string, params: Record<string, string>) {
  const url = new URL(await getUrl(path));
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  redirect(url.toString());
}

export async function redirectTo(path: string) {
  console.log('redirecting to', path);
  redirect(path);
}
