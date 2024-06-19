'use client';

import { Divider, Typography } from '@mui/material';
import { CardCarousel, RestaurantCard, SearchWrapper, useRestaurants } from '@repo/ui';

export default function HomePage() {
  const restaurants = useRestaurants();
  return (
    <SearchWrapper>
      <div className="flex flex-col gap-8 w-full">
        <Typography
          variant="h5"
          className="font-bold"
        >
          Les restaurants favoris
        </Typography>
        <CardCarousel>
          {restaurants.map((restaurant, i) => (
            <RestaurantCard
              key={restaurant.id || i}
              restaurant={restaurant}
            />
          ))}
        </CardCarousel>
        <Divider />
        <Typography
          variant="h5"
          className="font-bold"
        >
          A découvrir
        </Typography>
        <CardCarousel>
          {restaurants.map((restaurant, i) => (
            <RestaurantCard
              key={restaurant.id || i}
              restaurant={restaurant}
            />
          ))}
        </CardCarousel>
      </div>
    </SearchWrapper>
  );
}
