'use server';

import { PrismaOrders } from '@api/cesieats';
import { post } from '../utils';

export const submitOrder = async (
  _: any,
  data: {
    dataOrder: Record<string, any>;
    dataDelivery: Record<string, any>;
  },
) => {
  const response = await post<PrismaOrders.Order>('/orders', {
    body: JSON.stringify(data.dataOrder),
  });
  if (!response.res.ok) {
    console.error(response.res);
    return {
      state: 'error',
    };
  }

  const orderId = response.parsedRes.id;

  const responseDelivery = await post('/deliveries', {
    body: JSON.stringify({
      ...data.dataDelivery,
      orderId,
    }),
  });

  if (!responseDelivery.res.ok) {
    console.error(responseDelivery.res);
    return {
      state: 'error',
    };
  }

  return {
    state: 'success',
  };
};
