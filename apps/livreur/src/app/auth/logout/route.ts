import { defaultWebRoutes } from '@repo/ui';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
  redirect(defaultWebRoutes.LIVREUR);
}
