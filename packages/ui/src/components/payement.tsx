import React from 'react';
import { FormikProps } from 'formik';
import { Grid, InputAdornment, InputLabel, Typography, TextField as Input } from '@mui/material';
import { CalendarToday, CreditCard } from '@mui/icons-material';
import { HelperText } from './helperText';

interface PaymentFormProps {
  formik: FormikProps<Record<string, string>>;
}

export function PaymentForm({ formik }: PaymentFormProps) {
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

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
                <InputLabel
                  className="ui-text-gray-2"
                  htmlFor="Nom sur la carte"
                  error={Boolean(formik.errors.cardName && formik.touched.cardName)}
                >
                  Nom sur la carte
                </InputLabel>
                <Input
                  fullWidth
                  id="cardName"
                  name="cardName"
                  value={formik.values.cardName.replace(/\d+/g, '')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.errors.cardName && formik.touched.cardName)}
                  placeholder="e.g John Doe"
                />
                {Boolean(formik.errors.cardName && formik.touched.cardName) && (
                  <HelperText error>errors.cardName</HelperText>
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
            >
              <div className="ui-pb-2">
                <InputLabel className="ui-text-gray-2">Numéro de la carte</InputLabel>
                <Input
                  fullWidth
                  id="cardNumber"
                  name="cardNumber"
                  value={formatCardNumber(formik.values.cardNumber)}
                  onChange={(e) => {
                    e.target.value = formatCardNumber(e.target.value);
                    formik.handleChange(e);
                  }}
                  error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                  inputProps={{ maxLength: 19 }}
                  placeholder="1234 1234 1234 1234"
                  onBlur={formik.handleBlur}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard />
                      </InputAdornment>
                    ),
                  }}
                />
                {Boolean(formik.errors.cardNumber && formik.touched.cardNumber) && (
                  <HelperText error>errors.cardNumber</HelperText>
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <InputLabel className="ui-text-gray-2">Date d'expiration</InputLabel>
              <Input
                variant="outlined"
                fullWidth
                id="expiryDate"
                name="expiryDate"
                value={formik.values.expiryDate}
                onChange={(e) => {
                  e.target.value = formatExpiryDate(e.target.value);
                  formik.handleChange(e);
                }}
                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarToday />
                    </InputAdornment>
                  ),
                }}
                onBlur={formik.handleBlur}
                placeholder="MM/YY"
              />
              {Boolean(formik.errors.expiryDate && formik.touched.expiryDate) && (
                <HelperText error>errors.expiryDate</HelperText>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <InputLabel className="ui-text-gray-2">CVV</InputLabel>
              <Input
                variant="outlined"
                fullWidth
                id="cvv"
                name="cvv"
                value={formik.values.cvv.replace(/\D/g, '')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                helperText={formik.touched.cvv && formik.errors.cvv}
                inputProps={{ maxLength: 3 }}
                placeholder="123"
              />
              {Boolean(formik.errors.cvv && formik.touched.cvv) && (
                <HelperText error>errors.cvv</HelperText>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
