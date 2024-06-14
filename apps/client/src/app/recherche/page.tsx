import { Divider, Typography } from '@mui/material';
import { CardCarousel, RestaurantCard, SearchWrapper } from '@repo/ui';
import React from 'react';

export default function Recherche() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <RestaurantCard
              key={i}
              name={i.toString()}
              timeRange="20-25 min"
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
          {Array.from({ length: 10 }).map((_, i) => (
            <RestaurantCard
              key={i}
              name={i.toString()}
              timeRange="20-25 min"
            />
          ))}
        </CardCarousel>
      </div>
    </SearchWrapper>
  );
}
