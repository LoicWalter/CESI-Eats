export const translateStatus = (status: string) => {
  switch (status) {
    case COMMANDE_PASSEE:
      return 'Commande passée';
    case COMMANDE_ACCEPTEE:
      return 'Commande acceptée';
    case PREPARATION_EN_COURS:
      return 'Préparation en cours';
    case COMMANDE_PRETE:
      return 'Commande prête';
    case LIVRAISON_ACCEPTEE:
      return 'Livraison acceptée';
    case LIVREUR_EN_ROUTE_VERS_RESTAURANT:
      return 'Livreur en route vers le restaurant';
    case COMMANDE_RECUPEREE:
      return 'Commande récupérée';
    case LIVREUR_EN_ROUTE_VERS_CLIENT:
      return 'Livreur en route vers le client';
    case COMMANDE_LIVREE:
      return 'Commande livrée';
    default:
      return status;
  }
};

export const COMMANDE_PASSEE = 'COMMANDE_PASSEE';
export const COMMANDE_ACCEPTEE = 'COMMANDE_ACCEPTEE';
export const PREPARATION_EN_COURS = 'PREPARATION_EN_COURS';
export const COMMANDE_PRETE = 'COMMANDE_PRETE';
export const LIVRAISON_ACCEPTEE = 'LIVRAISON_ACCEPTEE';
export const LIVREUR_EN_ROUTE_VERS_RESTAURANT = 'LIVREUR_EN_ROUTE_VERS_RESTAURANT';
export const COMMANDE_RECUPEREE = 'COMMANDE_RECUPEREE';
export const LIVREUR_EN_ROUTE_VERS_CLIENT = 'LIVREUR_EN_ROUTE_VERS_CLIENT';
export const COMMANDE_LIVREE = 'COMMANDE_LIVREE';

export const restaurantSteps = [
  { key: 0, status: COMMANDE_PASSEE, label: 'Vous avez reçu une nouvelle commande' },
  { key: 1, status: COMMANDE_ACCEPTEE, label: 'Vous avez acceptée la commande' },
  {
    key: 2,
    status: PREPARATION_EN_COURS,
    label: 'Vous avez commencé la préparation de la commande',
  },
  { key: 3, status: COMMANDE_PRETE, label: 'La commande est prête' },
];

export const deliverySteps = [
  { key: 0, status: LIVRAISON_ACCEPTEE, label: 'Votre commande a été acceptée' },
  {
    key: 1,
    status: LIVREUR_EN_ROUTE_VERS_RESTAURANT,
    label: 'Le livreur est en route vers le restaurant',
  },
  { key: 2, status: COMMANDE_RECUPEREE, label: 'Vous avez récupéré la commande' },
  {
    key: 3,
    status: LIVREUR_EN_ROUTE_VERS_CLIENT,
    label: 'Le livreur est en route vers vous',
  },
  { key: 4, status: COMMANDE_LIVREE, label: 'La commande a été livrée' },
];

export const userSteps = [
  { key: 0, status: [COMMANDE_PASSEE], label: 'Votre commande a été passée' },
  { key: 1, status: [COMMANDE_ACCEPTEE], label: 'Votre commande a été acceptée' },
  {
    key: 2,
    status: [PREPARATION_EN_COURS],
    label: 'Votre commande est en préparation',
  },
  {
    key: 3,
    status: [COMMANDE_PRETE, LIVREUR_EN_ROUTE_VERS_RESTAURANT],
    label: 'Votre commande est prête',
  },
  {
    key: 4,
    status: [COMMANDE_RECUPEREE, LIVREUR_EN_ROUTE_VERS_CLIENT],
    label: 'Le livreur est en route',
  },

  { key: 5, status: [COMMANDE_LIVREE], label: 'La commande a été livrée' },
];
