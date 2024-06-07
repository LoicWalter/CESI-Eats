import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client auth page',
  description: 'Client auth page',
};

export default function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <div>{children}</div>;
}
