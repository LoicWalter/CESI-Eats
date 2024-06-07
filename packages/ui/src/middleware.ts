import type { NextRequest } from 'next/server';
import { Cookies, defaultWebRoutes } from './constants';

export const commonMiddleware =
  (app: defaultWebRoutes) =>
  (request: NextRequest): Response | undefined => {
    const currentUser = request.cookies.get(Cookies.User)?.value;

    if (currentUser && request.nextUrl.pathname.startsWith(defaultWebRoutes.AUTH)) {
      return Response.redirect(new URL(app, request.url));
    }

    if (!currentUser && !request.nextUrl.pathname.startsWith(defaultWebRoutes.AUTH)) {
      return Response.redirect(new URL(`${app}${defaultWebRoutes.LOGIN}`, request.url));
    }
  };
