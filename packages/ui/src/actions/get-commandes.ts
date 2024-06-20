'use server';

import { Tags } from '../constants';
import { CommandeRestaurantContextType } from '../context';
import { CommandeContextType } from '../context/commandesContext';
import { getErrorMessage, get } from '../utils';

export const getCommandes = async () => {
  const response = await get<CommandeContextType[]>('/orders', {});
  if (!response.res.ok) {
    console.error(response.res);
    return getErrorMessage(response.parsedRes);
  }
  return response.parsedRes;
};

export const getCommandesRestaurant = async (id: string) => {
  const response = await get<CommandeRestaurantContextType[]>(`/restaurants/${id}/orders`, {
    next: {
      tags: [Tags.RESTO_COMMANDS],
    },
  });
  if (!response.res.ok) {
    console.error(response.res);
    return getErrorMessage(response.parsedRes);
  }
  return response.parsedRes;
};
