import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Restaurant home page',
  description: 'Restaurant home page',
};

export default function HomeLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="w-full bg-white md:px-12 md:py-6 lg:px-12 lg:py-6 xl:px-12 xl:py-6 md:rounded-xl xl:w-1/2 lg:w-2/3 md:w-5/6 z-20">
        {children}
      </div>
    </div>
  );
}
