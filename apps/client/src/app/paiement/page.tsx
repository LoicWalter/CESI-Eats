'use client';

import React from 'react';
import BgImage from '../../assets/repas-de-famille.jpg';
import {
  Typography,
  Paper,
  Button,
  FormControl,
  IconButton,
  Modal,
  Divider,
  Container,
} from '@mui/material';
import BuffaloGrill from '../../assets/BuffaloGrill.jpg';
import Image, { StaticImageData } from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PaymentForm, StyledTextField } from '@repo/ui';
import { Close, CreditCard, Edit } from '@mui/icons-material';

interface CommandeProps {
  id: string;
  restaurant: string;
  picture: StaticImageData;
  address: string;
  deliveryAddress: string;
  cardOwner: string | null;
  cardNumber: string | null;
  cardExpiration: string | null;
  cardCvc: string | null;
  items: {
    name: string;
    price: number;
  }[];
  serviceFee: number;
}

const commande: CommandeProps = {
  id: '1',
  restaurant: 'Buffalo Grill Fegersheim',
  picture: BuffaloGrill,
  address: 'Rue de Lyon, N83, 67640 Fegersheim',
  deliveryAddress: '2 allée des Foulons, Lingolsheim 67380',
  cardOwner: '',
  cardNumber: '',
  cardExpiration: '',
  cardCvc: '',
  items: [
    {
      name: 'Super Famous Burger Bacon',
      price: 11.5,
    },
  ],
  serviceFee: 1.5,
};

