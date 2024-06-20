'use server';

import { PrismaOrders } from '@api/cesieats';
import { post } from '../utils';

export const createOrderDelivery = async (
  _: any,
  data: {
    dataOrder: {
      restaurant: string;
      items: string[];
      menus: string[];
      price: number;
    };
    dataDelivery: {
      order?: string;
      deliveryAddress: string;
    };
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

  console.log(response.parsedRes);

  const orderId = response.parsedRes.id;
  data.dataDelivery.order = orderId;

  console.log(data.dataDelivery);

  const responseDelivery = await post('/deliveries', {
    body: JSON.stringify({
      ...data.dataDelivery,
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
