'use server';

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
} from '../constants';

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
