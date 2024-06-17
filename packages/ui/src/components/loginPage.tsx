'use client';

import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { login, redirectTo, StyledTextField, StyledButton, StyledOutlinedButton } from '@repo/ui';
import { Formik } from 'formik';
import { Alert, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormValues {
  email: string;
  password: string;
  mustBeAdmin?: boolean;
}

interface LoginPageProps {
  logo: React.ReactNode;
  mustBeAdmin?: boolean;
}

export function LoginPage({ logo, mustBeAdmin }: LoginPageProps): JSX.Element {
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
        className="ui-font-bold"
      >
        Connexion
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
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values: FormValues) => {
          console.log(values);
          if (mustBeAdmin) {
            values.mustBeAdmin = true;
          }
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

            <div
              className={`ui-flex ui-flex-row ui-w-full ${mustBeAdmin ? 'ui-justify-end' : 'ui-justify-between'} ui-gap-4 ui-items-center ui-mt-6`}
            >
              {!mustBeAdmin && (
                <StyledOutlinedButton
                  className="ui-w-1/2 ui-border-primary ui-text-primary ui-rounded-xl"
                  type="button"
                  onClick={() => redirectTo('/auth/signup')}
                  variant="outlined"
                >
                  S'inscrire
                </StyledOutlinedButton>
              )}
              <StyledButton
                type="submit"
                className="ui-w-1/2 ui-bg-primary ui-text-white ui-rounded-xl"
                variant="contained"
              >
                Se connecter
              </StyledButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
