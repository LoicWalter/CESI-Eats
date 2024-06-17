'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import Image, { StaticImageData } from 'next/image';
import BgImage from '../../../assets/repas-de-famille.jpg';
import RestaurantImage from '../../../assets/exemple-restaurant.jpg';
import { useFormState } from 'react-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ClickableImageInput,
  PhoneInput,
  StyledButton,
  StyledOutlinedButton,
  StyledTextField,
  redirectTo,
} from '@repo/ui';
import { InsertPhotoOutlined } from '@mui/icons-material';

interface RestaurantFormValues {
  name: string;
  address: string;
  phoneNumber: string;
  siret: string;
  category: string;
  picture: File | null;
}

interface CreateRestaurantPageProps {
  action: (
    _: any,
    data: FormData,
  ) => Promise<{
    error: string;
  }>;
}
const phoneRegExp = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;

export default function page({ action }: CreateRestaurantPageProps): JSX.Element {
  const [state, formAction] = useFormState(action, { error: '' });

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis.'),
    address: Yup.string().required("L'adresse est requise."),
    phone: Yup.string()
      .matches(phoneRegExp, 'Le numéro de téléphone est invalide.')
      .required('Le numéro de téléphone est requis.'),
    siret: Yup.string().required('Le SIRET est requis.'),
    category: Yup.string().required('La catégorie est requise.'),
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Créer un restaurant
      </Typography>
      {state?.error ? <p>{state.error}</p> : null}
      <Formik
        initialValues={{
          name: '',
          address: '',
          phoneNumber: '',
          siret: '',
          category: '',
          picture: null,
        }}
        validationSchema={schema}
        onSubmit={(values: RestaurantFormValues) => {
          console.log(values);
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formAction(formData);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full justify-center items-center"
          >
            <ClickableImageInput
              name="restaurantPicture"
              handleFile={(file) => setFieldValue('restaurantPicture', file)}
              defaultValue={<InsertPhotoOutlined />}
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
              value={values.phoneNumber}
              onChange={(phoneNumber) => setFieldValue('phoneNumber', phoneNumber)}
              fullWidth
              variant="outlined"
              label="Numéro de téléphone"
              name="phoneNumber"
              error={Boolean(errors.phoneNumber && touched.phoneNumber)}
              helperText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : ''}
              InputProps={{
                className: `${errors.phoneNumber && touched.phoneNumber ? 'bg-red-100' : ''}`,
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
            <FormControl
              variant="outlined"
              fullWidth
            >
              <InputLabel id="category">Catégorie</InputLabel>
              <Select
                labelId="category"
                label="Catégorie"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.category && touched.category)}
              >
                <MenuItem value="cafe">Café</MenuItem>
                <MenuItem value="bar">Bar</MenuItem>
                <MenuItem value="brasserie">Brasserie</MenuItem>
                <MenuItem value="fast-food">Fast food</MenuItem>
                <MenuItem value="restaurant-mexicain">Restaurant mexicain</MenuItem>
                <MenuItem value="restaurant-de-sushis">Restaurant de sushis</MenuItem>
                <MenuItem value="boulangerie">Boulangerie</MenuItem>
                <MenuItem value="pizzeria">Pizzeria</MenuItem>
                <MenuItem value="restaurant-italien">Restaurant italien</MenuItem>
                <MenuItem value="restaurant-chinois">Restaurant chinois</MenuItem>
                <MenuItem value="restaurant-indien">Restaurant indien</MenuItem>
                <MenuItem value="restaurant-thaïlandais">Restaurant thaïlandais</MenuItem>
                <MenuItem value="restaurant-végétarien">Restaurant végétarien</MenuItem>
                <MenuItem value="restaurant-libanais">Restaurant libanais</MenuItem>
                <MenuItem value="steakhouse">Steakhouse</MenuItem>
              </Select>
            </FormControl>
            <div className="flex flex-row w-full justify-between gap-4 items-center mt-6">
              <StyledOutlinedButton
                className="w-1/2 border-primary text-primary rounded-xl"
                type="button"
                onClick={() => redirectTo('/restaurant/management')}
                variant="outlined"
              >
                Annuler
              </StyledOutlinedButton>
              <StyledButton
                type="submit"
                className="w-1/2 bg-primary text-white rounded-xl"
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
