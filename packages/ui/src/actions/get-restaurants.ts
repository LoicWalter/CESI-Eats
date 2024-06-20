'use server';

import { getErrorMessage, get, RestaurantsContextType } from '../utils';

export const getRestaurants = async () => {
  const response = await get<RestaurantsContextType[]>('/restaurants', {});
  if (!response.res.ok) {
    console.error(response.res);
    return getErrorMessage(response.parsedRes);
  }
  return response.parsedRes;
};

export const getRestaurant = async (id: string) => {
  const response = await get<RestaurantsContextType>(`/restaurants/${id}/infos`, {});
  if (!response.res.ok) {
    console.error(response.res);
    return getErrorMessage(response.parsedRes);
  }
  return response.parsedRes;
};
