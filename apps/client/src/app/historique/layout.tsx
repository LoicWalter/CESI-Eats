import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Historical page',
  description: 'Historical page',
};

export default function HistoriqueLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="h-screen overflow-hidden w-full flex flex-col justify-center items-center">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="bg-white px-12 py-6 sm:rounded-xl lg:w-3/5 md:w-4/5 z-20 sm:w-4/6 w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
