import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DeliveriesProvider, Navbar, UserProvider } from '@repo/ui';
import Image from 'next/image';
import { HomeOutlined, DeliveryDiningOutlined } from '@mui/icons-material';
import Logo from './favicon.ico';
import BgImage from '../assets/repas-de-famille.jpg';

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
          className={`${inter.className} flex md:flex-row w-screen min-h-screen overflow-hidden border-0 font-display`}
        >
          <Navbar
            items={items}
            logo={
              <Image
                alt="Logo"
                height={80}
                src={Logo}
                width={64}
                className="w-16 h-20"
              />
            }
          />
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="w-full h-screen overflow-hidden flex flex-col justify-center items-center -z-10">
              <Image
                src={BgImage}
                alt="Repas de famille"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <div className="w-full overflow-auto bg-white sm:rounded-xl xl:w-4/6 lg:w-5/6 md:w-5/6 z-20 sm:full mb-12 md:mb-0">
                {children}
              </div>
            </div>
            );
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
