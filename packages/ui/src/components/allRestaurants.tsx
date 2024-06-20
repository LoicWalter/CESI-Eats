import React from 'react';
import { Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import defaultRestaurantPic from '../assets/default-restaurant-pic.png';
import Link from 'next/link';
import { ImageWithDefaultOnError, RestaurantsContextType } from '../utils';


interface AllRestaurantsProps {
  restaurants: RestaurantsContextType[];
}

export function AllRestaurants({ restaurants }: AllRestaurantsProps): JSX.Element {
  return (
    <div className="ui-flex ui-flex-col ui-justify-center ui-w-full ui-h-full">
      {restaurants.map((restaurant, id) => (
        <Restaurant
          key={id}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
}

interface RestaurantProps {
  restaurant: RestaurantsContextType;
}

export function Restaurant({ restaurant }: RestaurantProps): JSX.Element {
  return (
    <div className="ui-relative ui-w-full ui-h-[20%] ui-overflow-hidden ui-border-b-gray-4">
      <div className="ui-flex ui-justify-center ui-w-full ui-h-full ui-bg-secondary ui-select-none">
        <ImageWithDefaultOnError
          src={`${process.env.NEXT_PUBLIC_API_URL}/restaurant/${restaurant.restaurantPicture}/picture`}
          alt="restaurant"
          width="2000"
          height="2000"
          className="ui-object-cover ui-object-center"
          defaultReactNode={
            <Image
              src={defaultRestaurantPic as StaticImageData}
              alt="restaurant"
              width={2000}
              height={2000}
              className="ui-object-cover ui-object-center"
            />
          }
        />
      </div>
      <Link href={`/restaurant/${restaurant.id}`}>
        <button className="ui-absolute ui-top-0 ui-left-0 ui-flex ui-flex-col ui-items-start ui-justify-start ui-w-[56%] ui-h-1/2 ui-mb-2 ui-mr-2 ui-bg-gray-5 ui-rounded-br-lg ui-border-b-gray-4 ui-border-b-[0.0625rem] ui-shadow-[0_0.125rem_0.25rem_0_rgba(204,209,212,0.4)] hover:ui-bg-primary hover:ui-text-gray-5 active:ui-bg-secondary active:ui-text-gray-5 active:ui-border-b-0 active:ui-shadow-[inset_0.125rem_0.125rem_0.25rem_0_rgba(0,0,0,0.4)]">
          <Typography
            variant="h6"
            component="h1"
            className="ui-font-display ui-font-bold ui-mx-2 ui-mt-1 ui-mb-0 hover:ui-text-gray-5 active:ui-text-gray-5"
          >
            {restaurant.name}
          </Typography>
          <Typography
            variant="body1"
            className="ui-font-display ui-text-left ui-ml-2 ui-mb-2 hover:ui-text-gray-5 active:ui-text-gray-5"
          >
            {restaurant.address}
          </Typography>
        </button>
      </Link>
    </div>
  );
}
