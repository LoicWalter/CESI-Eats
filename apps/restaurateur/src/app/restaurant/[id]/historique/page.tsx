'use client';

import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useRestaurant, useDeliveries, translateStatus, useCommandesRestaurant } from '@repo/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function page() {
  const pathname = usePathname();
  const commandes = useCommandesRestaurant();
  const deliveries = useDeliveries();
  const restaurant = useRestaurant();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Historique des commandes
      </Typography>
      <Paper className="p-4 w-full overflow-auto">
        <List>
          {commandes.map((commande, index) => {
            const delivery = deliveries.find((d) => d.id === commande.delivery);
            return (
              <Box key={commande.id}>
                <Link href={`${pathname}/${commande.id}`}>
                  <ListItem className="flex flex-col items-center justify-center w-full flex-start">
                    <ListItemText
                      className="w-full"
                      primary={commande.id}
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
                            className="font-bold"
                          >
                            {restaurant?.name}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                          >
                            {` — ${delivery?.deliveryTime ?? 'Pas encore récupéré'}`}
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
