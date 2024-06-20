'use server';

import { _delete, getErrorMessage } from '../utils';

export const deleteItem = async (itemId: string, restaurantId: string) => {
  const response = await _delete(`/restaurants/${restaurantId}/items/${itemId}`, {});
  if (!response.res.ok) {
    return getErrorMessage(response.parsedRes);
  }
  return;
};
