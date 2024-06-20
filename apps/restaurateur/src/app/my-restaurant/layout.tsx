import type { Metadata } from 'next';
import BgImage from '../../assets/repas-de-famille.jpg';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'My Restaurant page',
  description: 'My Restaurant page',
};

export default function MyRestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      <Image
        src={BgImage}
        alt="Repas de famille"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="w-full overflow-auto bg-white sm:rounded-xl xl:w-4/6 lg:w-5/6 md:w-5/6 z-20 sm:full mb-12 md:mb-0">
        {children}
      </div>
    </div>
  );
}
