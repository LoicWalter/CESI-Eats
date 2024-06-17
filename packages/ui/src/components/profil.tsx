'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Button, Divider, IconButton, Modal, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Close,
  CreditCard,
  Edit,
  EditOff,
  Key,
  PersonAdd,
  PersonOutline,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { PaymentForm } from './payement';
import { ImageWithDefaultOnError, useUser } from '../utils';
import { ClickableImageInput } from './clickableImageInput';
import { StyledTextField } from './styledTextField';
//@ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PhoneInput } from './phoneInput';
import { useFormState } from 'react-dom';
import { editUser } from '../actions/edit-user';
import { deleteUser } from '../auth';
import { StyledButton, StyledOutlinedButton } from './styledButton';
const card = (
  cardOwner: string | null,
  cardNumber: string | null,
  cardExpiration: string | null,
  cardCvc: string | null,
) => {
  if (!cardOwner || !cardNumber || !cardExpiration || !cardCvc) {
    return 'Ajouter une carte banquaire';
  }
  cardNumber = cardNumber.replace(/^.{14}/g, '**** **** ****').trim();
  return (
    <div className="ui-w-full ui-flex ui-flex-row ui-gap-6">
      <Typography variant="body1">{cardNumber}</Typography>
      <Typography variant="body1">{cardExpiration}</Typography>
    </div>
  );
};

const phoneRegExp = /^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/;

const schema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis.'),
  email: Yup.string().email().required("L'email est requis."),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, 'Le numéro de téléphone est invalide.')
    .required('Le numéro de téléphone est requis'),
  password: Yup.string(),
  cardNumber: Yup.string().matches(/^[0-9]{16}$/, 'Le numéro de carte est invalide'),
  cardExpiration: Yup.string()
    .test('valid-month', 'Le mois est invalide', function (value) {
      if (!value) {
        return false;
      }

      const [month] = value.split('/').map((item) => parseInt(item, 10));

      return month >= 1 && month <= 12;
    })
    .test('is-future-date', "La date d'expiration doit être future", function (value) {
      if (!value) {
        return false;
      }

      const currentDate = new Date();
      const [month, year] = value.split('/').map((item) => parseInt(item, 10));

      // Adding 1 to the month because JavaScript months are zero-indexed
      const expiryDate = new Date(year + 2000, month, 1);

      return expiryDate > currentDate;
    }),
  cardOwner: Yup.string(),
  cardCvc: Yup.string().matches(/^[0-9]{3,4}$/, 'Le code de sécurité est invalide'),
});

export interface FormValues {
  email: string;
  password: string;
  profilePicture: File | null;
  name: string;
  phoneNumber: string;
  address: string;
  cardNumber: string;
  cardExpiration: string;
  cardCvc: string;
  cardOwner: string;
}

interface ProfilProps {
  page: string;
}

