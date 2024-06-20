'use server';

import { PrismaRestaurants } from '@api/cesieats';
import { getErrorMessage, post } from '../utils';
import { redirect } from 'next/navigation';

export const createRestaurant = async (_: any, data: FormData) => {
  const response = await post<PrismaRestaurants.restaurant>(
    '/restaurants',
    {
      body: data,
    },
    true,
  );
  if (!response.res.ok) {
    return { error: getErrorMessage(response.parsedRes) };
  }
  redirect(`/restaurant/${response.parsedRes.id}`);
};
