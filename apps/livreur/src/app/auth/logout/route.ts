import { defaultWebRoutes, Tags } from '@repo/ui';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
  revalidateTag(Tags.ME);
  redirect(defaultWebRoutes.LIVREUR + '/' + defaultWebRoutes.LOGIN);
}

export async function POST() {
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
  revalidateTag(Tags.ME);
  redirect(defaultWebRoutes.LIVREUR + '/' + defaultWebRoutes.LOGIN);
}
