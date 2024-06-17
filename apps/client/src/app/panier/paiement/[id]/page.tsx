'use client';

import React, { Suspense, useEffect } from 'react';
import BgImage from '../../../../assets/repas-de-famille.jpg';
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
import BuffaloGrill from '../../../../assets/BuffaloGrill.jpg';
import Image, { StaticImageData } from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  ImageWithDefaultOnError,
  PaymentForm,
  RestaurantsContextType,
  StyledButton,
  StyledOutlinedButton,
  StyledTextField,
  useCart,
  useUser,
} from '@repo/ui';
import { Close, CreditCard, Edit } from '@mui/icons-material';
import { getRestaurant } from '@repo/ui/actions/get-restaurants.ts';

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
    <div className="flex flex-row w-full gap-6">
      <div>{cardNumber}</div>
      <div>{cardDate}</div>
    </div>
  );
};

const schema = Yup.object().shape({
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, 'Le numéro de carte est invalide')
    .required('Le numéro de carte est requis'),
  cardExpiration: Yup.string()
    .test('valid-month', 'Le mois est invalide', function (value) {
      if (!value) {
        return false;
      }

      const [month] = value.split('/').map((item) => parseInt(item, 10));

      return month >= 1 && month <= 12;
    })
    .test('is-future-date', "La date d'expiration doit être future", function (value) {
      if (!value) {
        return false;
      }

      const currentDate = new Date();
      const [month, year] = value.split('/').map((item) => parseInt(item, 10));

      // Adding 1 to the month because JavaScript months are zero-indexed
      const expiryDate = new Date(year + 2000, month, 1);

      return expiryDate > currentDate;
    })
    .required("La date d'expiration est requise"),
  cardOwner: Yup.string().required('Le nom du titulaire est requis'),
  cardCvc: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'Le code de sécurité est invalide')
    .required('Le code de sécurité est requis'),
});

type CommandeFormik = {
  deliveryAddress: string;
  cardOwner: string;
  cardNumber: string;
  cardExpiration: string;
  cardCvc: string;
};

export default function OrderDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const [fullRestaurant, setFullRestaurant] = React.useState<RestaurantsContextType>({});
  const { cartFromRestaurant, getTotalPrice } = useCart(id);
  const user = useUser();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await getRestaurant(id);
      if (typeof response === 'string') {
        console.error(response);
        return;
      }
      setFullRestaurant(response);
    };

    fetchRestaurant();
  }, [id]);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Formik
      initialValues={{
        deliveryAddress: localStorage.getItem('address') || user.address || '',
        cardOwner: user.cardOwner || '',
        cardNumber: user.cardNumber || '',
        cardExpiration: user.cardExpiration || '',
        cardCvc: user.cardCvc || '',
      }}
      validationSchema={schema}
      onSubmit={(values: CommandeFormik) => console.log(values)}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-full"
        >
          <div className="flex flex-col items-center justify-center w-full h-full md:h-screen md:overflow-hidden">
            <Image
              src={BgImage}
              alt="Repas de famille"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
            <Container
              maxWidth="md"
              className="z-20 flex justify-center h-full overflow-auto bg-white item-center"
            >
              <div className="flex flex-col w-full gap-12 px-6 mt-2 md:p-12 item-center md:justify-between">
                <Typography
                  variant="h3"
                  className="mb-2 font-bold md:mb-6"
                >
                  <div className="text-2xl md:text-4xl sm:text-3xl">Détails de la livraison</div>
                </Typography>
                <div className="flex flex-col w-full mb-4 md:flex-row">
                  <ImageWithDefaultOnError
                    src={`${process.env.NEXT_PUBLIC_API_URL}/restaurants-picture/${fullRestaurant.restaurantPicture}`}
                    alt={fullRestaurant.name || ''}
                    width={300}
                    height={300}
                    defaultReactNode={
                      <img
                        src={'https://via.placeholder.com/300'}
                        alt={fullRestaurant.name || ''}
                        className="object-cover object-center rounded"
                      />
                    }
                    forceDefault={!fullRestaurant.restaurantPicture}
                  />

                  <div className="flex flex-col w-full gap-3 mt-2 md:ml-8 md:mt-0">
                    <div className="flex flex-col gap-1">
                      <Typography
                        variant="h5"
                        className="font-bold"
                      >
                        <div className="text-lg md:text-2xl sm:text-xl">{fullRestaurant.name}</div>
                      </Typography>
                      <Typography variant="h5">
                        <div className="text-sm md:text-base">{fullRestaurant.address}</div>
                      </Typography>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <div className="flex flex-col w-full gap-2">
                        <Typography
                          variant="h6"
                          className="font-bold"
                        >
                          <div className="text-base md:text-xl">Adresse de livraison</div>
                        </Typography>
                        <StyledTextField
                          fullWidth
                          variant="standard"
                          name="deliveryAddress"
                          value={formik.values.deliveryAddress}
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
                              <div className="text-base md:text-xl">Carte banquaire</div>
                            </Typography>
                            <div className="flex flex-row items-center gap-2">
                              <div className="flex flex-row justify-between w-full">
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
                                  className="flex items-center justify-center "
                                  title="Ajouter une carte banquaire"
                                >
                                  <div className="relative p-8 m-8 rounded-lg bg-gray-5">
                                    <IconButton
                                      className="absolute top-4 right-4"
                                      onClick={handleClose}
                                    >
                                      <Close />
                                    </IconButton>
                                    <PaymentForm formik={formik} />
                                    <Button
                                      variant="outlined"
                                      className="w-full py-2 mt-8 text-white rounded-lg bg-primary hover:bg-secondary border-primary hover:border-secondary"
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
                        <Suspense fallback={<div>Loading...</div>}>
                          {cartFromRestaurant?.map(({ object, quantity }) => (
                            <div
                              className="flex flex-row justify-between w-full"
                              key={object.id}
                            >
                              <Typography variant="body1">
                                {object.name} x {quantity}
                              </Typography>
                              <Typography
                                variant="body1"
                                className="flex items-center justify-center text-right"
                              >
                                {quantity} x {object.price || 0}€ = {(object.price || 0) * quantity}
                                €
                              </Typography>
                            </div>
                          ))}
                        </Suspense>
                        <div className="flex flex-row justify-between w-full">
                          <Typography variant="body1">Frais de livraison</Typography>
                          <Typography
                            variant="body1"
                            className="flex items-center justify-center text-right"
                          >
                            2€
                          </Typography>
                        </div>
                      </div>
                      <Divider />
                      <div className="flex flex-row justify-between w-full">
                        <Typography
                          variant="body1"
                          className="font-bold"
                        >
                          Total :
                        </Typography>
                        <Typography
                          variant="body1"
                          className="flex items-center justify-center font-bold text-right"
                        >
                          {getTotalPrice(id) + 2}€
                        </Typography>
                      </div>
                    </div>
                  </Paper>
                </div>
                <div className="flex justify-between w-full mt-6">
                  <div className="flex flex-row items-center justify-end w-full gap-2 pb-4 md:pb-0">
                    <StyledOutlinedButton
                      variant="outlined"
                      className="w-full rounded-lg text-primary hover:text-secondary md:w-1/3 border-primary hover:border-secondary "
                    >
                      Annuler
                    </StyledOutlinedButton>
                    <StyledButton
                      variant="contained"
                      type="submit"
                      className="w-full text-white rounded-lg bg-primary hover:bg-secondary border-primary hover:border-secondary md:w-1/3"
                    >
                      Commander
                    </StyledButton>
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
