'use server';

import { PrismaRestaurants } from '@api/cesieats';
import { getErrorMessage, patch } from '../utils';
import { redirect } from 'next/navigation';

export const editMenu = async (
  _: any,
  data: {
    restaurantId: string;
    menuId: string;
    formData: FormData;
  },
) => {
  const response = await patch<PrismaRestaurants.item>(
    `/${data.restaurantId}/menus/${data.menuId}`,
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
