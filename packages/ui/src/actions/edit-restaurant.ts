'use server';

import { PrismaRestaurants } from '@api/cesieats';
import { getErrorMessage, patch } from '../utils';
import { redirect } from 'next/navigation';

export const editRestaurant = async (
  _: any,
  data: {
    restaurantId: string;
    formData: FormData;
  },
) => {
  const response = await patch<PrismaRestaurants.restaurant>(
    `/restaurants/${data.restaurantId}`,
    {
      body: data.formData,
    },
    true,
  );
  if (!response.res.ok) {
    return { error: getErrorMessage(response.parsedRes) };
  }
  redirect(`/restaurant/${data.restaurantId}/management`);
};
