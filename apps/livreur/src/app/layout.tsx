import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar, UserProvider } from '@repo/ui';
import Image from 'next/image';
import { HomeOutlined, DeliveryDiningOutlined } from '@mui/icons-material';
import Logo from './favicon.ico';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CESI Eats',
  description: 'CESI Eats - Delivery boy application for food delivery service.',
};

const items = [
  { icon: <HomeOutlined />, text: 'Accueil', id: '1', href: '/' },
  { icon: <DeliveryDiningOutlined />, text: 'Livraison', id: '2', href: '/livraison' },
];

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${inter.className} flex flex-row w-screen h-screen overflow-hidden border-0`}
        >
          <Navbar
            items={items}
            logo={
              <Image
                alt="Logo"
                height={64}
                src={Logo}
                width={64}
              />
            }
          />
          <div className="flex-1 overflow-y-auto overflow-x-hidden mb-12 md:mb-0">{children}</div>
        </body>
      </UserProvider>
    </html>
  );
}
