'use server';

import { Tags } from '../constants';
import { get, UserContextType } from '../utils';

export const getMe = async () => {
  const response = await get<UserContextType>('/auth/me', {
    next: {
      tags: [Tags.ME],
    },
  });
  if (!response.res.ok) {
    console.error(response.res);
    return;
  }
  return response.parsedRes;
};
