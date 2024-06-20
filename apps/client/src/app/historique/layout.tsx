import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';
import { CommandesProvider, DeliveriesProvider } from '@repo/ui';

export const metadata: Metadata = {
  title: 'Historical page',
  description: 'Historical page',
};

export default function HistoriqueLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <CommandesProvider>
      <DeliveriesProvider>
        <div className="flex flex-col items-center justify-center w-full h-screen overflow-hidden">
          <Image
            src={BgImage}
            alt="Repas de famille"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="z-20 w-full px-12 py-6 mb-12 overflow-auto bg-white sm:rounded-xl xl:w-4/6 lg:w-5/6 md:w-5/6 sm:full md:mb-0">
            {children}
          </div>
        </div>
      </DeliveriesProvider>
    </CommandesProvider>
  );
}
