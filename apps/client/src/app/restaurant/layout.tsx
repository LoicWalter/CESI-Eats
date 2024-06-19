import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Client profil page',
  description: 'Client profil page',
};

export default function RestaurantLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="z-20 w-full h-full px-12 py-6 mb-12 overflow-auto bg-white sm:rounded-xl xl:w-4/6 lg:w-5/6 md:w-5/6 sm:full md:mb-0">
        {children}
      </div>
    </div>
  );
}
