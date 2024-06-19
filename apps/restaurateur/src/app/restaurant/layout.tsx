import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Client auth page',
  description: 'Client auth page',
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
      <div className="z-20 w-full px-12 py-6 overflow-y-auto bg-white sm:rounded-xl lg:w-2/5 md:w-3/5 sm:w-4/5">
        {children}
      </div>
    </div>
  );
}
