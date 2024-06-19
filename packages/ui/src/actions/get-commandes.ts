'use server';

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