export function Profil({ page }: ProfilProps): JSX.Element {
  const [state, formAction] = useFormState(editUser, { error: '' });
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isApiKeyCopied, setIsApiKeyCopied] = useState(false);
  const user = useUser();

  const [update, setUpdate] = React.useState<Record<string, boolean>>({
    name: false,
    email: false,
    phoneNumber: false,
    password: false,
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickUpdate = (field: string) =>
    setUpdate((update) => ({ ...update, [field]: !update[field] }));

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Formik
      initialValues={{
        email: user?.email || '',
        password: '',
        profilePicture: null,
        name: user?.name || '',
        phoneNumber: user?.phoneNumber || '',
        address: user?.address || '',
        cardNumber: user?.cardNumber || '',
        cardExpiration: user?.cardExpiration || '',
        cardCvc: user?.cardCvc || '',
        cardOwner: user?.cardOwner || '',
      }}
      onSubmit={(values: FormValues) => {
        console.log(values);

        //remove empty fields
        Object.keys(values).forEach((key) => {
          if (!values[key as keyof FormValues]) {
            delete values[key as keyof FormValues];
          }
        });

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formAction(formData);
      }}
      validationSchema={schema}
      enableReinitialize={true}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="ui-flex ui-w-full"
        >
          <div className="ui-flex ui-flex-col ui-w-full ui-gap-12 ui-p-12">
            <div className="ui-justify-center ui-align-center ui-flex">
              <ClickableImageInput
                name="profilePicture"
                handleFile={(file) => formik.setFieldValue('profilePicture', file)}
                defaultValue={
                  <ImageWithDefaultOnError
                    alt="profil"
                    className="ui-rounded-full ui-aspect-square ui-object-cover ui-object-center ui-h-48 ui-w-48 ui-justify-center"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/auth/profilePicture/${user?.profilePicture}`}
                    defaultReactNode={<PersonOutline className="ui-h-48 ui-w-48" />}
                    width={64}
                    height={64}
                    forceDefault={user === undefined}
                  />
                }
              />
            </div>
            {state.error && (
              <Alert
                severity="error"
                className="ui-w-full"
              >
                {state.error}
              </Alert>
            )}

            <div className="ui-flex ui-flex-col ui-w-full ui-h-full gap-8">
              <div className="ui-flex ui-flex-col md:ui-flex-row md:ui-gap-24 ui-gap-4 md:ui-justify-center">
                <div className="ui-flex ui-flex-col ui-gap-6 ui-w-full md:ui-w-2/5">
                  <Typography
                    variant="h4"
                    className="ui-text-center"
                  >
                    Informations essentielles
                  </Typography>
                  <StyledTextField
                    key="name"
                    id="name"
                    name="name"
                    label="Nom d'utilisateur"
                    value={formik.values.name}
                    disabled={!update.name}
                    variant="standard"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.errors.name && formik.touched.name)}
                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="update"
                          onClick={() => handleClickUpdate('name')}
                          edge="end"
                        >
                          {update['name'] ? <EditOff /> : <Edit />}
                        </IconButton>
                      ),
                    }}
                  />
                  <StyledTextField
                    key="email"
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    disabled={!update.email}
                    variant="standard"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.errors.email && formik.touched.email)}
                    helperText={
                      formik.touched.email && formik.errors.email ? formik.errors.email : ''
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="update"
                          onClick={() => handleClickUpdate('email')}
                          edge="end"
                        >
                          {update['email'] ? <EditOff /> : <Edit />}
                        </IconButton>
                      ),
                    }}
                  />
                  <PhoneInput
                    key="phoneNumber"
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Numéro de téléphone"
                    value={formik.values.phoneNumber}
                    disabled={!update.phoneNumber}
                    variant="standard"
                    type="tel"
                    onChange={(e) => {
                      formik.setFieldValue('phoneNumber', e);
                    }}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.errors.phoneNumber && formik.touched.phoneNumber)}
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? formik.errors.phoneNumber
                        : ''
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          aria-label="update"
                          onClick={() => handleClickUpdate('phoneNumber')}
                          edge="end"
                        >
                          {update['phoneNumber'] ? <EditOff /> : <Edit />}
                        </IconButton>
                      ),
                    }}
                  />
                  <StyledTextField
                    key="password"
                    id="password"
                    name="password"
                    label="Mot de passe"
                    value={formik.values.password}
                    disabled={!update.password}
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.errors.password && formik.touched.password)}
                    helperText={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : ''
                    }
                    InputProps={{
                      endAdornment: (
                        <div className="ui-flex ui-flex-row ui-gap-2">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                          <IconButton
                            aria-label="update"
                            onClick={() => handleClickUpdate('password')}
                            edge="end"
                          >
                            {update['password'] ? <EditOff /> : <Edit />}
                          </IconButton>
                        </div>
                      ),
                    }}
                  />
                </div>
                <div className="ui-flex ui-flex-col ui-gap-6 ui-w-full md:ui-w-2/5">
                  <Typography
                    variant="h4"
                    className="ui-text-center"
                  >
                    Informations complémentaires
                  </Typography>
                  <StyledTextField
                    key="address"
                    id="address"
                    name="address"
                    label="Adresse"
                    value={formik.values.address}
                    variant="standard"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.errors.address && formik.touched.address)}
                    helperText={
                      formik.touched.address && formik.errors.address ? formik.errors.address : ''
                    }
                  />
                  <div className="ui-flex ui-flex-col ui-gap-2">
                    <Typography variant="h6">Parrainage</Typography>
                    {user?.parrain && (
                      <>
                        <Typography
                          variant="body1"
                          className="ui-p-2"
                        >
                          Parrainné par : {user.parrain.name}
                        </Typography>
                        <Divider />
                      </>
                    )}
                    {user?.filleuls?.map((filleul) => (
                      <React.Fragment key={filleul.id}>
                        <Typography
                          variant="body1"
                          className="ui-p-2"
                        >
                          {filleul.name}
                        </Typography>
                        <Divider />
                      </React.Fragment>
                    ))}
                    <div className="ui-flex ui-flex-row ui-gap-2 ui-items-center">
                      <CopyToClipboard
                        text={`${page}/auth/signup?parrainId=${user?.id}`}
                        onCopy={() => {
                          setIsLinkCopied(true);
                          setTimeout(() => setIsLinkCopied(false), 3000);
                        }}
                      >
                        <span className="ui-flex ui-flex-row ui-gap-2 ui-items-center hover:ui-bg-gray-4 ui-rounded-lg ui-p-2 ui-cursor-pointer">
                          <Typography variant="body1">Parrainer un ami</Typography>
                          <PersonAdd className="ui-p-0" />
                        </span>
                      </CopyToClipboard>
                      {isLinkCopied && (
                        <Typography
                          variant="body1"
                          className="ui-text-green-500"
                        >
                          Lien d'invitation copié !
                        </Typography>
                      )}
                    </div>
                    <Divider />
                  </div>
                  <div className="ui-flex ui-flex-col ui-gap-2">
                    <Typography variant="h6">Carte banquaire</Typography>
                    <div className="ui-flex ui-flex-row ui-gap-2 ui-items-center">
                      <div className="ui-justify-between ui-flex ui-flex-row ui-w-full">
                        <div className="ui-flex ui-flex-row ui-gap-2">
                          <CreditCard className="ui-opacity-55" />
                          {card(
                            formik.values.cardOwner,
                            formik.values.cardNumber,
                            formik.values.cardExpiration,
                            formik.values.cardCvc,
                          )}
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
                  <div className="ui-flex ui-flex-row ui-items-center ui-gap-2 ui-w-full">
                    <StyledOutlinedButton
                      variant="outlined"
                      className="ui-text-primary hover:ui-text-secondary ui-w-full ui-border-primary ui-rounded-lg hover:ui-border-secondary "
                    >
                      Annuler
                    </StyledOutlinedButton>
                    <StyledButton
                      type="submit"
                      className="ui-bg-primary hover:ui-bg-secondary ui-rounded-lg ui-border-primary hover:ui-border-secondary ui-w-full"
                    >
                      Enregistrer
                    </StyledButton>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="ui-flex ui-flex-col ui-gap-6 ui-w-96">
                <Typography variant="h5">Actions supplémentaires</Typography>
                <div className="ui-flex ui-flex-col ui-gap-4">
                  <div className="ui-flex ui-flex-row ui-gap-2 ui-items-center">
                    <CopyToClipboard
                      text={user?.apiKey || ''}
                      onCopy={() => {
                        setIsApiKeyCopied(true);
                        setTimeout(() => setIsApiKeyCopied(false), 3000);
                      }}
                    >
                      <span className="ui-flex ui-flex-row ui-gap-2 ui-items-center hover:ui-bg-gray-4 ui-rounded-lg ui-p-2 ui-cursor-pointer ui-w-full ui-justify-between ui-border-secondary ui-border">
                        <Typography variant="body1">Copier la clé API</Typography>
                        <Key />
                      </span>
                    </CopyToClipboard>
                    {isApiKeyCopied && (
                      <Typography
                        variant="body1"
                        className="ui-text-green-500"
                      >
                        Clé API copiée !
                      </Typography>
                    )}
                  </div>

                  <StyledButton
                    onClick={() => deleteUser()}
                    variant="contained"
                    type="button"
                    className="ui-bg-red-500 ui-text-white hover:ui-bg-red-700 ui-rounded-lg ui-border-red-500 hover:ui-border-red-700"
                  >
                    Supprimer le compte
                  </StyledButton>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}
