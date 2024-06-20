'use server';

import { revalidateTag } from 'next/cache';
import {
  COMMANDE_ACCEPTEE,
  COMMANDE_PASSEE,
  PREPARATION_EN_COURS,
  COMMANDE_PRETE,
  LIVRAISON_ACCEPTEE,
  LIVREUR_EN_ROUTE_VERS_RESTAURANT,
  COMMANDE_RECUPEREE,
  LIVREUR_EN_ROUTE_VERS_CLIENT,
  COMMANDE_LIVREE,
  Tags,
} from '../constants';
import { getErrorMessage, patch } from '../utils';

export const restaurantAcceptOrder = async () => {
  //COMMANDE_PASSEE -> COMMANDE_ACCEPTEE
  return;
};

export const restaurantPrepareOrder = async () => {
  //COMMANDE_ACCEPTEE -> PREPARATION_EN_COURS
  return;
};

export const restaurantOrderReady = async () => {
  //PREPARATION_EN_COURS -> COMMANDE_PRETE
  return;
};

export const deliveryAcceptOrder = async () => {
  //COMMANDE_PRETE -> LIVRAISON_ACCEPTEE
  return;
};

export const deliveryPickUpOrder = async () => {
  //LIVRAISON_ACCEPTEE -> COMMANDE_RECUPEREE
  return;
};

export const deliveryDeliverOrder = async () => {
  //COMMANDE_RECUPEREE -> COMMANDE_LIVREE
  return;
};

export const editOrderStatus = async (status: string, restaurantId: string, orderId: string) => {
  const response = await patch(`/restaurants/${restaurantId}/orders/${orderId}`, {
    body: JSON.stringify({ status }),
  });
  if (!response.res.ok) {
    return { error: getErrorMessage(response.parsedRes) };
  }
  revalidateTag(Tags.RESTO_COMMANDS);
  return;
};

export const editDeliveryStatus = async (status: string, deliveryId: string) => {
  const response = await patch(`/deliveries/${deliveryId}`, {
    body: JSON.stringify({ status }),
  });
  if (!response.res.ok) {
    return { error: getErrorMessage(response.parsedRes) };
  }
  revalidateTag(Tags.RESTO_COMMANDS);
  return;
};
