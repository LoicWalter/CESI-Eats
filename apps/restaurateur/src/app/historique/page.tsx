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
  IconButton,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

interface HistoryItem {
  title: string;
  date: string;
  description: string;
  price: number;
}

const historyData: HistoryItem[] = [
  {
    title: 'Commande 12345',
    date: '2024-06-18',
    description: 'Super Famous Bacon Burger, Double Cheeseburger',
    price: 12.5,
  },
  {
    title: 'Commande 12344',
    date: '2024-06-17',
    description: 'Classic Burger, Vegan Burger',
    price: 10.5,
  },
  {
    title: 'Commande 12343',
    date: '2024-06-16',
    description:
      'Classic Burger, Double Cheeseburger, Classic Burger, Double Cheeseburger, Classic Burger, Double Cheeseburger, Classic Burger, Double Cheeseburger',
    price: 150.5,
  },
  {
    title: 'Commande 12342',
    date: '2024-06-15',
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
              <div className="flex flex-row">
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
                          {item.date}
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
                <div className="flex justify-center items-center">
                  <IconButton className="flex text-success w-10 h-10">
                    <CheckCircleOutline />
                  </IconButton>
                </div>
              </div>
              {index < historyData.length - 1 && <Divider component="li" />}
            </Box>
          ))}
        </List>
      </Paper>
    </div>
  );
}
