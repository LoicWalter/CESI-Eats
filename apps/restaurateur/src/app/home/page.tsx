import React from 'react';
import { AllRestaurants } from '@repo/ui';
import Image, { StaticImageData } from 'next/image';
import defaultRestaurantPic from '../../assets/default-restaurant-pic.png';
import Link from 'next/link';
import { Typography } from '@mui/material';

// A remplacer par les données réelles #TODO
const restaurants = [
  {
    name: 'STARLING BURGER',
    address: '21 avenue du général de Gaulle, esplanade',
    time: '10 minutes',
    distance: '15 km',
    img: 'https://example.com/burger.jpg',
    orders: 3,
  },
  {
    name: 'SUSHI SHOP',
    address: '221 route de schirmeck, Strasbourg',
    time: '5 minutes',
    distance: '7 km',
    img: 'https://example.com/sushi.jpg',
    orders: 1,
  },
  {
    name: 'DOMINOS PIZZA',
    address: '6 rue dahlenheim, Strasbourg',
    time: '15 minutes',
    distance: '20 km',
    img: 'https://example.com/pizza.jpg',
    orders: 3,
  },
  {
    name: 'KFC',
    address: '51 Rue des cerises, Eckbolsheim',
    time: '10 minutes',
    distance: '16 km',
    img: 'https://example.com/kfc.jpg',
    orders: 2,
  },
  {
    name: 'DEL ARTE',
    address: '2 allée des foulons, lingolsheim',
    time: '10 minutes',
    distance: '12 km',
    img: 'https://example.com/delarte.jpg',
    orders: 3,
  },
];

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <AllRestaurants restaurants={restaurants} />
    </div>
  );
}
