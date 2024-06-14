'use server';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  Cookies,
  defaultWebRoutes,
  FormErrors,
  getErrorMessage,
  post,
  setUserCookie,
} from '@repo/ui';
import { PrismaUsers } from '@api/cesieats';

export async function login(
  _currentState: FormErrors,
  data: Record<string, any>,
): Promise<FormErrors> {
  console.log('Logging in:', data);
  const { res, parsedRes } = await post<PrismaUsers.User>('http://localhost:7001/auth/login', {
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  setCookies(res, parsedRes);
  redirect(defaultWebRoutes.HOME);
}

const setCookies = async (response: Response, content: Record<string, any>) => {
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

  await setUserCookie(content);
};
