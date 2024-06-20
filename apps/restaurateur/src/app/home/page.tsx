import React from 'react';
import { MealCard, DietsIcons, CircularArrowBackButton, CircularEditButton } from '@repo/ui';
import Image, { StaticImageData } from 'next/image';
import defaultRestaurantPic from '../../assets/default-restaurant-pic.png';
import Link from 'next/link';
import { Typography } from '@mui/material';

// A remplacer par les données réelles #TODO
const mealCards = [
  {
    category: 'Burgers',
    meals: [
      {
        mealName: 'Burger',
        price: '15,00',
        desc: 'Juicy burger with baconuicy burger with cheese and bacon juicy burger with cheese and baconuicy burger with cheese and baconuicy burger with cheese and baconuicy burger with cheese and baconuicy burger with cheese and bacon',
      },
      { mealName: 'Cheesburger', price: '15,00', desc: 'Juicy burger with cheese and bacon' },
    ],
  },
  {
    category: 'Pasta',
    meals: [
      { mealName: 'Spaghetti', price: '12,00', desc: 'Delicious pasta with tomato sauce' },
      { mealName: 'Penne', price: '12,00', desc: 'Delicious pasta with cream sauce' },
    ],
  },
];

interface RestaurantProps {
  restaurantName?: string;
  restaurantPic?: StaticImageData;
  address?: string;
  description?: string;
  diets?: string[];
}

export default function Page({
  restaurantName = 'Super restaurant',
  restaurantPic = defaultRestaurantPic,
  address = '12 Rue Schertz, 67100 Strasbourg',
  description = 'Les burger et les pâtes',
  diets = ['viande', 'poisson', 'végétarien', 'végan'],
}: RestaurantProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-between h-full">
      <div className="relative w-full h-[20%] mb-6 overflow-hidden border-b-gray-4 border-b-[0.0625rem] shadow-[0_0.125rem_0.25rem_0_rgba(204,209,212,0.4)] select-none">
        <div className="flex justify-center w-full h-full bg-secondary">
          <Image
            src={restaurantPic}
            alt={`${restaurantName} +  picture`}
            className="object-cover object-center"
          ></Image>
        </div>
        <Link href="/home"></Link>
        <CircularArrowBackButton />
        <CircularEditButton />
      </div>
      <div className="flex flex-col items-center w-[92%] md:w-[70%] h-[80%]">
        <div className="flex flex-col items-start w-full md:w-full">
          <Typography
            variant="h4"
            component="h3"
            className="font-display font-bold mb-2"
          >
            {restaurantName}
          </Typography>
          <Typography
            variant="body1"
            className="font-display text-gray-3 mb-2 truncate"
          >
            {address}
          </Typography>
          <div className="flex justify-start gap-2">
            <Typography
              variant="body1"
              className="w-[6.25rem] font-display font-bold mb-2 truncate"
            >
              Description :
            </Typography>
            <Typography
              variant="body1"
              className="font-display mb-2"
            >
              {description}
            </Typography>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-full">
              <p className="w-[6.25rem] font-display font-bold mb-2 whitespace-nowrap">Régimes :</p>
            </div>
            <DietsIcons diets={diets} />
          </div>
        </div>
        <div className="flex items-center w-full">
          <MealCard mealCards={mealCards} />
        </div>
      </div>
    </div>
  );
}
