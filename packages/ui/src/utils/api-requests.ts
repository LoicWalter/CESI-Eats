'use server';

import { cookies } from 'next/headers';
import { Cookies } from '../constants';
import { PrismaUsers } from '@api/cesieats';

type ResponseWith<T> = { res: Response; parsedRes: T };

export class Requester {
  private static readonly BASE_URL = 'http://localhost:7000';

  private static getUrl(path: string): string {
    if (path.startsWith('http')) {
      return path;
    }
    return `${Requester.BASE_URL}/${path}`;
  }

  private static async request<T>(path: string, options: RequestInit): Promise<ResponseWith<T>> {
    const res = await fetch(Requester.getUrl(path), options);
    const parsedRes = await res.json();
    return { res, parsedRes };
  }

  private static getHeaders(withFile: boolean = false): Headers {
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

  static async get<T>(
    path: string,
    options: Omit<RequestInit, 'headers'>,
  ): Promise<ResponseWith<T>> {
    return Requester.request(path, {
      headers: Requester.getHeaders(),
      ...options,
    });
  }

  static async post<T>(
    path: string,
    options: Omit<RequestInit, 'headers'>,
    withFile: boolean = false,
  ): Promise<ResponseWith<T>> {
    return Requester.request(path, {
      method: 'POST',
      headers: Requester.getHeaders(withFile),
      ...options,
    });
  }

  static async patch<T>(
    path: string,
    options: Omit<RequestInit, 'headers'>,
    withFile: boolean = false,
  ): Promise<ResponseWith<T>> {
    const { body, ...rest } = options;
    return Requester.request(path, {
      method: 'PATCH',
      headers: Requester.getHeaders(withFile),
      body: JSON.stringify(body),
      ...rest,
    });
  }

  static async delete<T>(
    path: string,
    options: Omit<RequestInit, 'headers'>,
  ): Promise<ResponseWith<T>> {
    return Requester.request(path, {
      method: 'DELETE',
      headers: Requester.getHeaders(),
      ...options,
    });
  }
}

export const getErrorMessage = (response: any) => {
  if (response.message) {
    if (Array.isArray(response.message)) {
      return formatErrorMessage(response.message[0]);
    }
    return formatErrorMessage(response.message);
  }
  return 'Unknown error occured.';
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};
