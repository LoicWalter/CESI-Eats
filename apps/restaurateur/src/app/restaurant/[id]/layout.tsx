import { RestaurantProvider } from '@repo/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client auth page',
  description: 'Client auth page',
};

interface RestaurantLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

export default function RestaurantLayout({ params, children }: RestaurantLayoutProps): JSX.Element {
  return <RestaurantProvider id={params.id}>{children}</RestaurantProvider>;
}
