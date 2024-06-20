'use server';

import { PrismaRestaurants } from '@api/cesieats';
import { getErrorMessage, patch } from '../utils';
import { redirect } from 'next/navigation';

export const editItem = async (
  _: any,
  data: {
    restaurantId: string;
    itemId: string;
    formData: FormData;
  },
) => {
  const response = await patch<PrismaRestaurants.item>(
    `/restaurants/${data.restaurantId}/items/${data.itemId}`,
    {
      body: data.formData,
    },
    true,
  );
  if (!response.res.ok) {
    return { error: getErrorMessage(response.parsedRes) };
  }
  redirect(`/restaurant`);
};
