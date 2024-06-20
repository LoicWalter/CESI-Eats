'use client';

import React from 'react';
import { AllRestaurants, useRestaurants, useUser } from '@repo/ui';
import BgImage from '../assets/repas-de-famille.jpg';
import Image from 'next/image';

export default function Page(): JSX.Element {
  const restaurantsNoFilter = useRestaurants();
  const user = useUser();
  const restaurants = restaurantsNoFilter.filter((restaurant) => restaurant.owner === user.id);
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
        <div className="flex flex-col items-center justify-between h-full">
          <AllRestaurants restaurants={restaurants} />
        </div>
      </div>
    </div>
  );
}
