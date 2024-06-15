import React from 'react';
import { FormikProps } from 'formik';
import { Grid, InputAdornment, Typography } from '@mui/material';
import { CalendarToday, CreditCard } from '@mui/icons-material';
import { StyledTextField } from './styledTextField';

type FormValues<T> = {
  cardNumber: string | null;
  cardExpiration: string | null;
  cardCvc: string | null;
  cardOwner: string | null;
} & T;

interface PaymentFormProps<T> {
  formik: FormikProps<FormValues<T>>;
}

export function PaymentForm<T extends Record<string, any>>({ formik }: PaymentFormProps<T>) {
  const formatCardNumber = (value: string) =>
    value
      ?.replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();

  const formatExpiryDate = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Limit to four numeric characters
    const formattedValue = numericValue.slice(0, 4);

    // Add the '/' separator after the first two characters
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + ' / ' + formattedValue.slice(2);
    } else {
      return formattedValue;
    }
  };

  return (
    <div className="ui-py-2 ui-px-2">
      <div>
        <Typography
          variant="h4"
          className="ui-fw-500 ui-text-center ui-pb-2"
        >
          Carte de crédit
        </Typography>

        <div>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              sm={12}
            >
              <div className="ui-pb-2">
                <StyledTextField
                  fullWidth
                  label="Nom du titulaire de la carte"
                  id="cardOwner"
                  name="cardOwner"
                  value={formik.values.cardOwner?.replace(/\d+/g, '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.cardOwner && formik.errors.cardOwner)}
                  helperText={
                    formik.touched.cardOwner && formik.errors.cardOwner
                      ? (formik.errors.cardOwner as string)
                      : ''
                  }
                  placeholder="Nom du titulaire de la carte"
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
            >
              <div className="ui-pb-2">
                <StyledTextField
                  fullWidth
                  label="Numéro de carte"
                  id="cardNumber"
                  name="cardNumber"
                  value={formatCardNumber(formik.values.cardNumber || '')}
                  onChange={(e) => {
                    formik.setFieldValue('cardNumber', e.target.value.replace(/\s/g, ''));
                  }}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.cardNumber && formik.errors.cardNumber)}
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                      ? (formik.errors.cardNumber as string)
                      : ''
                  }
                  placeholder="Numéro de carte"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <StyledTextField
                fullWidth
                label="Date d'expiration"
                id="cardExpiration"
                name="cardExpiration"
                value={formatExpiryDate(formik.values.cardExpiration || '')}
                onChange={(e) => {
                  formik.setFieldValue('cardExpiration', e.target.value.replace(/\s/g, ''));
                }}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.cardExpiration && formik.errors.cardExpiration)}
                helperText={
                  formik.touched.cardExpiration && formik.errors.cardExpiration
                    ? (formik.errors.cardExpiration as string)
                    : ''
                }
                placeholder="MM/YY"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <StyledTextField
                fullWidth
                label="CVV"
                id="cardCvc"
                name="cardCvc"
                value={formik.values.cardCvc?.replace(/\D/g, '')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.cardCvc && formik.errors.cardCvc)}
                helperText={
                  formik.touched.cardCvc && formik.errors.cardCvc
                    ? (formik.errors.cardCvc as string)
                    : ''
                }
                placeholder="123"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
