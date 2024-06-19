'use client';

import React from 'react';
import {
  Typography,
  MenuItem,
  Chip,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useFormState } from 'react-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { ClickableImageInput, StyledButton, StyledOutlinedButton, StyledTextField } from '@repo/ui';
import { InsertPhotoOutlined } from '@mui/icons-material';
import Link from 'next/link';

interface ArticleFormValues {
  name: string;
  description: string;
  articles: string[];
  price: number;
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

const articles = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function page({ action }: CreateArticlePageProps): JSX.Element {
  const [state, formAction] = useFormState(action, { error: '' });

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis.'),
    description: Yup.string().required('La description est requise'),
    articles: Yup.array()
      .min(1, 'Au moins un article est requis')
      .required('Les articles sont requis.'),
    price: Yup.string().required('Le prix est requise.'),
  });

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Ajouter un menu
      </Typography>
      {state?.error ? <p>{state.error}</p> : null}
      <Formik
        initialValues={{
          name: '',
          description: '',
          articles: [],
          price: 0,
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
              label="Articles"
              name="articles"
              onChange={handleChange}
              select
              SelectProps={{
                multiple: true,
                value: values.articles,
                onBlur: handleBlur,
                renderValue: (selected) => (selected as string[]).join(', '),
              }}
              error={Boolean(errors.articles && touched.articles)}
              helperText={errors.articles && touched.articles ? errors.articles : ''}
              InputProps={{
                className: `${errors.articles && touched.articles ? 'bg-red-100' : ''}`,
              }}
            >
              {articles.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  <Checkbox checked={values.articles.indexOf(name) > -1} />
                  <ListItemText primary={name} />
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
