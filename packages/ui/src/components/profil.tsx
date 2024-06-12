'use client';

import React from 'react';
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { HelperText } from './helperText';
import {
  Close,
  CreditCard,
  Edit,
  EditOff,
  PersonAdd,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { PaymentForm } from './payement';

interface UserProps {
  user: {
    username: string;
    email: string;
    mobile: string;
    password: string;
    adress: string;
    cardName: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
  picture: React.ReactElement;
}

const parrainage = {
  1: 'Cholé Vermeil',
  2: 'Patris Duval',
  3: 'Veronique Dumont',
};

const card = (
  cardName: string | null,
  cardNumber: string | null,
  cardDate: string | null,
  cvv: string | null,
) => {
  if (!cardName || !cardNumber || !cardDate || !cvv) {
    return 'Ajouter une carte banquaire';
  }
  cardNumber = cardNumber.replace(/^.{14}/g, '**** **** ****').trim();
  return (
    <div className="ui-w-full ui-flex ui-flex-row ui-gap-6">
      <div>{cardNumber}</div>
      <div>{cardDate}</div>
    </div>
  );
};

export function Profil({ user, picture }: UserProps): JSX.Element {
  const keys: Record<string, string> = {
    username: "Nom d'utilisateur",
    email: 'Email',
    mobile: 'Mobile',
    password: 'Mot de passe',
  };

  const [update, setUpdate] = React.useState<Record<string, boolean>>({
    username: false,
    email: false,
    mobile: false,
    password: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const schema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    mobile: Yup.string().required(),
    password: Yup.string().required(),
    cardNumber: Yup.string()
      // .matches(/^[0-9]{16}$/, "Invalid card number")
      .required('Card number is required'),
    // expiryDate: yup.string().required("Expiry date is required"),
    expiryDate: Yup.string()
      .required('Expiry date is required')
      .test('valid-month', 'Invalid month', function (value) {
        if (!value) {
          return false;
        }

        const [month] = value.split('/').map((item) => parseInt(item, 10));

        return month >= 1 && month <= 12;
      })
      .test('is-future-date', 'Expiry date must be in the future', function (value) {
        if (!value) {
          return false;
        }

        const currentDate = new Date();
        const [month, year] = value.split('/').map((item) => parseInt(item, 10));

        // Adding 1 to the month because JavaScript months are zero-indexed
        const expiryDate = new Date(year + 2000, month, 1);

        return expiryDate > currentDate;
      }),
    name: Yup.string().required('Name is required'),
    cvv: Yup.string()
      .matches(/^[0-9]{3,4}$/, 'Invalid CVV')
      .required('CVV is required'),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [adress, setAdress] = React.useState('');

  const handleChangeAdress = (event: SelectChangeEvent) => {
    setAdress(event.target.value);
  };

  const handleClickUpdate = (field: string) =>
    setUpdate((update) => ({ ...update, [field]: !update[field] }));

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Formik
      initialValues={{
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
        adress: user.adress,
        cardName: user.cardName,
        cardNumber: user.cardNumber,
        expiryDate: user.expiryDate,
        cvv: user.cvv,
      }}
      onSubmit={(values: Record<string, any>) => console.log(values)}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="ui-flexui- w-full"
        >
          <div className="ui-flex ui-flex-col ui-w-full ui-gap-12 ui-p-12">
            <div className="ui-justify-center ui-align-center ui-flex">{picture}</div>
            <div className="ui-flex ui-flex-col md:ui-flex-row md:ui-gap-24 ui-gap-4">
              <div className="ui-flex ui-flex-col ui-gap-6 ui-w-full md:ui-w-2/5">
                <div>
                  <Typography variant="h4">Informations essentielles</Typography>
                  {Object.entries(keys).map(([key, value], index) => (
                    <FormControl
                      fullWidth
                      sx={{ m: 1 }}
                      variant="standard"
                    >
                      <InputLabel
                        htmlFor={key}
                        error={Boolean(formik.errors[key] && formik.touched[key])}
                        className="ui-text-xl"
                      >
                        {value}
                      </InputLabel>
                      <Input
                        id={key}
                        name={key}
                        value={formik.values[key]}
                        disabled={!update[key]}
                        type={key === 'password' && !showPassword ? 'password' : 'text'}
                        endAdornment={
                          <>
                            {key === 'password' && (
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
                            )}
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="update"
                                onClick={() => handleClickUpdate(key)}
                                edge="end"
                              >
                                {update[key] ? <EditOff /> : <Edit />}
                              </IconButton>
                            </InputAdornment>
                          </>
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={Boolean(formik.errors[key] && formik.touched[key])}
                      />
                      {Boolean(formik.errors[key] && formik.touched[key]) && (
                        <HelperText error>errors[key]</HelperText>
                      )}
                    </FormControl>
                  ))}
                </div>
              </div>
              <div className="ui-flex ui-flex-col ui-w-full md:ui-w-1/2 ui-gap-4 ui-justify-end">
                <FormControl
                  fullWidth
                  variant="standard"
                >
                  <Typography variant="h6">Adresse favorite</Typography>
                  <Select
                    fullWidth
                    className="ui-overflow-ellipsis"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={user.adress}
                    onChange={handleChangeAdress}
                    label="Adresse favorite"
                  >
                    <MenuItem value={user.adress}>
                      {user.adress ? user.adress : <em>None</em>}
                    </MenuItem>
                  </Select>
                </FormControl>
                <div className="ui-flex ui-flex-col ui-gap-2">
                  <Typography variant="h6">Parrainage</Typography>
                  {Object.entries(parrainage).map(([key, value], index) => (
                    <React.Fragment key={key}>
                      <Typography variant="body1">{value}</Typography>
                      <Divider />
                    </React.Fragment>
                  ))}
                  <div className="ui-flex ui-flex-row ui-gap-2 ui-items-center">
                    <Typography variant="body1">Parrainer un ami</Typography>

                    <IconButton className="ui-p-0">
                      <PersonAdd />
                    </IconButton>
                  </div>
                  <Divider />
                </div>
                <div className="ui-flex ui-flex-col ui-gap-2">
                  <Typography variant="h6">Carte banquaire</Typography>
                  <div className="ui-flex ui-flex-row ui-gap-2 ui-items-center">
                    <div className="ui-justify-between ui-flex ui-flex-row ui-w-full">
                      <div className="ui-flex ui-flex-row ui-gap-2">
                        <CreditCard className="ui-opacity-55" />

                        <Typography variant="body1">
                          {card(
                            formik.values.cardName,
                            formik.values.cardNumber,
                            formik.values.expiryDate,
                            formik.values.cvv,
                          )}
                        </Typography>
                      </div>
                      <IconButton
                        className="ui-p-0"
                        onClick={handleClickOpen}
                      >
                        <Edit />
                      </IconButton>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        className="ui-flex ui-justify-center ui-items-center "
                        title="Ajouter une carte banquaire"
                      >
                        <div className="ui-bg-gray-5 ui-m-8 ui-p-8 ui-rounded-lg ui-relative">
                          <IconButton
                            className="ui-absolute ui-top-4 ui-right-4"
                            onClick={handleClose}
                          >
                            <Close />
                          </IconButton>
                          <PaymentForm formik={formik} />
                          <Button
                            variant="outlined"
                            className="ui-bg-primary ui-text-white hover:ui-bg-secondary ui-rounded-lg ui-border-primary hover:ui-border-secondary ui-w-full ui-py-2 ui-mt-8"
                            onClick={handleClose}
                          >
                            Enregistrer
                          </Button>
                        </div>
                      </Modal>
                    </div>
                  </div>
                  <Divider />
                </div>
              </div>
            </div>
            <div className="ui-flex ui-flex-row ui-items-center ui-gap-2 ui-justify-end ui-w-full">
              <Button
                variant="outlined"
                className="ui-text-primary hover:ui-text-secondary md:ui-w-1/5 ui-w-full ui-border-primary ui-rounded-lg hover:ui-border-secondary "
              >
                Annuler
              </Button>
              <Button
                variant="outlined"
                type="submit"
                className="ui-bg-primary ui-text-white hover:ui-bg-secondary ui-rounded-lg ui-border-primary hover:ui-border-secondary md:ui-w-1/5 ui-w-full"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
