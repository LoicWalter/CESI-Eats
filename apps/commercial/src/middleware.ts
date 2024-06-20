import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): Response | undefined {
  const app = '/commercial';
  const authCookie = request.cookies.get('Authentication')?.value;
  const isLogged = Boolean(authCookie);
  const currentPathName = request.nextUrl.pathname;

  const authRoutes = ['/auth/login', '/auth/signup'];
  const routesNeedAuth = ['/profil', '/paiement'];

  const isAuthRoute = authRoutes.some((route) => currentPathName.includes(route));

  if (isLogged && isAuthRoute) {
    return Response.redirect(new URL(app, request.url));
  }

  if (!isLogged && routesNeedAuth.some((route) => currentPathName.includes(route))) {
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
