'use server';

import { PrismaRestaurants } from '@api/cesieats';
import { getErrorMessage, post } from '../utils';
import { redirect } from 'next/navigation';

export const createMenu = async (
  _: any,
  data: {
    restaurantId: string;
    formData: FormData;
  },
) => {
  const response = await post<PrismaRestaurants.item>(
    `/restaurants/${data.restaurantId}/menus`,
    {
      body: data.formData,
    },
    true,
  );
  if (!response.res.ok) {
    return { error: getErrorMessage(response.parsedRes) };
  }
  redirect(`/restaurant/${data.restaurantId}`);
};
