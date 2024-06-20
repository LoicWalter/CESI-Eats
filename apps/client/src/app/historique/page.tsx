'use client';

import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useCommandes, useRestaurants, useDeliveries, translateStatus } from '@repo/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function page() {
  const commandes = useCommandes();
  const deliveries = useDeliveries();
  const restaurants = useRestaurants();

  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-12 md:p-8">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Historique des commandes
      </Typography>
      <Paper
        className="w-full p-4"
        elevation={3}
      >
        <List>
          {commandes.map((commande, index) => {
            const restaurant = restaurants.find((r) => r.id === commande.restaurant);
            const delivery = deliveries.find((d) => d.id === commande.delivery);
            return (
              <Box key={commande.id}>
                <Link href={`${pathname}/${commande.id}`}>
                  <ListItem className="flex flex-col items-center justify-center w-full flex-start">
                    <ListItemText
                      className="w-full"
                      primary={restaurant?.name}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {`${translateStatus(commande.status || '')} — `}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                          >
                            {`${delivery?.deliveryTime ?? 'Pas encore récupéré'}`}
                          </Typography>
                        </>
                      }
                    />
                    <ListItemText
                      className="w-full"
                      secondary={
                        <Typography
                          component="span"
                          variant="body2"
                          className="font-bold"
                        >
                          {`${commande.price} €`}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < commandes.length - 1 && <Divider component="li" />}
                </Link>
              </Box>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
