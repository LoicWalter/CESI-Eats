'use client';

import React from 'react';
import { Typography, MenuItem, Alert, FormControl, FormLabel } from '@mui/material';
import { useFormState } from 'react-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  categories,
  ClickableImageInput,
  HelperText,
  ImageWithDefaultOnError,
  PhoneInput,
  StyledButton,
  StyledOutlinedButton,
  StyledSlider,
  StyledTextField,
  useRestaurant,
} from '@repo/ui';
import { InsertPhotoOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { editRestaurant } from '@repo/ui/actions/edit-restaurant.ts';

interface RestaurantFormValues {
  name: string;
  priceRange: [number, number];
  address: string;
  phone: string;
  siret: string;
  category: string;
  'restaurant-picture': File | null;
}
const phoneRegExp = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;

const schema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis.'),
  priceRange: Yup.array().of(Yup.number().required('La fourchette de prix est requise.')),
  address: Yup.string().required("L'adresse est requise."),
  phone: Yup.string()
    .matches(phoneRegExp, 'Le numéro de téléphone est invalide.')
    .required('Le numéro de téléphone est requis.'),
  siret: Yup.string()
    .required('Le SIRET est requis.')
    .length(14, 'Le SIRET doit contenir 14 chiffres.'),
  category: Yup.string().required('La catégorie est requise.'),
});

const extractValueFromPriceRange = (priceRange: string): [number, number] => {
  const [min, max] = priceRange
    .replace('€', '')
    .split('-')
    .map((value) => parseInt(value, 10));
  return [min, max];
};

export default function EditRestaurant({ params }: { params: { id: string } }): JSX.Element {
  const [state, formAction] = useFormState(editRestaurant, { error: '' });
  const { id } = params;
  const restaurant = useRestaurant();

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Modifier un restaurant
      </Typography>
      {state.error && (
        <Alert
          severity="error"
          className="ui-w-full"
        >
          {state.error}
        </Alert>
      )}
      <Formik
        initialValues={{
          name: restaurant?.name || '',
          priceRange: extractValueFromPriceRange(restaurant?.priceRange || '0€-50€'),
          address: restaurant?.address || '',
          phone: restaurant?.phone || '',
          siret: restaurant?.siret || '',
          category: restaurant?.category || '',
          'restaurant-picture': null,
        }}
        validationSchema={schema}
        onSubmit={(values: RestaurantFormValues) => {
          console.log(values);
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            if (key === 'priceRange') {
              formData.append(key, `${value[0]}€-${value[1]}€`);
              return;
            }
            formData.append(key, value);
          });
          formAction({
            restaurantId: id,
            formData,
          });
        }}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={(e) => {
              console.log(values);
              console.log(errors);
              console.log(touched);
              e.preventDefault();
              handleSubmit(e);
            }}
            className="flex flex-col items-center justify-center w-full gap-4"
          >
            <ClickableImageInput
              name="restaurant-picture"
              handleFile={(file) => setFieldValue('restaurant-picture', file)}
              defaultValue={
                <ImageWithDefaultOnError
                  src={`${process.env.NEXT_PUBLIC_API_URL}/restaurant/${restaurant.restaurantPicture}/picture`}
                  alt="menu-picture"
                  className="w-32 h-32 rounded-full"
                  defaultReactNode={<InsertPhotoOutlined fontSize="large" />}
                  forceDefault={!restaurant?.restaurantPicture}
                  width={128}
                  height={128}
                />
              }
            />
            <StyledTextField
              fullWidth
              variant="outlined"
              label="Nom"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.name && touched.name)}
              helperText={errors.name && touched.name ? errors.name : ''}
              InputProps={{
                className: `${errors.name && touched.name ? 'bg-red-100' : ''}`,
              }}
            />
            <FormControl className="w-full">
              <FormLabel>Fourchette de prix</FormLabel>
              <StyledSlider
                name="priceRange"
                value={values.priceRange}
                onChange={(_, newValue) => setFieldValue('priceRange', newValue)}
                onBlur={handleBlur}
                min={0}
                max={100}
                step={10}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}€`}
                shiftStep={10}
              />
              <HelperText error={Boolean(errors.priceRange && touched.priceRange)}>
                {errors.priceRange && touched.priceRange ? errors.priceRange : ''}
              </HelperText>
            </FormControl>
            <StyledTextField
              fullWidth
              variant="outlined"
              label="Adresse"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.address && touched.address)}
              helperText={errors.address && touched.address ? errors.address : ''}
              InputProps={{
                className: `${errors.address && touched.address ? 'bg-red-100' : ''}`,
              }}
            />
            <PhoneInput
              value={values.phone}
              onChange={(phone) => setFieldValue('phone', phone)}
              fullWidth
              variant="outlined"
              label="Numéro de téléphone"
              name="phone"
              error={Boolean(errors.phone && touched.phone)}
              helperText={errors.phone && touched.phone ? errors.phone : ''}
              InputProps={{
                className: `${errors.phone && touched.phone ? 'bg-red-100' : ''}`,
              }}
            />
            <StyledTextField
              fullWidth
              variant="outlined"
              label="SIRET"
              name="siret"
              value={values.siret}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.siret && touched.siret)}
              helperText={errors.siret && touched.siret ? errors.siret : ''}
              InputProps={{
                className: `${errors.siret && touched.siret ? 'bg-red-100' : ''}`,
              }}
            />
            <StyledTextField
              label="Catégorie"
              name="category"
              fullWidth
              select
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.category && touched.category)}
              helperText={errors.category && touched.category ? errors.category : ''}
              InputProps={{
                className: `${errors.category && touched.category ? 'bg-red-100' : ''}`,
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </MenuItem>
              ))}
            </StyledTextField>
            <div className="flex flex-row items-center justify-between w-full gap-4 mt-6">
              <Link
                href="/"
                className="w-1/2"
              >
                <StyledOutlinedButton
                  className="w-full border-primary text-primary rounded-xl"
                  type="button"
                  variant="outlined"
                >
                  Annuler
                </StyledOutlinedButton>
              </Link>
              <StyledButton
                type="submit"
                className="w-1/2 text-white bg-primary rounded-xl"
                variant="contained"
              >
                Enregistrer
              </StyledButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
