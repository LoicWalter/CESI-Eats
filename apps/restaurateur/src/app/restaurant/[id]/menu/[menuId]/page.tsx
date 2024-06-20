'use client';

import React from 'react';
import { Typography, MenuItem, Checkbox, ListItemText, Alert } from '@mui/material';
import { useFormState } from 'react-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ClickableImageInput,
  ImageWithDefaultOnError,
  StyledButton,
  StyledOutlinedButton,
  StyledTextField,
  useRestaurant,
} from '@repo/ui';
import { InsertPhotoOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { editMenu } from '@repo/ui/actions/edit-menu.ts';

interface ArticleFormValues {
  name: string;
  description: string;
  items: string[];
  price: number;
  'menu-picture': File | null;
}

export default function EditMenu({
  params,
}: {
  params: { id: string; menuId: string };
}): JSX.Element {
  const [state, formAction] = useFormState(editMenu, { error: '' });
  const restaurant = useRestaurant();
  const { id, menuId } = params;
  const menu = restaurant?.menus?.find((m) => m.id === menuId);

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis.'),
    description: Yup.string().required('La description est requise'),
    items: Yup.array()
      .min(1, 'Au moins un article est requis')
      .required('Les articles sont requis.'),
    price: Yup.string().required('Le prix est requise.'),
  });

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Modifier un menu
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
          name: menu?.name || '',
          description: menu?.description || '',
          items: menu?.items?.map((item) => item.id) || [],
          price: menu?.price || 0,
          'menu-picture': null,
        }}
        validationSchema={schema}
        onSubmit={(values: ArticleFormValues) => {
          console.log(values);
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            if (key === 'items') {
              value.forEach((item: string) => {
                formData.append('itemIDs', item);
              });
              return;
            }
            formData.append(key, value);
          });
          formAction({
            restaurantId: id,
            menuId,
            formData,
          });
        }}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full gap-4"
          >
            <ClickableImageInput
              name="menu-picture"
              handleFile={(file) => setFieldValue('menu-picture', file)}
              defaultValue={
                <ImageWithDefaultOnError
                  src={`${process.env.NEXT_PUBLIC_API_URL}/menu/${menu?.menuPicture}/picture`}
                  alt="menu-picture"
                  className="w-32 h-32 rounded-full"
                  defaultReactNode={<InsertPhotoOutlined fontSize="large" />}
                  forceDefault={!menu?.menuPicture}
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
              label="Articles"
              name="items"
              onChange={handleChange}
              select
              SelectProps={{
                multiple: true,
                value: values.items,
                onBlur: handleBlur,
                renderValue: (selected) =>
                  (selected as string[])
                    .map((value) => {
                      const item = restaurant?.items?.find((i) => i.id === value);
                      return item?.name;
                    })
                    .join(', '),
              }}
              error={Boolean(errors.items && touched.items)}
              helperText={errors.items && touched.items ? errors.items : ''}
              InputProps={{
                className: `${errors.items && touched.items ? 'bg-red-100' : ''}`,
              }}
            >
              {restaurant?.items ? (
                restaurant.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    <Checkbox checked={values.items.indexOf(item.id) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Aucun article</MenuItem>
              )}
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
                href="/restaurant/management"
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
