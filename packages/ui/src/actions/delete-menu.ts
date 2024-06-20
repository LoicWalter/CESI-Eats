'use server';

import { _delete, getErrorMessage } from '../utils';

export const deleteMenu = async (menuId: string, restaurantId: string) => {
  const response = await _delete(`/restaurants/${restaurantId}/menus/${menuId}`, {});
  if (!response.res.ok) {
    return getErrorMessage(response.parsedRes);
  }
  return;
};
