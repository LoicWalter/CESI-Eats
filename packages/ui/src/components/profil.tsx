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
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Formik } from 'formik';
import { HelperText } from './helperText';
import {
  Edit,
  EditOff,
  PersonAdd,
  ShowChart,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

interface UserProps {
  user: { username: string; email: string; mobile: string; password: string };
  picture: React.ReactElement;
}

const parrainage = {
  1: 'Cholé Vermeil',
  2: 'Patris Duval',
  3: 'Veronique Dumont',
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

  return (
    <Formik
      initialValues={{
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
      }}
      onSubmit={(values: Record<string, any>) => console.log(values)}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="flex w-full"
        >
          <div className="flex flex-col w-full gap-12 p-12">
            <div className="flex flex-row gap-24">
              <div className="flex flex-col gap-12 w-1/3">
                <div>{picture}</div>
                <div>
                  <Typography variant="h4">Informations essentielles</Typography>
                  {Object.entries(keys).map(([key, value], index) => (
                    <FormControl
                      fullWidth
                      sx={{ m: 1 }}
                      variant="standard"
                    >
                      <Typography variant="h6">{value}</Typography>
                      <Input
                        id={key}
                        name={key}
                        value={values[key]}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {/* {errors.username && touched.username && (
                  <HelperText severity="error">{errors.username}</HelperTex>
                )} */}
                    </FormControl>
                  ))}
                </div>
              </div>
              <div className="flex flex-col mt-30 w-1/2 gap-4">
                <FormControl
                  fullWidth
                  variant="standard"
                >
                  <Typography variant="h6">Adresse favorite</Typography>
                  <Select
                    fullWidth
                    className="overflow-ellipsis"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={adress}
                    onChange={handleChangeAdress}
                    label="Adresse favorite"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem
                      value={1}
                      sx={{ whiteSpace: 'normal', wordWrap: 'break-all' }}
                    >
                      21 avenue du général de Gaulle Esplanade Strasbourg 67600
                    </MenuItem>
                    <MenuItem
                      value={2}
                      sx={{ whiteSpace: 'normal', wordWrap: 'break-all' }}
                    >
                      51 Rue des cerises Eckbolsheim 67201
                    </MenuItem>
                    <MenuItem value={3}>2 allée des foulons Lingolsheim 67380</MenuItem>
                  </Select>
                </FormControl>
                <div className="flex flex-col gap-2">
                  <Typography variant="h6">Parrainage</Typography>
                  {Object.entries(parrainage).map(([key, value], index) => (
                    <>
                      <Typography
                        key={key}
                        variant="body1"
                      >
                        {value}
                      </Typography>
                      <Divider />
                    </>
                  ))}
                  <div className="flex flex-row gap-2 items-center">
                    <Typography variant="body1">Parrainer un ami</Typography>

                    <IconButton>
                      <PersonAdd />
                    </IconButton>
                  </div>
                  <Divider />
                </div>
                <div className="flex flex-col gap-2">
                  <Typography variant="h6">Moyen de payement favoris</Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 justify-end w-full">
              <Button
                variant="outlined"
                className="bg-gray-5 text-primary hover:text-secondary w-1/5 border-primary rounded-lg hover:border-secondary hover:bg-gray-5"
              >
                Annuler
              </Button>
              <Button
                variant="outlined"
                type="submit"
                className="bg-primary text-white hover:bg-secondary rounded-lg border-primary hover:border-secondary w-1/5"
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
