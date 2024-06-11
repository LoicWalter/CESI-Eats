import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface RestaurantCardProps {
  name: string;
  timeRange: string;
}

export function RestaurantCard({ name, timeRange }: RestaurantCardProps) {
  return (
    <Card className="ui-w-5/6 ui-mx-4 ui-inline-block">
      <CardMedia
        component="img"
        alt="restaurant"
        height="140"
        image="https://via.placeholder.com/150"
      />
      <CardContent>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{timeRange}</Typography>
      </CardContent>
    </Card>
  );
}
