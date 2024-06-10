'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { HelperText, login } from '@repo/ui';
import { Formik } from 'formik';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormValues {
  email: string;
  password: string;
}

function Login(): JSX.Element {
  const [state, formAction] = useFormState(login, { error: '' });
  const [showPassword, setShowPassword] = React.useState(false);
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-52 flex flex-col justify-center items-center">
      <h1>Login</h1>
      <p>{state.error}</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values: FormValues) => formAction(values)}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
          >
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="standard"
            >
              <InputLabel
                htmlFor="email"
                error={Boolean(errors.email && touched.email)}
              >
                Email
              </InputLabel>
              <Input
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email && touched.email)}
              />
              {Boolean(errors.email && touched.email) && (
                <HelperText error>{errors.email}</HelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              variant="standard"
            >
              <InputLabel
                htmlFor="password"
                error={Boolean(errors.password && touched.password)}
              >
                Password
              </InputLabel>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password && touched.password)}
              />
              {Boolean(errors.password && touched.password) && (
                <HelperText error>{errors.password}</HelperText>
              )}
            </FormControl>

            <Button type="submit">Login</Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
