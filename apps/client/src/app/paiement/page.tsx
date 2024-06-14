import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Modal,
  Divider,
} from '@mui/material';
import BuffaloGrill from '../../assets/BuffaloGrill.jpg';
import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PaymentForm } from '@repo/ui';
import { Close, CreditCard, Edit } from '@mui/icons-material';

interface CommandeProps {
  id: string;
  restaurant: string;
  address: string;
  deliveryAddress: string;
  card: {
    cardName: string | null;
    cardNumber: string | null;
    expiryDate: string | null;
    cvv: string | null;
  };
  items: {
    name: string;
    price: number;
  }[];
  serviceFee: number;
}

const commande: CommandeProps = {
  id: '1',
  restaurant: 'Buffalo Grill Fegersheim',
  address: 'Rue de Lyon, N83, 67640 Fegersheim',
  deliveryAddress: '2 allée des Foulons, Lingolsheim 67380',
  card: {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  },
  items: [
    {
      name: 'Super Famous Burger Bacon',
      price: 11.5,
    },
  ],
  serviceFee: 1.5,
};

const card = (
  cardName: string | null,
  cardNumber: string | null,
  cardDate: string | null,
  cvv: string | null,
) => {
  if (!cardName || !cardNumber || !cardDate || !cvv) {
    return 'Ajouter une carte banquaire';
  }
  cardNumber = cardNumber.replace(/^.{14}/g, '**** **** ****').trim();
  return (
    <div className="ui-w-full ui-flex ui-flex-row ui-gap-6">
      <div>{cardNumber}</div>
      <div>{cardDate}</div>
    </div>
  );
};

export default function OrderDetails() {
  const schema = Yup.object().shape({
    cardNumber: Yup.string()
      // .matches(/^[0-9]{16}$/, "Invalid card number")
      .required('Card number is required'),
    // expiryDate: yup.string().required("Expiry date is required"),
    expiryDate: Yup.string()
      .required('Expiry date is required')
      .test('valid-month', 'Invalid month', function (value) {
        if (!value) {
          return false;
        }

        const [month] = value.split('/').map((item) => parseInt(item, 10));

        return month >= 1 && month <= 12;
      })
      .test('is-future-date', 'Expiry date must be in the future', function (value) {
        if (!value) {
          return false;
        }

        const currentDate = new Date();
        const [month, year] = value.split('/').map((item) => parseInt(item, 10));

        // Adding 1 to the month because JavaScript months are zero-indexed
        const expiryDate = new Date(year + 2000, month, 1);

        return expiryDate > currentDate;
      }),
    name: Yup.string().required('Name is required'),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'Invalid CVV')
      .required('CVV is required'),
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Formik
      initialValues={{
        cardName: commande.card.cardName,
        cardNumber: commande.card.cardNumber,
        expiryDate: commande.card.expiryDate,
        cvv: commande.card.cvv,
      }}
      onSubmit={(values: Record<string, any>) => console.log(values)}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="ui-flex w-full"
        >
          <Container
            maxWidth="md"
            className="my-8"
          >
            <Box className="flex flex-col items-start mb-8">
              <Typography
                variant="h4"
                component="h1"
                className="font-bold mb-4"
              >
                Détails de la livraison
              </Typography>
              <Box className="flex w-full mb-8">
                <Image
                  src={BuffaloGrill}
                  alt="Buffalo Grill"
                  className="w-1/3 rounded"
                />
                <Box className="ml-8">
                  <Typography
                    variant="h6"
                    component="h2"
                    className="font-bold"
                  >
                    Buffalo Grill Fegersheim
                  </Typography>
                  <Typography variant="body1">
                    Rue de Lyon, N83,
                    <br />
                    67640 Fegersheim
                  </Typography>
                </Box>
              </Box>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <FormControl fullWidth>
                    <InputLabel id="address-label">Adresse de livraison</InputLabel>
                    <Select
                      labelId="address-label"
                      id="address"
                      value="2 allée des Foulons, Lingolsheim 67380"
                    >
                      <MenuItem value="2 allée des Foulons, Lingolsheim 67380">
                        2 allée des Foulons, Lingolsheim 67380
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <FormControl fullWidth>
                    <div className="ui-flex ui-flex-col ui-gap-2">
                      <Typography variant="h6">Carte banquaire</Typography>
                      <div className="ui-flex ui-flex-row ui-gap-2 ui-items-center">
                        <div className="ui-justify-between ui-flex ui-flex-row ui-w-full">
                          <div className="ui-flex ui-flex-row ui-gap-2">
                            <CreditCard className="ui-opacity-55" />

                            <Typography variant="body1">
                              {card(
                                formik.values.cardName,
                                formik.values.cardNumber,
                                formik.values.expiryDate,
                                formik.values.cvv,
                              )}
                            </Typography>
                          </div>
                          <IconButton
                            className="ui-p-0"
                            onClick={handleClickOpen}
                          >
                            <Edit />
                          </IconButton>
                          <Modal
                            open={open}
                            onClose={handleClose}
                            className="ui-flex ui-justify-center ui-items-center "
                            title="Ajouter une carte banquaire"
                          >
                            <div className="ui-bg-gray-5 ui-m-8 ui-p-8 ui-rounded-lg ui-relative">
                              <IconButton
                                className="ui-absolute ui-top-4 ui-right-4"
                                onClick={handleClose}
                              >
                                <Close />
                              </IconButton>
                              <PaymentForm formik={formik} />
                              <Button
                                variant="outlined"
                                className="ui-bg-primary ui-text-white hover:ui-bg-secondary ui-rounded-lg ui-border-primary hover:ui-border-secondary ui-w-full ui-py-2 ui-mt-8"
                                onClick={handleClose}
                              >
                                Enregistrer
                              </Button>
                            </div>
                          </Modal>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box className="w-full">
              <Paper className="p-4">
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    xs={8}
                  >
                    <Typography variant="body1">Super Famous Burger Bacon</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                  >
                    <Typography
                      variant="body1"
                      className="text-right"
                    >
                      11€50
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                  >
                    <Typography variant="body1">Frais de service</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                  >
                    <Typography
                      variant="body1"
                      className="text-right"
                    >
                      1€50
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={8}
                    className="mt-4"
                  >
                    <Typography
                      variant="body1"
                      className="font-bold"
                    >
                      Total :
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    className="mt-4"
                  >
                    <Typography
                      variant="body1"
                      className="text-right font-bold"
                    >
                      13€00
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            <Box className="flex justify-between mt-8 w-full">
              <div className="ui-flex ui-flex-row ui-items-center ui-gap-2 ui-justify-end ui-w-full">
                <Button
                  variant="outlined"
                  className="ui-text-primary hover:ui-text-secondary md:ui-w-1/5 ui-w-full ui-border-primary ui-rounded-lg hover:ui-border-secondary "
                >
                  Annuler
                </Button>
                <Button
                  variant="outlined"
                  type="submit"
                  className="ui-bg-primary ui-text-white hover:ui-bg-secondary ui-rounded-lg ui-border-primary hover:ui-border-secondary md:ui-w-1/5 ui-w-full"
                >
                  Commander
                </Button>
              </div>
            </Box>
          </Container>
        </form>
      )}
    </Formik>
  );
}