const card = (
  cardOwner: string | null,
  cardNumber: string | null,
  cardDate: string | null,
  cardCvc: string | null,
) => {
  if (!cardOwner || !cardNumber || !cardDate || !cardCvc) {
    return 'Ajouter une carte banquaire';
  }
  cardNumber = cardNumber.replace(/^.{14}/g, '**** **** ****').trim();
  return (
    <div className="w-full flex flex-row gap-6">
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
    cardExpiration: Yup.string()
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
        const cardExpiration = new Date(year + 2000, month, 1);

        return cardExpiration > currentDate;
      }),
    name: Yup.string().required('Name is required'),
    cardCvc: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'Invalid cardCvc')
      .required('cardCvc is required'),
  });

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Formik
      initialValues={{
        id: commande.id,
        restaurant: commande.restaurant,
        picture: commande.picture,
        address: commande.address,
        deliveryAddress: commande.deliveryAddress,
        cardOwner: commande.cardOwner,
        cardNumber: commande.cardNumber,
        cardExpiration: commande.cardExpiration,
        cardCvc: commande.cardCvc,
        items: commande.items,
        serviceFee: commande.serviceFee,
      }}
      onSubmit={(values: CommandeProps) => console.log(values)}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-full"
        >
          <div className="md:h-screen h-full md:overflow-hidden w-full flex flex-col justify-center items-center">
            <Image
              src={BgImage}
              alt="Repas de famille"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <Container
              maxWidth="md"
              className="h-full flex item-center justify-center bg-white z-20"
            >
              <div className="flex flex-col w-full px-6 mt-2 md:p-12 item-center md:justify-between">
                <Typography
                  variant="h3"
                  className="font-bold mb-2 md:mb-6"
                >
                  <div className="md:text-4xl sm:text-3xl text-2xl">Détails de la livraison</div>
                </Typography>
                <div className="flex w-full mb-4 md:flex-row flex-col">
                  <Image
                    src={commande.picture}
                    alt="Buffalo Grill"
                    className="md:w-1/2 w-full rounded-xl aspect-video justify-center object-cover object-center align-center "
                  />
                  <div className="md:ml-8 flex flex-col gap-3 w-full md:mt-0 mt-2">
                    <div className="flex flex-col gap-1">
                      <Typography
                        variant="h5"
                        className="font-bold"
                      >
                        <div className="md:text-2xl sm:text-xl text-lg">{commande.restaurant}</div>
                      </Typography>
                      <Typography variant="h5">
                        <div className="md:text-base text-sm">{commande.address}</div>
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <Typography
                          variant="h6"
                          className="font-bold"
                        >
                          <div className="md:text-xl text-base">Adresse de livraison</div>
                        </Typography>
                        <StyledTextField
                          fullWidth
                          variant="standard"
                          name="deliveryAddress"
                          value={commande.deliveryAddress}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            formik.errors.deliveryAddress && formik.touched.deliveryAddress,
                          )}
                          helperText={
                            formik.errors.deliveryAddress && formik.touched.deliveryAddress
                              ? formik.errors.deliveryAddress
                              : ''
                          }
                          InputProps={{
                            className: `${formik.errors.deliveryAddress && formik.touched.deliveryAddress ? 'bg-red-100' : ''}`,
                          }}
                        />
                      </div>
                      <div>
                        <FormControl fullWidth>
                          <div className="flex flex-col gap-2">
                            <Typography
                              variant="h6"
                              className="font-bold"
                            >
                              <div className="md:text-xl text-base">Carte banquaire</div>
                            </Typography>
                            <div className="flex flex-row gap-2 items-center">
                              <div className="justify-between flex flex-row w-full">
                                <div className="flex flex-row gap-2">
                                  <CreditCard className="opacity-55" />

                                  <Typography variant="body1">
                                    {card(
                                      formik.values.cardOwner,
                                      formik.values.cardNumber,
                                      formik.values.cardExpiration,
                                      formik.values.cardCvc,
                                    )}
                                  </Typography>
                                </div>
                                <IconButton
                                  className="p-0"
                                  onClick={handleClickOpen}
                                >
                                  <Edit />
                                </IconButton>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  className="flex justify-center items-center "
                                  title="Ajouter une carte banquaire"
                                >
                                  <div className="bg-gray-5 m-8 p-8 rounded-lg relative">
                                    <IconButton
                                      className="absolute top-4 right-4"
                                      onClick={handleClose}
                                    >
                                      <Close />
                                    </IconButton>
                                    <PaymentForm formik={formik} />
                                    <Button
                                      variant="outlined"
                                      className="bg-primary text-white hover:bg-secondary rounded-lg border-primary hover:border-secondary w-full py-2 mt-8"
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
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <Paper className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        {Object.entries(commande.items).map(([key, value]) => (
                          <div
                            className="w-full flex flex-row justify-between"
                            key={key}
                          >
                            <Typography variant="body1">{value.name}</Typography>
                            <Typography
                              variant="body1"
                              className="text-right items-center justify-center flex"
                            >
                              {value.price}€
                            </Typography>
                          </div>
                        ))}
                        <div className="w-full flex flex-row justify-between">
                          <Typography variant="body1">Frais de livraison</Typography>
                          <Typography
                            variant="body1"
                            className="text-right items-center justify-center flex"
                          >
                            {commande.serviceFee}€
                          </Typography>
                        </div>
                      </div>
                      <div className="w-full flex flex-row justify-between">
                        <Typography
                          variant="body1"
                          className="font-bold"
                        >
                          Total :
                        </Typography>
                        <Typography
                          variant="body1"
                          className="text-right font-bold items-center justify-center flex"
                        >
                          {commande.items.reduce(
                            (acc, item) => acc + item.price,
                            commande.serviceFee,
                          )}
                          €
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </div>
                <div className="flex justify-between mt-6 w-full">
                  <div className="flex flex-row items-center gap-2 justify-end w-full pb-4 md:pb-0">
                    <Button
                      variant="outlined"
                      className="text-primary hover:text-secondary md:w-1/3 w-full border-primary rounded-lg hover:border-secondary "
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="outlined"
                      type="submit"
                      className="bg-primary text-white hover:bg-secondary rounded-lg border-primary hover:border-secondary md:w-1/3 w-full"
                    >
                      Commander
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </form>
      )}
    </Formik>
  );
}
