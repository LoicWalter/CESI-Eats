'use client';

import React, { useState } from 'react';
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Modal,
} from '@mui/material';
import { CheckCircleOutline, Close } from '@mui/icons-material';
import { StyledButton } from '@repo/ui';
import Link from 'next/link';

interface HistoryItem {
  title: string;
  date: string;
  description: string;
  price: number;
}

const commandeId = 1;

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
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<HistoryItem>({
    title: '',
    date: '',
    description: '',
    price: 0,
  });
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Historique des commandes
      </Typography>
      <Paper className="p-4 w-full">
        <List>
          {historyData.map((item, index) => (
            <div key={index}>
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
                  <IconButton
                    className="flex text-success w-10 h-10"
                    onClick={() => {
                      setOpen(true);
                      setModalData(item);
                    }}
                  >
                    <CheckCircleOutline />
                  </IconButton>
                </div>
              </div>
              {index < historyData.length - 1 && <Divider component="li" />}
            </div>
          ))}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            className="flex items-center justify-center"
            title="Valider la commande"
          >
            <div className="relative p-8 m-8 rounded-lg bg-gray-5">
              <IconButton
                className="absolute top-4 right-4"
                onClick={() => setOpen(false)}
              >
                <Close />
              </IconButton>
              <Typography
                variant="h4"
                className="font-bold"
              >
                {modalData.title}
              </Typography>
              <Typography
                variant="body2"
                className="mt-4"
              >
                {modalData.description}
              </Typography>
              <Typography
                variant="body2"
                className="mt-4"
              >
                {`Total : ${modalData.price} €`}
              </Typography>
              <Link
                href={`/historique/${commandeId}`}
                className="hover:underline"
              >
                <StyledButton
                  variant="contained"
                  className="w-full py-2 mt-8 text-white rounded-lg bg-primary hover:bg-secondary border-primary hover:border-secondary"
                  onClick={() => setOpen(false)}
                >
                  Valider la commande
                </StyledButton>
              </Link>
            </div>
          </Modal>
        </List>
      </Paper>
    </div>
  );
}
