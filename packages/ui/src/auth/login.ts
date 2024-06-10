'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Cookies, defaultWebRoutes } from '@repo/ui';
import { post, getErrorMessage } from '../utils/api-requests';
import { PrismaUsers } from '@api/cesieats';

export async function login(_: any, data: Record<string, any>) {
  const { res, parsedRes } = await post<PrismaUsers.User>('http://localhost:7001/auth/login', {
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  setCookies(res, parsedRes);
  redirect(defaultWebRoutes.HOME);
}

const setCookies = (response: Response, content: Record<string, any>) => {
  const setCookieHeader = response.headers.get('Set-Cookie');
  if (!setCookieHeader) return;
  const token = setCookieHeader.split(';')[0].split('=')[1];
  const decodedToken = jwtDecode(token);
  cookies().set({
    name: Cookies.Authentication,
    value: token,
    secure: true,
    httpOnly: true,
    expires: new Date(decodedToken.exp! * 1000),
  });

  cookies().set({
    name: Cookies.User,
    value: JSON.stringify(content),
    secure: true,
    httpOnly: false,
    expires: new Date(decodedToken.exp! * 1000),
  });
};
