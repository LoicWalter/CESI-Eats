'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import {
  ClickableImageInput,
  PhoneInput,
  StyledButton,
  StyledOutlinedButton,
  StyledTextField,
  createClientUser,
  redirectTo,
} from '@repo/ui';
import { Formik } from 'formik';
import { Button, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';

interface FormValues {
  profilePicture: File | null;
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupPageProps {
  action: (
    _: any,
    data: FormData,
  ) => Promise<{
    error: string;
  }>;
}
const phoneRegExp = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;

export function SignupPage({ action }: SignupPageProps): JSX.Element {
  const [state, formAction] = useFormState(action, { error: '' });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const searchParams = useSearchParams();

  const schema = Yup.object().shape({
    name: Yup.string().required('Le nom est requis.'),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, 'Le numéro de téléphone est invalide.')
      .required('Le numéro de téléphone est requis.'),
    email: Yup.string().email().required("L'email est requis."),
    password: Yup.string().required('Le mot de passe est requis.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Les mots de passe ne correspondent pas.')
      .required('La confirmation du mot de passe est requise.'),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="ui-w-full ui-h-full ui-flex ui-flex-col ui-justify-center ui-items-center ui-gap-4">
      <Typography
        variant="h4"
        className="font-bold"
      >
        Inscription
      </Typography>
      {state?.error ? <p>{state.error}</p> : null}
      <Formik
        initialValues={{
          profilePicture: null,
          name: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={schema}
        onSubmit={(values: FormValues) => {
          console.log(values);
          const formData = new FormData();
          const parrain = searchParams.get('parrainId');
          if (parrain) {
            formData.append('parrainId', parrain);
          }
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });
          formAction(formData);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <form
            onSubmit={handleSubmit}
            className="ui-flex ui-flex-col ui-gap-4 ui-w-full ui-justify-center items-center"
          >
            <ClickableImageInput
              name="profilePicture"
              handleFile={(file) => setFieldValue('profilePicture', file)}
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
                className: `${errors.name && touched.name ? 'ui-bg-red-100' : ''}`,
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
                className: `${errors.phoneNumber && touched.phoneNumber ? 'ui-bg-red-100' : ''}`,
              }}
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email && touched.email ? errors.email : ''}
              InputProps={{
                className: `${errors.email && touched.email ? 'ui-bg-red-100' : ''}`,
              }}
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              label="Mot de passe"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password && touched.password)}
              helperText={errors.password && touched.password ? errors.password : ''}
              InputProps={{
                className: `${errors.password && touched.password ? 'ui-bg-red-100' : ''}`,
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <StyledTextField
              fullWidth
              variant="outlined"
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.confirmPassword && touched.confirmPassword)}
              helperText={
                errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''
              }
              InputProps={{
                className: `${errors.confirmPassword && touched.confirmPassword ? 'ui-bg-red-100' : ''}`,
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <div className="ui-flex ui-flex-row ui-w-full ui-justify-between ui-gap-4 ui-items-center ui-mt-6">
              <StyledOutlinedButton
                className="ui-w-1/2 ui-border-primary ui-text-primary ui-rounded-xl"
                type="button"
                onClick={() => redirectTo('/auth/login')}
                variant="outlined"
              >
                Se connecter
              </StyledOutlinedButton>
              <StyledButton
                type="submit"
                className="ui-w-1/2 ui-bg-primary ui-text-white ui-rounded-xl"
                variant="contained"
              >
                S'inscrire
              </StyledButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
