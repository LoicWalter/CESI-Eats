import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ListItemButton,
} from '@mui/material';

interface HistoryItem {
  title: string;
  date: string;
  restaurant: string;
  description: string;
  price: number;
}

const historyData: HistoryItem[] = [
  {
    title: 'Commande 12345',
    date: '2024-06-18',
    restaurant: 'McDonalds',
    description: 'Super Famous Bacon Burger, Double Cheeseburger',
    price: 12.5,
  },
  {
    title: 'Commande 12344',
    date: '2024-06-17',
    restaurant: 'Burger King',
    description: 'Classic Burger, Vegan Burger',
    price: 10.5,
  },
  {
    title: 'Commande 12343',
    date: '2024-06-16',
    restaurant: 'Quick',
    description:
      'Classic Burger, Double Cheeseburger, Classic Burger, Double Cheeseburger, Classic Burger, Double Cheeseburger, Classic Burger, Double Cheeseburger',
    price: 150.5,
  },
  {
    title: 'Commande 12342',
    date: '2024-06-15',
    restaurant: 'KFC',
    description: 'Super Famous Bacon Burger, Vegan Burger',
    price: 12.5,
  },
];

export default function page() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Historique des commandes
      </Typography>
      <Paper className="p-4 w-full">
        <List>
          {historyData.map((item, index) => (
            <Box key={index}>
              <ListItem className="flex-start justify-center flex items-center w-full flex-col">
                <ListItemText
                  className="w-full"
                  primary={item.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {`${item.date} — `}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        className="font-bold"
                      >
                        {item.restaurant}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                      >
                        {` — ${item.description}`}
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
                      {`${item.price} €`}
                    </Typography>
                  }
                />
              </ListItem>
              {index < historyData.length - 1 && <Divider component="li" />}
            </Box>
          ))}
        </List>
      </Paper>
    </div>
  );
}
