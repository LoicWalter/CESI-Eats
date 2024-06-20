import type { Metadata } from 'next';
import { CommandesRestaurantProvider } from '@repo/ui';

export const metadata: Metadata = {
  title: 'Client auth page',
  description: 'Client auth page',
};

interface HistoriqueLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
  };
}

export default function HistoriqueLayout({ children, params }: HistoriqueLayoutProps): JSX.Element {
  const { id } = params;
  return <CommandesRestaurantProvider id={id}>{children}</CommandesRestaurantProvider>;
}
