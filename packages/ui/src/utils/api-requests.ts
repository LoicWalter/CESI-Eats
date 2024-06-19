'use server';

import { cookies } from 'next/headers';
import { Cookies } from '../constants';
import { PrismaUsers } from '@api/cesieats';
import { redirect } from 'next/navigation';
import { getErrorMessage } from './errors';

type ResponseWith<T> = { res: Response; parsedRes: T };

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getUrl(path: string): Promise<string> {
  if (path.startsWith('http')) {
    return path;
  }
  return `${BASE_URL}${path}`;
}

async function request<T>(path: string, options: RequestInit): Promise<ResponseWith<T>> {
  const url = await getUrl(path);
  const response = await fetch(url, options);
  const parsedRes = await response.json();
  return { res: response, parsedRes };
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

export async function getPictureUrl<T>(path: string): Promise<ResponseWith<T>> {
  return request(path, {
    method: 'GET',
    headers: await getHeaders(),
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

export async function redirectWithGetParams(path: string, params: Record<string, string>) {
  const url = new URL(await getUrl(path));
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  redirect(url.toString());
}

export async function redirectTo(path: string) {
  redirect(path);
}
