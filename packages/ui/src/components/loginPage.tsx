'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { login, redirectTo, StyledTextField } from '@repo/ui';
import { Formik } from 'formik';
import { Alert, Button, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormValues {
  email: string;
  password: string;
}

interface LoginPageProps {
  logo: React.ReactNode;
}

export function LoginPage({ logo }: LoginPageProps): JSX.Element {
  const [state, formAction] = useFormState(login, { error: '' });
  const [showPassword, setShowPassword] = React.useState(false);
  const schema = Yup.object().shape({
    email: Yup.string().email("L'email n'est pas valide.").required("L'email est requis."),
    password: Yup.string().required('Le mot de passe est requis.'),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="ui-w-full ui-h-full ui-flex ui-flex-col ui-justify-center ui-items-center ui-gap-4">
      {logo}
      <Typography
        variant="h4"
        className="font-bold"
      >
        Connexion
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
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values: FormValues) => {
          console.log(values);
          formAction(values);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="ui-flex ui-flex-col ui-gap-4 ui-w-full"
          >
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
              label="Password"
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

            <div className="ui-flex ui-flex-row ui-w-full ui-justify-between ui-gap-4 ui-items-center ui-mt-6">
              <Button
                className="ui-w-1/2 ui-border-primary ui-text-primary ui-rounded-xl hover:ui-border-secondary hover:ui-text-secondary"
                type="button"
                onClick={() => redirectTo('/auth/signup')}
                variant="outlined"
              >
                S'inscrire
              </Button>
              <Button
                type="submit"
                className="ui-w-1/2 ui-bg-primary ui-text-white ui-rounded-xl hover:ui-bg-secondary"
                variant="contained"
              >
                Se connecter
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}