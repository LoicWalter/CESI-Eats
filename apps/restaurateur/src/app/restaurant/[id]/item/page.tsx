'use client';

import React from 'react';
import { Typography, MenuItem, Alert } from '@mui/material';
import { useFormState } from 'react-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ClickableImageInput,
  StyledButton,
  StyledOutlinedButton,
  StyledTextField,
  itemCategory,
  itemRegime,
} from '@repo/ui';
import { InsertPhotoOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { createItem } from '@repo/ui/actions/create-item.ts';

interface ArticleFormValues {
  name: string;
  description: string;
  regime: string;
  price: number;
  category: string;
  'item-picture': File | null;
}

export default function page({ params }: { params: { id: string } }): JSX.Element {
  const [state, formAction] = useFormState(createItem, { error: '' });
  const { id } = params;
  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis.'),
    description: Yup.string().required('La description est requise'),
    regime: Yup.string().required('Le régime est requis.'),
    category: Yup.string().required("La catégorie d'article est requise."),
    price: Yup.string().required('Le prix est requise.'),
  });

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Ajouter un article
      </Typography>
      {state.error && (
        <Alert
          severity="error"
          className="w-full"
        >
          {state.error}
        </Alert>
      )}
      <Formik
        initialValues={{
          name: '',
          description: '',
          regime: '',
          price: 0,
          category: '',
          'item-picture': null,
        }}
        validationSchema={schema}
        onSubmit={(values: ArticleFormValues) => {
          console.log(values);
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formAction({
            restaurantId: id,
            formData,
          });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full gap-4"
          >
            <ClickableImageInput
              name="item-picture"
              handleFile={(file) => setFieldValue('item-picture', file)}
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
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.description && touched.description)}
              helperText={errors.description && touched.description ? errors.description : ''}
              InputProps={{
                className: `${errors.description && touched.description ? 'bg-red-100' : ''}`,
              }}
            />
            <StyledTextField
              fullWidth
              variant="outlined"
              label="Régime"
              name="regime"
              select
              value={values.regime}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.regime && touched.regime)}
              helperText={errors.regime && touched.regime ? errors.regime : ''}
              InputProps={{
                className: `${errors.regime && touched.regime ? 'bg-red-100' : ''}`,
              }}
            >
              {itemRegime.map((regime) => (
                <MenuItem
                  key={regime.value}
                  value={regime.value}
                >
                  {regime.label}
                </MenuItem>
              ))}
            </StyledTextField>

            <StyledTextField
              label="Catégorie"
              name="category"
              fullWidth
              select
              variant="outlined"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.category && touched.category)}
              helperText={errors.category && touched.category ? errors.category : ''}
              InputProps={{
                className: `${errors.category && touched.category ? 'bg-red-100' : ''}`,
              }}
            >
              {itemCategory.map((category) => (
                <MenuItem
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </MenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              fullWidth
              variant="outlined"
              label="Prix"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.price && touched.price)}
              helperText={errors.price && touched.price ? errors.price : ''}
              inputProps={{ min: 0, step: 0.01 }}
              InputProps={{
                className: `${errors.price && touched.price ? 'bg-red-100' : ''}`,
              }}
            />
            <div className="flex flex-row items-center justify-between w-full gap-4 mt-6">
              <Link
                href={`/restaurant/${id}`}
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
