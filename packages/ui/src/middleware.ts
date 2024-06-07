import type { NextRequest } from 'next/server';
import { Cookies, defaultWebRoutes } from './constants';

export const commonMiddleware =
  (app: defaultWebRoutes) =>
  (request: NextRequest): Response | undefined => {
    const currentUser = request.cookies.get(Cookies.User)?.value;

    const authRoutes = [defaultWebRoutes.LOGIN, defaultWebRoutes.SIGNUP];

    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

    if (currentUser && isAuthRoute) {
      return Response.redirect(new URL(app, request.url));
    }

    if (!currentUser && !isAuthRoute) {
      return Response.redirect(new URL(`${app}${defaultWebRoutes.LOGIN}`, request.url));
    }
  };
