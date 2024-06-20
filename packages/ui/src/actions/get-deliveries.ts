'use server';

import { DeliveriesContextType } from '../context/deliveriesContext';
import { getErrorMessage, get } from '../utils';

export const getDeliveries = async () => {
  const response = await get<DeliveriesContextType[]>('/deliveries?type=all', {});
  if (!response.res.ok) {
    console.error(response.res);
    return getErrorMessage(response.parsedRes);
  }
  return response.parsedRes;
};
