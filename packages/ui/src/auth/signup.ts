'use server';
import { redirect } from 'next/navigation';
import { defaultWebRoutes } from '../constants';
import { post, getErrorMessage } from '@repo/ui';
import { PrismaUsers } from '@api/cesieats';

enum UserTypes {
  CLIENT = 'client',
  RESTAURATEUR = 'restaurateur',
  LIVREUR = 'livreur',
}

const createUser = (userType: UserTypes) => async (_: any, data: FormData) => {
  const { res, parsedRes } = await post<PrismaUsers.User>(
    `/auth/signup/${userType}`,
    {
      body: data,
    },
    true,
  );
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  redirect(defaultWebRoutes.LOGIN);
};

export const createClientUser = createUser(UserTypes.CLIENT);
export const createRestaurateurUser = createUser(UserTypes.RESTAURATEUR);
export const createLivreurUser = createUser(UserTypes.LIVREUR);
