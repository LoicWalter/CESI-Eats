'use client';

import React, { useEffect } from 'react';
import { Typography, TextField, CircularProgress, Alert } from '@mui/material';
import {
  COMMANDE_LIVREE,
  COMMANDE_RECUPEREE,
  CommandeContextType,
  LIVREUR_EN_ROUTE_VERS_CLIENT,
  LIVREUR_EN_ROUTE_VERS_RESTAURANT,
  livreurSteps,
  RestaurantContextType,
  StyledButton,
  useDeliveries,
  UserContextType,
} from '@repo/ui';
import { editDeliveryStatus } from '@repo/ui/actions/status-actions.ts';
import { getCommandesAdmin } from '@repo/ui/actions/get-commandes.ts';
import { getRestaurant } from '@repo/ui/actions/get-restaurants.ts';
import { getUser } from '@repo/ui/actions/get-me.ts';

enum Status {
  PREPARATION = 'Commande en préparation',
  RECUPERE = 'Commande récupéré',
  ARRIVE = 'Arrivé',
}

export default function page({ params }: { params: { id: string } }) {
  const [step, setStep] = React.useState(0);
  const [restaurant, setRestaurant] = React.useState<RestaurantContextType>({});
  const [commande, setCommande] = React.useState<CommandeContextType>({});
  const [client, setClient] = React.useState<UserContextType>({});
  const [error, setError] = React.useState<string | null>(null);
  const [code, setCode] = React.useState('');
  const { id } = params;
  const deliveries = useDeliveries();
  const delivery = deliveries.find((d) => d.id === id);

  useEffect(() => {
    const getCommandeAndRestaurant = async () => {
      if (!delivery) {
        return;
      }
      const commandes = await getCommandesAdmin();
      if (typeof commandes === 'string') {
        console.error('Error fetching commandes');
        return;
      }
      const commande = commandes.find((c) => c.id === delivery.order);
      if (!commande || !commande.restaurant) {
        console.error('Error fetching commande');
        return;
      }
      const restaurant = await getRestaurant(commande?.restaurant);
      if (typeof restaurant === 'string') {
        console.error('Error fetching restaurant');
        return;
      }

      if (!commande.client) {
        return;
      }

      const client = await getUser(commande.client);
      if (!client || typeof client === 'string') {
        console.error('Error fetching client');
        return;
      }

      setRestaurant(restaurant);
      setCommande(commande);
      setClient(client);
    };
    getCommandeAndRestaurant();
  }, [delivery]);

  useEffect(() => {
    const step = livreurSteps.find((s) => s.status === delivery?.status)?.key;
    if (step) {
      setStep(step);
    }
  }, [delivery]);

  const handleNext = () => {
    setStep(step + 1);
  };

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      {error && (
        <Alert
          severity="error"
          className="w-full"
        >
          {error}
        </Alert>
      )}
      <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center">
        <Typography
          variant="h4"
          className="font-bold mb-4 items-center"
        >
          Détails de la livraison
        </Typography>
        <div className="flex flex-row items-center gap-4">
          <Typography
            variant="body1"
            className="items-center"
          >
            Statut: {delivery?.status}
          </Typography>
        </div>
      </div>
      <div className="mb-4">
        <Typography
          variant="h6"
          component="h2"
          className="font-bold mb-2"
        >
          Restaurant
        </Typography>
        <Typography variant="body1">Nom: {restaurant.name}</Typography>
        <Typography variant="body1">Adresse: {restaurant.address}</Typography>
      </div>
      <div className="mb-4">
        <Typography
          variant="h6"
          component="h2"
          className="font-bold mb-2"
        >
          Commande
        </Typography>
        <Typography variant="body1">Numéro de la commande: {commande.id}</Typography>
      </div>
      <div className="mb-4">
        <Typography
          variant="h6"
          component="h2"
          className="font-bold mb-2"
        >
          Client
        </Typography>
        <div className="md:items-center flex flex-col md:flex-row justify-between w-full gap-4">
          <div className="flex flex-col w-full">
            <Typography variant="body1">Nom: {client?.name}</Typography>
            <Typography variant="body1">Adresse: {delivery?.deliveryAddress}</Typography>
            <Typography variant="body1">Téléphone: {client?.phoneNumber}</Typography>
          </div>

          {step === 0 && (
            <StyledButton
              type="submit"
              className="md:w-1/2 bg-primary text-white rounded-xl"
              variant="contained"
              onClick={async () => {
                const error = await editDeliveryStatus(
                  LIVREUR_EN_ROUTE_VERS_RESTAURANT,
                  delivery?.id!,
                );
                if (error) {
                  setError(error.error);
                  return;
                }
                setError(null);
                handleNext();
              }}
            >
              En route vers le restaurant
            </StyledButton>
          )}
          {step === 1 && (
            <StyledButton
              type="submit"
              className="md:w-1/2 bg-primary text-white rounded-xl"
              variant="contained"
              onClick={async () => {
                const error = await editDeliveryStatus(COMMANDE_RECUPEREE, delivery?.id!);
                if (error) {
                  setError(error.error);
                  return;
                }
                setError(null);
                handleNext();
              }}
            >
              Commande récupérée
            </StyledButton>
          )}
          {step === 2 && (
            <StyledButton
              type="submit"
              className="md:w-1/2 bg-primary text-white rounded-xl"
              variant="contained"
              onClick={async () => {
                const error = await editDeliveryStatus(LIVREUR_EN_ROUTE_VERS_CLIENT, delivery?.id!);
                if (error) {
                  setError(error.error);
                  return;
                }
                setError(null);
                handleNext();
              }}
            >
              En route vers le client
            </StyledButton>
          )}
        </div>
      </div>
      {step === 3 && (
        <div className="mb-4">
          <Typography
            variant="h6"
            component="h2"
            className="font-bold mb-2"
          >
            Code de confirmation
          </Typography>
          <div className="md:items-center flex flex-col md:flex-row justify-between w-full gap-4">
            <TextField
              label="Code fourni par le client"
              variant="outlined"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <StyledButton
              type="button"
              className="md:w-1/2 bg-primary text-white rounded-xl"
              variant="contained"
              onClick={async () => {
                //reécuperer les deux derniers chiffres du numéro de la livraison
                const lastTwoDigits = delivery?.id!.slice(-2);
                if (code !== lastTwoDigits) {
                  setError('Le code de confirmation est incorrect');
                  return;
                }
                const error = await editDeliveryStatus(COMMANDE_LIVREE, delivery?.id!);
                if (error) {
                  setError(error.error);
                  return;
                }
                setError(null);
                handleNext();
              }}
            >
              Valider
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
