import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Client profil page',
  description: 'Client profil page',
};

export default function ProfilLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="h-screen overflow-hidden w-full flex flex-col justify-center items-center">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="bg-white px-12 sm:rounded-xl xl:w-4/6 lg:w-5/6 md:w-5/6 z-20 w-full h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
