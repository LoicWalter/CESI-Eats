import React from 'react';
import { Typography, TextField, CircularProgress } from '@mui/material';
import { StyledButton, StyledOutlinedButton } from '@repo/ui';

enum Status {
  PREPARATION = 'Commande en préparation',
  RECUPERE = 'Commande récupéré',
  ARRIVE = 'Arrivé',
}

interface DeliveryDetails {
  restaurantName: string;
  restaurantAddress: string;
  orderNumber: number;
  clientName: string;
  clientAddress: string;
  clientPhoneNumber: string;
  status: Status;
}

const deliveryDetails: DeliveryDetails = {
  restaurantName: 'Buffalo Grill Fegersheim',
  restaurantAddress: 'Rue de Lyon, N83, 67640 Fegersheim',
  orderNumber: 12345,
  clientName: 'John Doe',
  clientAddress: '2 allée des foulons, 67380 Lingolsheim',
  clientPhoneNumber: '+33612345678',
  status: Status.PREPARATION,
};

export default function page() {
  return (
    <div className="w-full flex flex-col justify-center gap-4">
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
            Statut: {deliveryDetails.status}
          </Typography>
          <CircularProgress
            color="warning"
            size={20}
          />
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
        <Typography variant="body1">Nom: {deliveryDetails.restaurantName}</Typography>
        <Typography variant="body1">Adresse: {deliveryDetails.restaurantAddress}</Typography>
      </div>
      <div className="mb-4">
        <Typography
          variant="h6"
          component="h2"
          className="font-bold mb-2"
        >
          Commande
        </Typography>
        <Typography variant="body1">
          Numéro de la commande: {deliveryDetails.orderNumber}
        </Typography>
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
            <Typography variant="body1">Nom: {deliveryDetails.clientName}</Typography>
            <Typography variant="body1">Adresse: {deliveryDetails.clientAddress}</Typography>
            <Typography variant="body1">Téléphone: {deliveryDetails.clientPhoneNumber}</Typography>
          </div>

          <StyledButton
            type="submit"
            className="md:w-1/2 bg-primary text-white rounded-xl"
            variant="contained"
          >
            Commande récupérée
          </StyledButton>
        </div>
      </div>
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
          />
          <StyledButton
            type="submit"
            className="md:w-1/2 bg-primary text-white rounded-xl"
            variant="contained"
          >
            Valider
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
