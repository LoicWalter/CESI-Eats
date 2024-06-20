import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar, RestaurantsProvider, UserProvider } from '@repo/ui';
import Image from 'next/image';
import { HomeOutlined, RestaurantOutlined } from '@mui/icons-material';
import Logo from './favicon.ico';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CESI Eats',
  description: 'CESI Eats - Restaurateur application for food delivery service.',
};

const items = [
  { icon: <HomeOutlined />, text: 'Accueil', id: '1', href: '/' },
  { icon: <RestaurantOutlined />, text: 'Commandes', id: '2', href: '/historique' },
];

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <UserProvider>
        <RestaurantsProvider>
          <body
            className={`${inter.className} flex md:flex-row w-screen min-h-screen overflow-hidden border-0 font-display`}
          >
            <Navbar
              items={items}
              logo={
                <Image
                  alt="Logo"
                  height={64}
                  src={Logo}
                  width={64}
                  className="w-16 h-20"
                />
              }
            />
            <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
          </body>
        </RestaurantsProvider>
      </UserProvider>
    </html>
  );
}
