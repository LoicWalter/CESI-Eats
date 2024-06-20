'use server';

import { cookies } from 'next/headers';
import { Cookies, Tags } from '../constants';
import { get, UserContextType } from '../utils';

export const getMe = async () => {
  const response = await get<UserContextType>('/auth/me', {
    next: {
      tags: [Tags.ME],
    },
  });

  if (!response.parsedRes?.id) {
    cookies().delete(Cookies.User);
  } else {
    setUserCookie(response.parsedRes);
  }

  if (!response.res.ok) {
    console.error(response.res);
    return;
  }

  return response.parsedRes;
};

const setUserCookie = (user: UserContextType) => {
  cookies().set(Cookies.User, JSON.stringify(user), {
    expires: 7 * 24 * 60 * 60,
  });
};
