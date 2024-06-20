import React from 'react';
import { Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import defaultRestaurantPic from '../assets/default-restaurant-pic.png';
import Link from 'next/link';

interface RestaurantProps {
  restaurantName?: string;
  address?: string;
  restaurantPic?: StaticImageData;
}

interface AllRestaurantsProps {
  restaurants: RestaurantProps[];
}

export function AllRestaurants({ restaurants }: AllRestaurantsProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-justify-center ui-w-full ui-h-full">
      {restaurants.map((restaurant, id) => (
        <Restaurant
          key={id}
          {...restaurant}
        />
      ))}
    </div>
  );
}

export function Restaurant({
  restaurantName = 'Super restaurant',
  address = '12 Rue Schertz, 67100 Strasbourg',
  restaurantPic = defaultRestaurantPic,
}: RestaurantProps): JSX.Element {
  return (
    <div className="ui-relative ui-w-full ui-h-[20%] ui-overflow-hidden ui-border-b-gray-4">
      <div className="ui-flex ui-justify-center ui-w-full ui-h-full ui-bg-secondary ui-select-none">
        <Image
          src={restaurantPic}
          alt={`${restaurantName} +  picture`}
          className="ui-object-cover ui-object-center"
        ></Image>
      </div>
      <Link href="/my-restaurant">
        {/*href #TODO*/}
        <button className="ui-absolute ui-top-0 ui-left-0 ui-flex ui-flex-col ui-items-start ui-justify-start ui-w-[56%] ui-h-1/2 ui-mb-2 ui-mr-2 ui-bg-gray-5 ui-rounded-br-lg ui-border-b-gray-4 ui-border-b-[0.0625rem] ui-shadow-[0_0.125rem_0.25rem_0_rgba(204,209,212,0.4)] hover:ui-bg-primary hover:ui-text-gray-5 active:ui-bg-secondary active:ui-text-gray-5 active:ui-border-b-0 active:ui-shadow-[inset_0.125rem_0.125rem_0.25rem_0_rgba(0,0,0,0.4)]">
          <Typography
            variant="h6"
            component="h1"
            className="font-display font-bold ui-mx-2 ui-mt-1 ui-mb-0 hover:ui-text-gray-5 active:ui-text-gray-5"
          >
            {restaurantName}
          </Typography>
          <Typography
            variant="body1"
            className="font-display text-left ui-ml-2 ui-mb-2 hover:ui-text-gray-5 active:ui-text-gray-5"
          >
            {address}
          </Typography>
        </button>
      </Link>
    </div>
  );
}
