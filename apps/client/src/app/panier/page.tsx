'use client';

import { Paper, Typography } from '@mui/material';
import { StyledButton, StyledOutlinedButton, useCart, useRestaurants } from '@repo/ui';
import Link from 'next/link';
import React from 'react';
import Empty from '../../assets/emptyCart.png';
import Image from 'next/image';

function Panier() {
  const { cart, getTotalPrice, deleteRestaurantCart } = useCart();
  const restaurants = useRestaurants();
  return (
    <div className="flex flex-col gap-12 md:p-12">
      <Typography
        variant="h3"
        textAlign={'center'}
        className="font-bold"
      >
        Panier
      </Typography>

      <Typography variant="h5">
        Vous avez {Object.keys(cart).length} article(s) dans votre panier.
      </Typography>

      {Object.keys(cart).map((restaurantId) => {
        const restaurant = restaurants.find((r) => r.id === restaurantId);
        return (
          <Paper
            key={restaurantId}
            className="flex flex-col gap-8 p-4"
            elevation={3}
          >
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8 md:justify-between">
              <Link
                href={`/restaurant/${restaurantId}`}
                className="hover:underline"
              >
                <Typography variant="h5">{restaurant?.name}</Typography>
              </Link>
              <Typography variant="body1">{restaurant?.address}</Typography>

              <Typography variant="body1">Total: {getTotalPrice(restaurantId)}€</Typography>
            </div>
            <div>
              <div className="flex flex-col w-full gap-6 md:flex-row">
                {cart[restaurantId].map((element) => (
                  <div key={element.object.id}>
                    <Typography variant="body1">
                      {element.quantity} x {element.object.name}
                    </Typography>

                    <>{(element.object.price || 0) * element.quantity}€</>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-end">
              <StyledOutlinedButton
                variant="outlined"
                onClick={() => {
                  deleteRestaurantCart(restaurantId);
                }}
              >
                Supprimer
              </StyledOutlinedButton>
              <Link href={`/panier/paiement/${restaurantId}`}>
                <StyledButton variant="contained">Commander</StyledButton>
              </Link>
            </div>
          </Paper>
        );
      })}
      {Object.keys(cart).length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <Image
            src={Empty}
            alt="Panier vide"
            width={300}
            height={300}
          />
        </div>
      )}
    </div>
  );
}

export default Panier;
