import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): Response | undefined {
  const role = 'CLIENT';
  const app = '/client';
  const currentUser = request.cookies.get('User')?.value;
  const authCookie = request.cookies.get('Authentication')?.value;
  const isLogged = Boolean(currentUser && authCookie);
  const currentPathName = request.nextUrl.pathname;

  const userRole = JSON.parse(currentUser || '{}')?.roles;

  const authRoutes = ['/auth/login', '/auth/signup'];
  const routesNeedAuth = ['/profil', '/paiement'];
  const routesNeedRole = ['/profil', '/paiement', '/dashboard'];

  const isAuthRoute = authRoutes.some((route) => currentPathName.startsWith(route));

  if (isLogged && isAuthRoute) {
    return Response.redirect(new URL(app, request.url));
  }

  if (routesNeedRole.some((route) => currentPathName.startsWith(route))) {
    if (!userRole || !userRole.includes(role)) {
      return Response.redirect(new URL(`${app}/auth/login`, request.url));
    }
  }

  if (!isLogged && routesNeedAuth.some((route) => currentPathName.startsWith(route))) {
    return Response.redirect(new URL(`${app}/auth/login`, request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
  unstable_allowDynamic: ['**/node_modules/lodash/_root.js'],
};
