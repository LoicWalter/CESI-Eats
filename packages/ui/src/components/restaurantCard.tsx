import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { ImageWithDefaultOnError, RestaurantsContextType } from '../utils';
import Link from 'next/link';

interface RestaurantCardProps {
  restaurant: RestaurantsContextType;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="ui-w-5/6 ui-mx-4 ui-inline-block">
        <ImageWithDefaultOnError
          src="https://via.placeholder.com/300"
          alt="restaurant"
          width="300"
          height="300"
          defaultReactNode={
            <CardMedia
              component="img"
              alt="restaurant"
              height="140"
              image="https://via.placeholder.com/150"
            />
          }
        />
        <CardContent>
          <Typography variant="h5">{restaurant.name}</Typography>
          <Typography variant="body1">{restaurant.priceRange}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
