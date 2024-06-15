import type { NextRequest } from 'next/server';
import { Cookies, defaultWebRoutes } from './constants';
import { PrismaUsers } from '@api/cesieats';

export const commonMiddleware =
  (app: defaultWebRoutes, role: PrismaUsers.Role) =>
  (request: NextRequest): Response | undefined => {
    const currentUser = request.cookies.get(Cookies.User)?.value;
    const authCookie = request.cookies.get(Cookies.Authentication)?.value;
    const isLogged = Boolean(currentUser && authCookie);
    const currentPathName = request.nextUrl.pathname;

    const userRole = JSON.parse(currentUser || '{}')?.roles;

    const authRoutes = [defaultWebRoutes.LOGIN, defaultWebRoutes.SIGNUP];
    const routesNeedAuth = [defaultWebRoutes.PROFILE, defaultWebRoutes.PAYMENT];
    const routesNeedRole = [
      defaultWebRoutes.PROFILE,
      defaultWebRoutes.PAYMENT,
      defaultWebRoutes.DASHBOARD,
    ];

    const isAuthRoute = authRoutes.some((route) => currentPathName.startsWith(route));

    if (isLogged && isAuthRoute) {
      return Response.redirect(new URL(app, request.url));
    }

    if (userRole && userRole.includes(role)) {
      return Response.redirect(new URL(`${app}${defaultWebRoutes.LOGOUT}`, request.url));
    }

    if (routesNeedRole.some((route) => currentPathName.startsWith(route))) {
      if(!userRole || !userRole.includes(role)) {
        return Response.redirect(new URL(`${app}${defaultWebRoutes.LOGIN}`, request.url));
      }
    }

    if (!isLogged && routesNeedAuth.some((route) => currentPathName.startsWith(route))) {
      return Response.redirect(new URL(`${app}${defaultWebRoutes.LOGIN}`, request.url));
    }
  };
