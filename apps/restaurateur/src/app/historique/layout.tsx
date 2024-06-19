import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Client auth page',
  description: 'Client auth page',
};

export default function HistoriqueLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen overflow-hidden">
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
