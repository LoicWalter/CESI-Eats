'use server';
import { post } from './utils';
import { redirect } from 'next/navigation';
import { FormError } from './utils';
import { defaultWebRoutes } from '../constants';

enum UserTypes {
  CLIENT = 'client',
  RESTAURATEUR = 'restaurateur',
  LIVREUR = 'livreur',
}

const createUser = (userType: UserTypes) => async (_prevState: FormError, formData: FormData) => {
  const { error } = (await post(
    `http://localhost:7000/auth/signup/${userType}`,
    formData,
  )) as FormError;
  if (error) {
    return { error };
  }
  redirect(defaultWebRoutes.LOGIN);
};

export const createClientUser = createUser(UserTypes.CLIENT);
export const createRestaurateurUser = createUser(UserTypes.RESTAURATEUR);
export const createLivreurUser = createUser(UserTypes.LIVREUR);
