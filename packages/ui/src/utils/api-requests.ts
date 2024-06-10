'use server';

import { cookies } from 'next/headers';
import { Cookies } from '../constants';
import { PrismaUsers } from '@api/cesieats';

type ResponseWith<T> = { res: Response; parsedRes: T };

const BASE_URL = 'http://localhost:7000';

async function getUrl(path: string): Promise<string> {
  if (path.startsWith('http')) {
    return path;
  }
  return `${BASE_URL}/${path}`;
}

async function request<T>(path: string, options: RequestInit): Promise<ResponseWith<T>> {
  const res = await fetch(await getUrl(path), options);
  const parsedRes = await res.json();
  return { res, parsedRes };
}

async function getHeaders(withFile: boolean = false): Promise<Headers> {
  const headers = new Headers();
  const authCookie = cookies().get(Cookies.Authentication);
  headers.set('Cookie', `${Cookies.Authentication}=${authCookie?.value}`);
  if (!withFile) {
    headers.set('Content-Type', 'application/json');
  } else {
    headers.set('Content-Type', 'multipart/form-data');
  }
  return headers;
}

export async function get<T>(
  path: string,
  options: Omit<RequestInit, 'headers'>,
): Promise<ResponseWith<T>> {
  return request(path, {
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
  const { body, ...rest } = options;
  return request(path, {
    method: 'PATCH',
    headers: await getHeaders(withFile),
    body: JSON.stringify(body),
    ...rest,
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
