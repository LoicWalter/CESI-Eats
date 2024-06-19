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
