import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Client auth page',
  description: 'Client auth page',
};

export default function AuthLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="h-screen overflow-hidden w-full flex flex-col justify-center items-center">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="bg-white px-12 py-6 sm:rounded-xl lg:w-2/5 md:w-3/5 z-20 sm:w-4/5 w-full">
        {children}
      </div>
    </div>
  );
}
