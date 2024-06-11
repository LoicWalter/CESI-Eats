import { commonMiddleware, defaultWebRoutes } from '@repo/ui';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): Response | undefined {
  //return commonMiddleware(defaultWebRoutes.CLIENT)(request);
  return;
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
};
