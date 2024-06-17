import './globals.css';
import '@repo/ui/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@repo/ui';
import Image from 'next/image';
import {
  ExploreOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';
import Logo from './favicon.ico';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CESI Eats',
  description: 'CESI Eats - Client application for food delivery service.',
};

const items = [
  { icon: <HomeOutlined />, text: 'Accueil', id: '1', href: '/' },
  { icon: <FavoriteBorderOutlined />, text: 'Favoris', id: '2', href: '/favorites' },
  { icon: <ExploreOutlined />, text: 'Recherche', id: '3', href: '/commande' },
  { icon: <ShoppingBagOutlined />, text: 'Panier', id: '4', href: '/panier' },
];

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-row w-screen h-screen overflow-hidden border-0 font-display`}
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

        <div className="flex-1 overflow-y-auto overflow-x-hidden mb-12 md:mb-0">{children}</div>
      </body>
    </html>
  );
}
