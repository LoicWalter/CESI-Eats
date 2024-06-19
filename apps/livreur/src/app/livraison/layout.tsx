import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Livraison',
  description: 'Livraison page',
};

export default function LivraisonLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="h-screen overflow-hidden w-full flex flex-col justify-center items-center">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="bg-white px-12 py-6 sm:rounded-xl xl:w-4/6 lg:w-5/6 md:w-5/6 z-20 sm:full w-full overflow-auto mb-12 md:mb-0">
        {children}
      </div>
    </div>
  );
}
