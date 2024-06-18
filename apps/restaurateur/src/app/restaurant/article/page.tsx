'use client';

import React from 'react';
import { Typography, MenuItem } from '@mui/material';
import { useFormState } from 'react-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  ClickableImageInput,
  StyledButton,
  StyledOutlinedButton,
  StyledTextField,
  redirectTo,
} from '@repo/ui';
import { InsertPhotoOutlined } from '@mui/icons-material';
import Link from 'next/link';

interface ArticleFormValues {
  name: string;
  description: string;
  regime: string;
  price: number;
  category: string;
  picture: File | null;
}

interface CreateArticlePageProps {
  action: (
    _: any,
    data: FormData,
  ) => Promise<{
    error: string;
  }>;
}

export default function page({ action }: CreateArticlePageProps): JSX.Element {
  const [state, formAction] = useFormState(action, { error: '' });

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis.'),
    description: Yup.string().required('La description est requise'),
    regime: Yup.string().required('Le régime est requis.'),
    category: Yup.string().required("La catégorie d'article est requise."),
    price: Yup.string().required('Le prix est requise.'),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Ajouter un article
      </Typography>
      {state?.error ? <p>{state.error}</p> : null}
      <Formik
        initialValues={{
          name: '',
          description: '',
          regime: '',
          price: 0,
          category: '',
          picture: null,
        }}
        validationSchema={schema}
        onSubmit={(values: ArticleFormValues) => {
          console.log(values);
          const formData = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          //formAction(formData);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full justify-center items-center"
          >
            <ClickableImageInput
              name="articlePicture"
              handleFile={(file) => setFieldValue('articlePicture', file)}
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
              <MenuItem value="vegan">Vegan</MenuItem>
              <MenuItem value="vegetarien">Végétarien</MenuItem>
              <MenuItem value="sans-gluten">Sans gluten</MenuItem>
              <MenuItem value="halal">Halal</MenuItem>
              <MenuItem value="casher">Poisson</MenuItem>
              <MenuItem value="viande">Kasher</MenuItem>
              <MenuItem value="viande">Viande</MenuItem>
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
              <MenuItem value="entree">Entrée</MenuItem>
              <MenuItem value="plat">Plat</MenuItem>
              <MenuItem value="dessert">Dessert</MenuItem>
              <MenuItem value="boisson">Boisson</MenuItem>
              <MenuItem value="autres">Autres</MenuItem>
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
            <div className="flex flex-row w-full justify-between gap-4 items-center mt-6">
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
